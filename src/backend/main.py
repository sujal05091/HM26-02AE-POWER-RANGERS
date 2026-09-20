from fastapi import FastAPI, HTTPException, Query, Body, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, timedelta
import random

from data_store import JURISDICTION_VERSIONS, WARDS, AUTHORITIES, DEPARTMENTS, OFFICERS, CONTRACTS
from database import (
    get_all_complaints_db, get_complaint_by_id_db, insert_complaint_db,
    update_complaint_status_db, upvote_complaint_db, register_user_db, login_user_db
)
from routing_engine import route_complaint
from ai_classifier import classify_complaint
from duplicate_engine import check_duplicate_complaint
from sla_engine import calculate_sla_status
from cloudinary_service import upload_image_to_cloudinary

app = FastAPI(
    title="CivicRoute API Engine & Governance Platform",
    description="Dynamic Civic Complaint Routing, Persistent DB, Firebase Auth & Cloudinary Integration API",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: Optional[str] = "citizen"
    phone: Optional[str] = ""
    ward_id: Optional[str] = "WARD-42"

class LoginRequest(BaseModel):
    email: str
    password: str

class ComplaintCreateRequest(BaseModel):
    category: str
    description: str
    latitude: float
    longitude: float
    address: Optional[str] = "Mysuru City"
    image_url: Optional[str] = None
    jurisdiction_version: Optional[str] = "V3"

class StatusUpdateRequest(BaseModel):
    status: str
    officer_notes: Optional[str] = ""
    after_image_url: Optional[str] = None

class ReopenRequest(BaseModel):
    reason: str
    additional_notes: Optional[str] = ""

class ImageUploadRequest(BaseModel):
    image_base64: str
    folder: Optional[str] = "civicroute_evidence"

# Auth Endpoints

@app.post("/api/auth/register")
def register_user(req: RegisterRequest):
    user_data, error = register_user_db(req.name, req.email, req.password, req.role, req.phone, req.ward_id)
    if error:
        raise HTTPException(status_code=400, detail=error)
    return {"success": True, "user": user_data}

@app.post("/api/auth/login")
def login_user(req: LoginRequest):
    user_data, error = login_user_db(req.email, req.password)
    if error:
        raise HTTPException(status_code=401, detail=error)
    return {"success": True, "user": user_data}

@app.get("/api/auth/me")
def get_current_user(token: str = Query(...)):
    return {
        "id": "USR-001",
        "name": "Citizen Mysuru",
        "email": "citizen@civicroute.org",
        "role": "citizen",
        "ward_id": "WARD-42",
        "status": "authenticated"
    }

# Cloudinary Upload Endpoint

@app.post("/api/upload")
def upload_image(req: ImageUploadRequest):
    result = upload_image_to_cloudinary(req.image_base64, req.folder)
    return result

# Health & System Specs

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CivicRoute Engine",
        "database": "SQLite Persistent Engine",
        "storage": "Cloudinary CDN",
        "timestamp": datetime.now().isoformat(),
        "active_version": "V3"
    }

@app.get("/api/jurisdictions/versions")
def get_jurisdiction_versions():
    return list(JURISDICTION_VERSIONS.values())

# Persistent Complaint Management

@app.get("/api/complaints")
def get_complaints(
    status: Optional[str] = None,
    ward_id: Optional[str] = None,
    category: Optional[str] = None,
    jurisdiction_version: Optional[str] = "V3"
):
    complaints = get_all_complaints_db(status, ward_id, category)
    results = []
    for c in complaints:
        sla_info = calculate_sla_status(c["created_at"], c["sla_hours"], c["status"])
        results.append({**c, "sla_info": sla_info})
    return results

@app.get("/api/complaints/{complaint_id}")
def get_complaint_details(complaint_id: str):
    complaint = get_complaint_by_id_db(complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
        
    sla_info = calculate_sla_status(complaint["created_at"], complaint["sla_hours"], complaint["status"])
    routing_info = route_complaint(
        complaint["latitude"],
        complaint["longitude"],
        complaint["category"],
        complaint.get("jurisdiction_version", "V3")
    )
    
    return {
        **complaint,
        "sla_info": sla_info,
        "routing_explanation": routing_info["rationale"],
        "responsibility_chain": [
            {"level": 1, "title": "Citizen Report", "subtitle": f"ID: {complaint['id']}", "icon": "user"},
            {"level": 2, "title": f"Ward Bounds ({routing_info['zone']})", "subtitle": routing_info["ward_name"], "icon": "map-pin"},
            {"level": 3, "title": "Responsible Authority", "subtitle": routing_info["authority_name"], "icon": "building"},
            {"level": 4, "title": "Department Execution", "subtitle": routing_info["department_name"], "icon": "shield"},
            {"level": 5, "title": "Assigned Field Officer", "subtitle": f"{routing_info['officer_name']} ({routing_info['officer_designation']})", "icon": "user-check"},
            {"level": 6, "title": "Service Contract / Tender", "subtitle": routing_info["contract_title"], "icon": "file-text"}
        ]
    }

@app.post("/api/complaints")
def create_complaint(req: ComplaintCreateRequest):
    # 1. Duplicate check
    duplicate_result = check_duplicate_complaint(req.latitude, req.longitude, req.category)
    
    # 2. AI Classification
    ai_result = classify_complaint(req.description, req.image_url, req.category)
    
    # 3. Deterministic Routing Engine
    routing = route_complaint(req.latitude, req.longitude, ai_result["predicted_category"], req.jurisdiction_version)
    
    # 4. Handle Cloudinary Image URL
    image_url = req.image_url
    if not image_url or not image_url.startswith("http"):
        upload_res = upload_image_to_cloudinary(req.image_url or "sample_evidence", folder="civicroute_evidence")
        image_url = upload_res.get("secure_url") or upload_res.get("fallback_cdn_url")

    # 5. Insert Into Database
    new_id = f"HM-{random.randint(1050, 9999)}"
    now = datetime.now()
    expected_res = (now + timedelta(hours=routing["sla_hours"])).isoformat()
    
    new_complaint = {
        "id": new_id,
        "category": ai_result["predicted_category"],
        "description": req.description,
        "latitude": req.latitude,
        "longitude": req.longitude,
        "address": req.address or f"{routing['ward_name']}, Mysuru",
        "ward_id": routing["ward_id"],
        "ward_name": routing["ward_name"],
        "authority_name": routing["authority_name"],
        "department_name": routing["department_name"],
        "department_id": routing["department_id"],
        "officer_name": routing["officer_name"],
        "officer_id": routing["officer_id"],
        "contract_id": routing["contract_id"],
        "contract_title": routing["contract_title"],
        "status": "Reported",
        "priority": "High" if ai_result["predicted_category"] in ["Drainage Blockage", "Pothole"] else "Medium",
        "sla_hours": routing["sla_hours"],
        "created_at": now.isoformat(),
        "expected_resolution": expected_res,
        "ai_confidence": ai_result["confidence"],
        "before_image_url": image_url,
        "after_image_url": None,
        "upvotes": 1,
        "jurisdiction_version": req.jurisdiction_version,
        "timeline": [
            {"time": now.strftime("%I:%M %p"), "status": "Reported", "actor": "Citizen", "desc": "Complaint created & uploaded to Cloudinary."},
            {"time": now.strftime("%I:%M %p"), "status": "Auto Routed", "actor": "CivicRoute AI", "desc": f"Routed to {routing['authority_name']} — {routing['department_name']}."}
        ]
    }
    
    saved_complaint = insert_complaint_db(new_complaint)
    
    return {
        "success": True,
        "complaint": saved_complaint,
        "ai_classification": ai_result,
        "duplicate_warning": duplicate_result,
        "routing": routing
    }

@app.put("/api/complaints/{complaint_id}/status")
def update_complaint_status(complaint_id: str, req: StatusUpdateRequest):
    after_url = req.after_image_url
    if after_url and not after_url.startswith("http"):
        upload_res = upload_image_to_cloudinary(after_url, folder="civicroute_resolution")
        after_url = upload_res.get("secure_url") or upload_res.get("fallback_cdn_url")

    updated = update_complaint_status_db(complaint_id, req.status, "Field Officer", req.officer_notes, after_url)
    if not updated:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return {"success": True, "complaint": updated}

@app.post("/api/complaints/{complaint_id}/reopen")
def reopen_complaint(complaint_id: str, req: ReopenRequest):
    notes = f"Citizen flagged issue persistent: {req.reason}. {req.additional_notes}"
    updated = update_complaint_status_db(complaint_id, "Reopened", "Citizen", notes)
    if not updated:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return {"success": True, "complaint": updated}

@app.post("/api/complaints/{complaint_id}/upvote")
def upvote_complaint(complaint_id: str):
    new_upvotes = upvote_complaint_db(complaint_id)
    return {"success": True, "upvotes": new_upvotes}

@app.post("/api/route")
def test_route_endpoint(
    latitude: float = Query(...),
    longitude: float = Query(...),
    category: str = Query(...),
    version: str = Query("V3")
):
    return route_complaint(latitude, longitude, category, version)

@app.get("/api/analytics")
def get_analytics():
    complaints = get_all_complaints_db()
    total = len(complaints)
    resolved = len([c for c in complaints if c["status"] == "Resolved"])
    in_progress = len([c for c in complaints if c["status"] in ["In Progress", "Assigned", "Reported"]])
    escalated = len([c for c in complaints if c["status"] in ["Escalated", "Overdue"]])
    
    categories = {}
    for c in complaints:
        categories[c["category"]] = categories.get(c["category"], 0) + 1
        
    ward_stats = {}
    for c in complaints:
        ward_stats[c["ward_name"]] = ward_stats.get(c["ward_name"], 0) + 1

    return {
        "summary": {
            "total_complaints": total,
            "resolved_complaints": resolved,
            "in_progress": in_progress,
            "escalated_overdue": escalated,
            "avg_resolution_hours": 14.2,
            "sla_compliance_rate": 87.5
        },
        "by_category": [{"category": k, "count": v} for k, v in categories.items()],
        "by_ward": [{"ward": k, "count": v} for k, v in ward_stats.items()],
        "hotspots": [
            {"name": "Agrahara Circle", "ward": "Ward 42", "complaints_count": 8, "lat": 12.3051, "lng": 76.6551},
            {"name": "Vijayanagar Water Tank", "ward": "Ward 38", "complaints_count": 5, "lat": 12.3200, "lng": 76.6200},
            {"name": "KRS Main Road", "ward": "Ward 41", "complaints_count": 6, "lat": 12.3350, "lng": 76.6380}
        ]
    }

@app.get("/api/officers")
def get_officers():
    return OFFICERS

@app.get("/api/contracts")
def get_contracts():
    return CONTRACTS
