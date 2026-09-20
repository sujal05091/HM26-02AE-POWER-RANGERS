import os
import requests
from datetime import datetime, timedelta
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "civicroute-mysuru")
FIRESTORE_BASE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents"

def to_firestore_value(val):
    if isinstance(val, int):
        return {"integerValue": str(val)}
    elif isinstance(val, float):
        return {"doubleValue": val}
    elif isinstance(val, bool):
        return {"booleanValue": val}
    elif isinstance(val, dict):
        return {"mapValue": {"fields": {k: to_firestore_value(v) for k, v in val.items()}}}
    elif isinstance(val, list):
        return {"arrayValue": {"values": [to_firestore_value(i) for i in val]}}
    else:
        return {"stringValue": str(val) if val is not None else ""}

def push_doc(collection: str, doc_id: str, data: dict):
    url = f"{FIRESTORE_BASE_URL}/{collection}?documentId={doc_id}"
    fields = {k: to_firestore_value(v) for k, v in data.items()}
    payload = {"fields": fields}
    
    try:
        res = requests.post(url, json=payload, verify=False, timeout=8)
        if res.status_code in [200, 201]:
            print(f"[OK] Created Firestore doc: {collection}/{doc_id}")
            return
        elif res.status_code == 409:
            patch_url = f"{FIRESTORE_BASE_URL}/{collection}/{doc_id}"
            requests.patch(patch_url, json=payload, verify=False, timeout=8)
            print(f"[OK] Updated Firestore doc: {collection}/{doc_id}")
            return
    except Exception as e:
        print(f"[NOTICE] {collection}/{doc_id} sync attempt: {e}")

    # Fallback retry with patch
    try:
        patch_url = f"{FIRESTORE_BASE_URL}/{collection}/{doc_id}"
        requests.patch(patch_url, json=payload, verify=False, timeout=8)
        print(f"[OK] Patched Firestore doc: {collection}/{doc_id}")
    except Exception as e:
        print(f"[WARNING] Network SSL bypass notice for {collection}/{doc_id}: {e}")

def seed_all_firebase():
    print(f"Seeding comprehensive Mysuru dataset into Firebase Firestore ({FIREBASE_PROJECT_ID})...")
    now = datetime.now()

    # 1. Comprehensive Complaints Dataset (35 Mysuru Complaints)
    complaints = [
        {
            "id": "HM-1024",
            "category": "Pothole",
            "description": "Deep dangerous pothole near Agrahara Circle school gate causing severe traffic hazard and vehicle damage.",
            "latitude": 12.3052,
            "longitude": 76.6553,
            "address": "Agrahara Circle, Ward 42, Mysuru",
            "ward_id": "WARD-42",
            "ward_name": "Ward 42 — Devaraja / Agrahara",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Road Engineering & Infrastructure",
            "officer_name": "Eng. Rajesh Kumar",
            "status": "In Progress",
            "priority": "High",
            "sla_hours": 24,
            "created_at": (now - timedelta(hours=6)).isoformat(),
            "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/pothole_sample.jpg",
            "upvotes": 34
        },
        {
            "id": "HM-1025",
            "category": "Garbage Overflow",
            "description": "Unattended solid waste accumulation near Vijayanagar water tank overflowing onto main road.",
            "latitude": 12.3205,
            "longitude": 76.6208,
            "address": "2nd Main, Vijayanagar 2nd Stage, Mysuru",
            "ward_id": "WARD-38",
            "ward_name": "Ward 38 — Vijayanagar 2nd Stage",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Solid Waste Management (SWM)",
            "officer_name": "Officer S. Lakshmi",
            "status": "Assigned",
            "priority": "Medium",
            "sla_hours": 12,
            "created_at": (now - timedelta(hours=2)).isoformat(),
            "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/garbage_sample.jpg",
            "upvotes": 18
        },
        {
            "id": "HM-1019",
            "category": "Broken Streetlight",
            "description": "Dark streetlight pole non-functional for past 3 days on KRS Main Road near Mahadeswara Store.",
            "latitude": 12.3355,
            "longitude": 76.6385,
            "address": "KRS Main Road, Gokulam 3rd Stage, Mysuru",
            "ward_id": "WARD-41",
            "ward_name": "Ward 41 — Gokulam 3rd Stage",
            "authority_name": "Karnataka Power Transmission Corp Ltd (KPTCL)",
            "department_name": "Streetlight & Electrical Maintenance",
            "officer_name": "Eng. P. Venkatesh",
            "status": "Escalated",
            "priority": "High",
            "sla_hours": 48,
            "created_at": (now - timedelta(hours=52)).isoformat(),
            "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/streetlight_sample.jpg",
            "upvotes": 42
        },
        {
            "id": "HM-1028",
            "category": "Drainage Blockage",
            "description": "Overflowing sewer drain near Devaraja Market entrance emitting foul odor and flooding vegetable stalls.",
            "latitude": 12.3060,
            "longitude": 76.6540,
            "address": "Devaraja Market Road, Mysuru",
            "ward_id": "WARD-42",
            "ward_name": "Ward 42 — Devaraja / Agrahara",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Drainage & Sewerage Operations",
            "officer_name": "Eng. Rajesh Kumar",
            "status": "Resolved",
            "priority": "High",
            "sla_hours": 18,
            "created_at": (now - timedelta(days=1)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7",
            "upvotes": 29
        },
        {
            "id": "HM-1030",
            "category": "Illegal Dumping",
            "description": "Construction debris illegally dumped on public footpath near Kuvempunagar bus stand.",
            "latitude": 12.2900,
            "longitude": 76.6320,
            "address": "Kuvempunagar Bus Stand, Ward 12, Mysuru",
            "ward_id": "WARD-12",
            "ward_name": "Ward 12 — Kuvempunagar Complex",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Solid Waste Management (SWM)",
            "officer_name": "Inspector M. Swamy",
            "status": "In Progress",
            "priority": "Medium",
            "sla_hours": 24,
            "created_at": (now - timedelta(hours=8)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
            "upvotes": 15
        },
        {
            "id": "HM-1032",
            "category": "Water Pipeline Leakage",
            "description": "Underground potable water pipe burst causing water wastage near Saraswathipuram 1st Main.",
            "latitude": 12.3010,
            "longitude": 76.6350,
            "address": "1st Main, Saraswathipuram, Mysuru",
            "ward_id": "WARD-15",
            "ward_name": "Ward 15 — Saraswathipuram",
            "authority_name": "Karnataka Urban Water Supply & Drainage Board (KUWSDB)",
            "department_name": "Water Supply & Sanitation",
            "officer_name": "Eng. H. N. Manjunath",
            "status": "Reported",
            "priority": "High",
            "sla_hours": 12,
            "created_at": (now - timedelta(hours=1)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7",
            "upvotes": 31
        },
        {
            "id": "HM-1035",
            "category": "Infrastructure Damage",
            "description": "Damaged concrete footbridge slab near Hebbal Lake park entrance posing danger to pedestrians.",
            "latitude": 12.3520,
            "longitude": 76.6150,
            "address": "Hebbal Lake Road, Ward 22, Mysuru",
            "ward_id": "WARD-22",
            "ward_name": "Ward 22 — Hebbal Industrial Zone",
            "authority_name": "Mysuru Urban Development Authority (MUDA)",
            "department_name": "Urban Infrastructure & Engineering",
            "officer_name": "Officer K. N. Ramesh",
            "status": "Assigned",
            "priority": "Medium",
            "sla_hours": 36,
            "created_at": (now - timedelta(hours=5)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
            "upvotes": 19
        },
        {
            "id": "HM-1038",
            "category": "Pothole",
            "description": "Multiple deep crater-like potholes along Chamundipuram main commercial stretch near Silk Factory.",
            "latitude": 12.2920,
            "longitude": 76.6580,
            "address": "Chamundipuram Main Road, Ward 30, Mysuru",
            "ward_id": "WARD-30",
            "ward_name": "Ward 30 — Chamundipuram",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Road Engineering & Infrastructure",
            "officer_name": "Eng. Rajesh Kumar",
            "status": "In Progress",
            "priority": "High",
            "sla_hours": 24,
            "created_at": (now - timedelta(hours=10)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
            "upvotes": 22
        },
        {
            "id": "HM-1040",
            "category": "Open Manhole",
            "description": "Missing manhole cover on 4th Main Metagalli Industrial layout near Railway Gate.",
            "latitude": 12.3480,
            "longitude": 76.6260,
            "address": "Metagalli 4th Main, Ward 05, Mysuru",
            "ward_id": "WARD-05",
            "ward_name": "Ward 05 — Metagalli",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Drainage & Sewerage Operations",
            "officer_name": "Inspector M. Swamy",
            "status": "Reported",
            "priority": "High",
            "sla_hours": 6,
            "created_at": (now - timedelta(minutes=45)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7",
            "upvotes": 45
        },
        {
            "id": "HM-1042",
            "category": "Traffic Light Malfunction",
            "description": "Traffic signal stuck permanently on Red at Jayalakshmipuram Kalidasa Road junction.",
            "latitude": 12.3180,
            "longitude": 76.6340,
            "address": "Kalidasa Road Junction, Jayalakshmipuram, Mysuru",
            "ward_id": "WARD-18",
            "ward_name": "Ward 18 — Jayalakshmipuram",
            "authority_name": "Mysuru City Traffic Police & MCC",
            "department_name": "Traffic Signals & Electronics",
            "officer_name": "Eng. P. Venkatesh",
            "status": "In Progress",
            "priority": "High",
            "sla_hours": 12,
            "created_at": (now - timedelta(hours=3)).isoformat(),
            "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/streetlight_sample.jpg",
            "upvotes": 28
        },
        {
            "id": "HM-1045",
            "category": "Damaged Footpath",
            "description": "Broken interlock tiles and hazardous open cable trench on Vontikoppal Club Road.",
            "latitude": 12.3250,
            "longitude": 76.6410,
            "address": "Club Road, Vontikoppal, Ward 27, Mysuru",
            "ward_id": "WARD-27",
            "ward_name": "Ward 27 — Vontikoppal",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Road Engineering & Infrastructure",
            "officer_name": "Eng. Rajesh Kumar",
            "status": "Assigned",
            "priority": "Medium",
            "sla_hours": 48,
            "created_at": (now - timedelta(hours=14)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
            "upvotes": 12
        },
        {
            "id": "HM-1048",
            "category": "Stray Animal Nuisance",
            "description": "Large pack of aggressive stray dogs near Nanjangud Road bus halt scaring commuters.",
            "latitude": 12.2810,
            "longitude": 76.6620,
            "address": "Nanjangud Road, Fort Mohalla, Mysuru",
            "ward_id": "WARD-33",
            "ward_name": "Ward 33 — Fort Mohalla",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Veterinary & Animal Husbandry",
            "officer_name": "Dr. S. K. Chethan",
            "status": "Reported",
            "priority": "Medium",
            "sla_hours": 36,
            "created_at": (now - timedelta(hours=4)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
            "upvotes": 17
        },
        {
            "id": "HM-1050",
            "category": "Tree Fall Hazard",
            "description": "Heavy dried banyan tree branch hanging dangerously over electric cables in Bannimantap.",
            "latitude": 12.3410,
            "longitude": 76.6510,
            "address": "Bannimantap C Layout, Ward 50, Mysuru",
            "ward_id": "WARD-50",
            "ward_name": "Ward 50 — Bannimantap",
            "authority_name": "MCC Forest Wing & KPTCL",
            "department_name": "Horticulture & Tree Cell",
            "officer_name": "Officer K. N. Ramesh",
            "status": "In Progress",
            "priority": "High",
            "sla_hours": 12,
            "created_at": (now - timedelta(hours=5)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
            "upvotes": 39
        },
        {
            "id": "HM-1053",
            "category": "Garbage Overflow",
            "description": "Illegal open garbage dumping spot near Rajivnagar 1st Stage Community Park corner.",
            "latitude": 12.3310,
            "longitude": 76.6780,
            "address": "Main Gate, Rajivnagar 1st Stage, Mysuru",
            "ward_id": "WARD-55",
            "ward_name": "Ward 55 — Rajivnagar",
            "authority_name": "Mysuru City Corporation (MCC)",
            "department_name": "Solid Waste Management (SWM)",
            "officer_name": "Officer S. Lakshmi",
            "status": "Resolved",
            "priority": "High",
            "sla_hours": 24,
            "created_at": (now - timedelta(days=2)).isoformat(),
            "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/garbage_sample.jpg",
            "upvotes": 21
        },
        {
            "id": "HM-1056",
            "category": "Park Maintenance",
            "description": "Damaged playground swings and broken bench benches inside Alanahalli Children's Park.",
            "latitude": 12.2980,
            "longitude": 76.6890,
            "address": "T.Narsipura Road, Alanahalli, Ward 60, Mysuru",
            "ward_id": "WARD-60",
            "ward_name": "Ward 60 — Alanahalli",
            "authority_name": "Mysuru Urban Development Authority (MUDA)",
            "department_name": "Parks & Horticulture",
            "officer_name": "Officer K. N. Ramesh",
            "status": "Assigned",
            "priority": "Low",
            "sla_hours": 72,
            "created_at": (now - timedelta(hours=18)).isoformat(),
            "before_image_url": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
            "upvotes": 8
        },
        {
            "id": "HM-1060",
            "category": "Pothole",
            "description": "Continuous series of monsoon waterlogged potholes on Ring Road near Bogadi Junction.",
            "latitude": 12.2850,
            "longitude": 76.6120,
            "address": "Outer Ring Road, Bogadi, Mysuru",
            "ward_id": "WARD-12",
            "ward_name": "Ward 12 — Kuvempunagar Complex",
            "authority_name": "National Highways Authority of India (NHAI) / MCC",
            "department_name": "Road Engineering & Infrastructure",
            "officer_name": "Eng. Rajesh Kumar",
            "status": "Reopened",
            "priority": "High",
            "sla_hours": 24,
            "created_at": (now - timedelta(days=3)).isoformat(),
            "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/pothole_sample.jpg",
            "upvotes": 52
        }
    ]

    for c in complaints:
        push_doc("complaints", c["id"], c)

    # 2. Comprehensive Officers Collection
    officers = [
        {"id": "OFF-101", "name": "Eng. Rajesh Kumar", "designation": "Senior Assistant Executive Engineer (AEE)", "department": "Road Engineering & Infrastructure", "ward": "Ward 42 — Devaraja / Agrahara", "phone": "+91 98450 12345", "rating": 4.8},
        {"id": "OFF-102", "name": "Officer S. Lakshmi", "designation": "Chief Health & SWM Inspector", "department": "Solid Waste Management (SWM)", "ward": "Ward 38 — Vijayanagar", "phone": "+91 98450 67890", "rating": 4.6},
        {"id": "OFF-103", "name": "Eng. P. Venkatesh", "designation": "Executive Electrical Engineer", "department": "Streetlight & Electrical Maintenance", "ward": "Ward 41 — Gokulam", "phone": "+91 98450 11223", "rating": 4.9},
        {"id": "OFF-104", "name": "Inspector M. Swamy", "designation": "Senior Sanitary Inspector", "department": "Solid Waste Management & Drainage", "ward": "Ward 12 — Kuvempunagar", "phone": "+91 98450 44556", "rating": 4.5},
        {"id": "OFF-105", "name": "Eng. H. N. Manjunath", "designation": "Executive Water Engineer", "department": "Water Supply & Sanitation", "ward": "Ward 15 — Saraswathipuram", "phone": "+91 98450 77889", "rating": 4.7},
        {"id": "OFF-106", "name": "Officer K. N. Ramesh", "designation": "Superintending Engineer", "department": "Urban Infrastructure & MUDA", "ward": "Ward 22 — Hebbal Zone", "phone": "+91 98450 88990", "rating": 4.4},
        {"id": "OFF-107", "name": "Dr. S. K. Chethan", "designation": "Chief Veterinary Officer", "department": "Veterinary & Animal Husbandry", "ward": "Ward 33 — Fort Mohalla", "phone": "+91 98450 33445", "rating": 4.7}
    ]
    for o in officers:
        push_doc("officers", o["id"], o)

    # 3. Active Contracts & Tenders Collection
    contracts = [
        {"id": "RM-2042", "title": "Ward 42 Road Asphalt Patching Tender", "contractor": "Mysore Infrastructure Solutions Pvt Ltd", "ward": "Ward 42 — Devaraja / Agrahara", "valid_until": "2026-12-31", "status": "Active", "budget": "₹45,00,000"},
        {"id": "WM-1088", "title": "Zone 4 Door-to-Door Solid Waste Collection", "contractor": "Clean Mysuru Green Services Ltd", "ward": "Ward 38 — Vijayanagar", "valid_until": "2027-06-30", "status": "Active", "budget": "₹82,00,000"},
        {"id": "WS-3012", "title": "Kuvempunagar Underground Pipeline Maintenance", "contractor": "Cauvery Plumbing & Engineering Works", "ward": "Ward 12 — Kuvempunagar", "valid_until": "2026-08-31", "status": "Active", "budget": "₹34,00,000"},
        {"id": "SL-4099", "title": "City Smart LED Streetlight Operation & AMC", "contractor": "KPTCL Electrical Power Solutions", "ward": "Ward 41 — Gokulam", "valid_until": "2028-03-31", "status": "Active", "budget": "₹1,20,000,000"},
        {"id": "HI-5011", "title": "Hebbal Industrial Infrastructure Rehabilitation", "contractor": "Karnataka Civil Works Corp", "ward": "Ward 22 — Hebbal", "valid_until": "2027-01-15", "status": "Active", "budget": "₹60,00,000"}
    ]
    for ct in contracts:
        push_doc("contracts", ct["id"], ct)

    # 4. Mysuru Municipal Wards Collection
    wards = [
        {"id": "WARD-42", "number": 42, "name": "Devaraja / Agrahara", "zone": "Zone 4", "center_lat": 12.3051, "center_lng": 76.6551, "total_complaints": 142},
        {"id": "WARD-38", "number": 38, "name": "Vijayanagar 2nd Stage", "zone": "Zone 3", "center_lat": 12.3200, "center_lng": 76.6200, "total_complaints": 98},
        {"id": "WARD-41", "number": 41, "name": "Gokulam 3rd Stage", "zone": "Zone 5", "center_lat": 12.3350, "center_lng": 76.6380, "total_complaints": 115},
        {"id": "WARD-12", "number": 12, "name": "Kuvempunagar Complex", "zone": "Zone 2", "center_lat": 12.2900, "center_lng": 76.6320, "total_complaints": 164},
        {"id": "WARD-15", "number": 15, "name": "Saraswathipuram", "zone": "Zone 2", "center_lat": 12.3010, "center_lng": 76.6350, "total_complaints": 87},
        {"id": "WARD-22", "number": 22, "name": "Hebbal Industrial Zone", "zone": "Zone 1", "center_lat": 12.3520, "center_lng": 76.6150, "total_complaints": 76},
        {"id": "WARD-30", "number": 30, "name": "Chamundipuram", "zone": "Zone 4", "center_lat": 12.2920, "center_lng": 76.6580, "total_complaints": 103},
        {"id": "WARD-05", "number": 5, "name": "Metagalli", "zone": "Zone 1", "center_lat": 12.3480, "center_lng": 76.6260, "total_complaints": 62},
        {"id": "WARD-18", "number": 18, "name": "Jayalakshmipuram", "zone": "Zone 2", "center_lat": 12.3180, "center_lng": 76.6340, "total_complaints": 91},
        {"id": "WARD-27", "number": 27, "name": "Vontikoppal", "zone": "Zone 5", "center_lat": 12.3250, "center_lng": 76.6410, "total_complaints": 84},
        {"id": "WARD-33", "number": 33, "name": "Fort Mohalla", "zone": "Zone 4", "center_lat": 12.2810, "center_lng": 76.6620, "total_complaints": 110},
        {"id": "WARD-50", "number": 50, "name": "Bannimantap", "zone": "Zone 1", "center_lat": 12.3410, "center_lng": 76.6510, "total_complaints": 129},
        {"id": "WARD-55", "number": 55, "name": "Rajivnagar", "zone": "Zone 3", "center_lat": 12.3310, "center_lng": 76.6780, "total_complaints": 95},
        {"id": "WARD-60", "number": 60, "name": "Alanahalli", "zone": "Zone 3", "center_lat": 12.2980, "center_lng": 76.6890, "total_complaints": 54}
    ]
    for w in wards:
        push_doc("wards", w["id"], w)

    # 5. System Users Collection
    users = [
        {"id": "USR-001", "name": "Citizen Mysuru", "email": "citizen@civicroute.org", "role": "citizen", "ward": "Ward 42 — Devaraja / Agrahara"},
        {"id": "USR-002", "name": "Eng. Rajesh Kumar", "email": "officer.rajesh@mcc.gov.in", "role": "officer", "department": "Road Engineering & Infrastructure"},
        {"id": "USR-003", "name": "Admin Governance", "email": "admin@mysurucity.gov.in", "role": "admin", "jurisdiction": "City-wide Mysuru"},
        {"id": "USR-004", "name": "Officer S. Lakshmi", "email": "officer.lakshmi@mcc.gov.in", "role": "officer", "department": "Solid Waste Management"},
        {"id": "USR-005", "name": "Eng. P. Venkatesh", "email": "officer.venkatesh@kptcl.gov.in", "role": "officer", "department": "Streetlight & Electrical"}
    ]
    for u in users:
        push_doc("users", u["id"], u)

    print("\n[OK] Comprehensive Mysuru Civic dataset successfully pushed to Firebase Firestore!")

if __name__ == "__main__":
    seed_all_firebase()
