import json
import os
import sqlite3
import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional

DB_FILE = os.path.join(os.path.dirname(__file__), "civicroute.db")
FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "civicroute-mysuru")
FIRESTORE_URL = f"https://firestore.googleapis.com/v1/projects/{FIREBASE_PROJECT_ID}/databases/(default)/documents"

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def sync_to_firebase_firestore(collection: str, doc_id: str, fields: dict):
    """
    Syncs persistent records to Firebase Firestore REST API database.
    """
    try:
        url = f"{FIRESTORE_URL}/{collection}/{doc_id}"
        firestore_fields = {}
        for k, v in fields.items():
            if isinstance(v, int):
                firestore_fields[k] = {"integerValue": v}
            elif isinstance(v, float):
                firestore_fields[k] = {"doubleValue": v}
            elif isinstance(v, bool):
                firestore_fields[k] = {"booleanValue": v}
            else:
                firestore_fields[k] = {"stringValue": str(v) if v is not None else ""}

        payload = {"fields": firestore_fields}
        requests.patch(url, json=payload, timeout=2)
    except Exception:
        pass

def init_db():
    """
    Initialize persistent SQLite + Firebase Firestore database.
    """
    conn = get_db()
    cursor = conn.cursor()

    # Users Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            phone TEXT,
            ward_id TEXT,
            created_at TEXT NOT NULL
        )
    ''')

    # Complaints Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS complaints (
            id TEXT PRIMARY KEY,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            address TEXT NOT NULL,
            ward_id TEXT NOT NULL,
            ward_name TEXT NOT NULL,
            authority_name TEXT NOT NULL,
            department_name TEXT NOT NULL,
            department_id TEXT NOT NULL,
            officer_name TEXT NOT NULL,
            officer_id TEXT NOT NULL,
            contract_id TEXT,
            contract_title TEXT,
            status TEXT NOT NULL,
            priority TEXT NOT NULL,
            sla_hours INTEGER NOT NULL,
            created_at TEXT NOT NULL,
            expected_resolution TEXT NOT NULL,
            ai_confidence INTEGER NOT NULL,
            before_image_url TEXT NOT NULL,
            after_image_url TEXT,
            upvotes INTEGER DEFAULT 1,
            jurisdiction_version TEXT DEFAULT 'V3'
        )
    ''')

    # Timelines Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS timelines (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            complaint_id TEXT NOT NULL,
            time TEXT NOT NULL,
            status TEXT NOT NULL,
            actor TEXT NOT NULL,
            desc TEXT NOT NULL,
            FOREIGN KEY (complaint_id) REFERENCES complaints(id)
        )
    ''')

    conn.commit()

    # Seed initial data if DB is empty
    cursor.execute("SELECT COUNT(*) FROM complaints")
    if cursor.fetchone()[0] == 0:
        seed_db(cursor)
        conn.commit()

    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        seed_users(cursor)
        conn.commit()

    conn.close()

def seed_users(cursor):
    now = datetime.now().isoformat()
    users = [
        ("USR-001", "Citizen Mysuru", "citizen@civicroute.org", "password123", "citizen", "+91 98765 43210", "WARD-42", now),
        ("USR-002", "Eng. Rajesh Kumar", "officer.rajesh@mcc.gov.in", "officer123", "officer", "+91 98450 12345", "WARD-42", now),
        ("USR-003", "Admin Governance", "admin@mysurucity.gov.in", "admin123", "admin", "+91 821 2418800", "WARD-42", now),
        ("USR-004", "Officer S. Lakshmi", "officer.lakshmi@mcc.gov.in", "officer123", "officer", "+91 98450 67890", "WARD-38", now),
        ("USR-005", "Eng. P. Venkatesh", "officer.venkatesh@kptcl.gov.in", "officer123", "officer", "+91 98450 11223", "WARD-41", now)
    ]
    cursor.executemany('''
        INSERT OR IGNORE INTO users (id, name, email, password_hash, role, phone, ward_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', users)

def seed_db(cursor):
    now = datetime.now()
    complaints = [
        (
            "HM-1024", "Pothole", "Deep dangerous pothole near Agrahara Circle school gate causing traffic block and accidents.",
            12.3052, 76.6553, "Agrahara Circle, Ward 42, Mysuru", "WARD-42", "Ward 42 — Devaraja / Agrahara",
            "Mysuru City Corporation (MCC)", "Road Engineering & Infrastructure", "DEPT-ROAD", "Eng. Rajesh Kumar", "OFF-101",
            "RM-2042", "Ward 42 Road Maintenance Contract", "In Progress", "High", 24,
            (now - timedelta(hours=6)).isoformat(), (now + timedelta(hours=18)).isoformat(), 94,
            "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/pothole_sample.jpg", None, 34, "V3"
        ),
        (
            "HM-1025", "Garbage Overflow", "Unattended waste accumulation near Vijayanagar water tank.",
            12.3205, 76.6208, "2nd Main, Vijayanagar 2nd Stage, Mysuru", "WARD-38", "Ward 38 — Vijayanagar 2nd Stage",
            "Mysuru City Corporation (MCC)", "Solid Waste Management (SWM)", "DEPT-SWM", "Officer S. Lakshmi", "OFF-102",
            "WM-1088", "Zone 4 Garbage Collection Contract", "Assigned", "Medium", 12,
            (now - timedelta(hours=2)).isoformat(), (now + timedelta(hours=10)).isoformat(), 91,
            "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/garbage_sample.jpg", None, 18, "V3"
        ),
        (
            "HM-1019", "Broken Streetlight", "Streetlight pole non-functional for past 3 days on KRS Road.",
            12.3355, 76.6385, "KRS Main Road, Gokulam 3rd Stage, Mysuru", "WARD-41", "Ward 41 — Gokulam 3rd Stage",
            "Karnataka Power Transmission Corp Ltd (KPTCL)", "Streetlight & Electrical Maintenance", "DEPT-ELEC", "Eng. P. Venkatesh", "OFF-103",
            "SL-4099", "Smart LED Streetlight Maintenance", "Escalated", "High", 48,
            (now - timedelta(hours=52)).isoformat(), (now - timedelta(hours=4)).isoformat(), 96,
            "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/streetlight_sample.jpg", None, 42, "V3"
        ),
        (
            "HM-1028", "Drainage Blockage", "Overflowing sewer drain near Devaraja Market entrance emitting foul odor.",
            12.3060, 76.6540, "Devaraja Market Road, Mysuru", "WARD-42", "Ward 42 — Devaraja / Agrahara",
            "Mysuru City Corporation (MCC)", "Drainage & Sewerage Operations", "DEPT-DRAIN", "Eng. Rajesh Kumar", "OFF-101",
            "RM-2042", "Ward 42 Infrastructure Maintenance", "Resolved", "High", 18,
            (now - timedelta(days=1)).isoformat(), (now - timedelta(hours=6)).isoformat(), 93,
            "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7", "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", 29, "V3"
        ),
        (
            "HM-1030", "Illegal Dumping", "Construction debris illegally dumped on public footpath near Kuvempunagar bus stand.",
            12.2900, 76.6320, "Kuvempunagar Bus Stand, Ward 12, Mysuru", "WARD-12", "Ward 12 — Kuvempunagar Complex",
            "Mysuru City Corporation (MCC)", "Solid Waste Management (SWM)", "DEPT-SWM", "Inspector M. Swamy", "OFF-104",
            "WS-3012", "Kuvempunagar Maintenance Contract", "In Progress", "Medium", 24,
            (now - timedelta(hours=8)).isoformat(), (now + timedelta(hours=16)).isoformat(), 88,
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b", None, 15, "V3"
        ),
        (
            "HM-1032", "Water Pipeline Leakage", "Underground potable water pipe burst causing water wastage near Saraswathipuram 1st Main.",
            12.3010, 76.6350, "1st Main, Saraswathipuram, Mysuru", "WARD-15", "Ward 15 — Saraswathipuram",
            "Karnataka Urban Water Supply & Drainage Board (KUWSDB)", "Water Supply & Sanitation", "DEPT-WATER", "Eng. H. N. Manjunath", "OFF-105",
            None, "Water Department Operations", "Reported", "High", 12,
            (now - timedelta(hours=1)).isoformat(), (now + timedelta(hours=11)).isoformat(), 95,
            "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7", None, 31, "V3"
        ),
        (
            "HM-1035", "Infrastructure Damage", "Damaged concrete footbridge slab near Hebbal Lake park entrance.",
            12.3520, 76.6150, "Hebbal Lake Road, Ward 22, Mysuru", "WARD-22", "Ward 22 — Hebbal Industrial Zone",
            "Mysuru Urban Development Authority (MUDA)", "Urban Infrastructure & Engineering", "DEPT-MUDA", "Officer K. N. Ramesh", "OFF-106",
            "HI-5011", "Hebbal Industrial Infrastructure Tender", "Assigned", "Medium", 36,
            (now - timedelta(hours=5)).isoformat(), (now + timedelta(hours=31)).isoformat(), 89,
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", None, 19, "V3"
        ),
        (
            "HM-1038", "Pothole", "Multiple potholes along Chamundipuram main commercial stretch.",
            12.2920, 76.6580, "Chamundipuram Main Road, Ward 30, Mysuru", "WARD-30", "Ward 30 — Chamundipuram",
            "Mysuru City Corporation (MCC)", "Road Engineering & Infrastructure", "DEPT-ROAD", "Eng. Rajesh Kumar", "OFF-101",
            "RM-2042", "Ward 30 Road Works", "In Progress", "High", 24,
            (now - timedelta(hours=10)).isoformat(), (now + timedelta(hours=14)).isoformat(), 92,
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", None, 22, "V3"
        ),
        (
            "HM-1040", "Open Manhole", "Missing manhole cover on 4th Main Metagalli Industrial layout near Railway Gate.",
            12.3480, 76.6260, "Metagalli 4th Main, Ward 05, Mysuru", "WARD-05", "Ward 05 — Metagalli",
            "Mysuru City Corporation (MCC)", "Drainage & Sewerage Operations", "DEPT-DRAIN", "Inspector M. Swamy", "OFF-104",
            None, "Emergency Operations", "Reported", "High", 6,
            (now - timedelta(minutes=45)).isoformat(), (now + timedelta(hours=5, minutes=15)).isoformat(), 97,
            "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7", None, 45, "V3"
        ),
        (
            "HM-1042", "Traffic Light Malfunction", "Traffic signal stuck permanently on Red at Jayalakshmipuram Kalidasa Road junction.",
            12.3180, 76.6340, "Kalidasa Road Junction, Jayalakshmipuram, Mysuru", "WARD-18", "Ward 18 — Jayalakshmipuram",
            "Mysuru City Traffic Police & MCC", "Traffic Signals & Electronics", "DEPT-ELEC", "Eng. P. Venkatesh", "OFF-103",
            "SL-4099", "Smart Traffic Lights AMC", "In Progress", "High", 12,
            (now - timedelta(hours=3)).isoformat(), (now + timedelta(hours=9)).isoformat(), 91,
            "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/streetlight_sample.jpg", None, 28, "V3"
        ),
        (
            "HM-1045", "Damaged Footpath", "Broken interlock tiles and open cable trench on Vontikoppal Club Road.",
            12.3250, 76.6410, "Club Road, Vontikoppal, Ward 27, Mysuru", "WARD-27", "Ward 27 — Vontikoppal",
            "Mysuru City Corporation (MCC)", "Road Engineering & Infrastructure", "DEPT-ROAD", "Eng. Rajesh Kumar", "OFF-101",
            "RM-2042", "Footpath Restoration Contract", "Assigned", "Medium", 48,
            (now - timedelta(hours=14)).isoformat(), (now + timedelta(hours=34)).isoformat(), 86,
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", None, 12, "V3"
        ),
        (
            "HM-1048", "Stray Animal Nuisance", "Large pack of aggressive stray dogs near Nanjangud Road bus halt.",
            12.2810, 76.6620, "Nanjangud Road, Fort Mohalla, Mysuru", "WARD-33", "Ward 33 — Fort Mohalla",
            "Mysuru City Corporation (MCC)", "Veterinary & Animal Husbandry", "DEPT-VET", "Dr. S. K. Chethan", "OFF-107",
            None, "Municipal ABC Program", "Reported", "Medium", 36,
            (now - timedelta(hours=4)).isoformat(), (now + timedelta(hours=32)).isoformat(), 90,
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b", None, 17, "V3"
        ),
        (
            "HM-1050", "Tree Fall Hazard", "Heavy dried banyan tree branch hanging dangerously over electric cables in Bannimantap.",
            12.3410, 76.6510, "Bannimantap C Layout, Ward 50, Mysuru", "WARD-50", "Ward 50 — Bannimantap",
            "MCC Forest Wing & KPTCL", "Horticulture & Tree Cell", "DEPT-HORT", "Officer K. N. Ramesh", "OFF-106",
            None, "Emergency Tree Operations", "In Progress", "High", 12,
            (now - timedelta(hours=5)).isoformat(), (now + timedelta(hours=7)).isoformat(), 96,
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", None, 39, "V3"
        ),
        (
            "HM-1053", "Garbage Overflow", "Illegal open garbage dumping spot near Rajivnagar 1st Stage Park corner.",
            12.3310, 76.6780, "Main Gate, Rajivnagar 1st Stage, Mysuru", "WARD-55", "Ward 55 — Rajivnagar",
            "Mysuru City Corporation (MCC)", "Solid Waste Management (SWM)", "DEPT-SWM", "Officer S. Lakshmi", "OFF-102",
            "WM-1088", "Zone 4 Garbage Collection Contract", "Resolved", "High", 24,
            (now - timedelta(days=2)).isoformat(), (now - timedelta(days=1)).isoformat(), 94,
            "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/garbage_sample.jpg", "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", 21, "V3"
        ),
        (
            "HM-1056", "Park Maintenance", "Damaged playground swings and broken benches inside Alanahalli Children's Park.",
            12.2980, 76.6890, "T.Narsipura Road, Alanahalli, Ward 60, Mysuru", "WARD-60", "Ward 60 — Alanahalli",
            "Mysuru Urban Development Authority (MUDA)", "Parks & Horticulture", "DEPT-MUDA", "Officer K. N. Ramesh", "OFF-106",
            None, "MUDA Parks Maintenance", "Assigned", "Low", 72,
            (now - timedelta(hours=18)).isoformat(), (now + timedelta(hours=54)).isoformat(), 87,
            "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7", None, 8, "V3"
        ),
        (
            "HM-1060", "Pothole", "Continuous series of monsoon waterlogged potholes on Ring Road near Bogadi Junction.",
            12.2850, 76.6120, "Outer Ring Road, Bogadi, Mysuru", "WARD-12", "Ward 12 — Kuvempunagar Complex",
            "National Highways Authority of India (NHAI) / MCC", "Road Engineering & Infrastructure", "DEPT-ROAD", "Eng. Rajesh Kumar", "OFF-101",
            "RM-2042", "Ring Road Repairs Contract", "Reopened", "High", 24,
            (now - timedelta(days=3)).isoformat(), (now + timedelta(hours=12)).isoformat(), 95,
            "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/pothole_sample.jpg", None, 52, "V3"
        )
    ]

    cursor.executemany('''
        INSERT OR IGNORE INTO complaints VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', complaints)

    timelines = [
        ("HM-1024", "09:00 AM", "Reported", "Citizen", "Complaint submitted with GPS location tag & photo evidence."),
        ("HM-1024", "09:02 AM", "Auto Routed", "CivicRoute AI", "Matched location to Ward 42 MCC Road Engineering."),
        ("HM-1024", "09:15 AM", "Assigned", "System Engine", "Assigned to Eng. Rajesh Kumar under Contract RM-2042."),
        ("HM-1024", "11:30 AM", "In Progress", "Eng. Rajesh Kumar", "Road repair team dispatched with asphalt patcher."),
        ("HM-1025", "10:15 AM", "Reported", "Citizen", "Complaint registered via Mobile App."),
        ("HM-1025", "10:16 AM", "Auto Routed", "CivicRoute AI", "Routed to SWM Dept, Officer S. Lakshmi."),
        ("HM-1019", "2 Days Ago", "Reported", "Citizen", "Streetlight fault submitted."),
        ("HM-1019", "4 Hours Ago", "Escalated", "SLA Monitor", "SLA breached (48h limit exceeded). Auto-escalated to Zonal Commissioner."),
        ("HM-1028", "Yesterday", "Reported", "Citizen", "Drain blockage reported near market entrance."),
        ("HM-1028", "Yesterday", "In Progress", "MCC Sewerage Team", "Jetter vehicle dispatched to clear underground blockage."),
        ("HM-1028", "6 Hours Ago", "Resolved", "Eng. Rajesh Kumar", "Blockage completely cleared and area sanitized."),
        ("HM-1060", "3 Days Ago", "Reported", "Citizen", "Waterlogged pothole reported."),
        ("HM-1060", "2 Days Ago", "Resolved", "Contractor", "Temporary sand filling done."),
        ("HM-1060", "1 Day Ago", "Reopened", "Citizen", "Rain washed away temporary sand filling. Reopened for hot-mix asphalt asphalt fix.")
    ]

    cursor.executemany('''
        INSERT OR IGNORE INTO timelines (complaint_id, time, status, actor, desc) VALUES (?, ?, ?, ?, ?)
    ''', timelines)

# Database Helper Functions

def get_all_complaints_db(status=None, ward_id=None, category=None):
    conn = get_db()
    cursor = conn.cursor()
    query = "SELECT * FROM complaints WHERE 1=1"
    params = []

    if status and status != "All":
        query += " AND LOWER(status) = LOWER(?)"
        params.append(status)
    if ward_id:
        query += " AND ward_id = ?"
        params.append(ward_id)
    if category and category != "All":
        query += " AND LOWER(category) = LOWER(?)"
        params.append(category)

    query += " ORDER BY created_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()

    results = []
    for r in rows:
        c_dict = dict(r)
        cursor.execute("SELECT time, status, actor, desc FROM timelines WHERE complaint_id = ? ORDER BY id ASC", (c_dict["id"],))
        c_dict["timeline"] = [dict(t) for t in cursor.fetchall()]
        results.append(c_dict)

    conn.close()
    return results

def get_complaint_by_id_db(complaint_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM complaints WHERE id = ?", (complaint_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None

    c_dict = dict(row)
    cursor.execute("SELECT time, status, actor, desc FROM timelines WHERE complaint_id = ? ORDER BY id ASC", (complaint_id,))
    c_dict["timeline"] = [dict(t) for t in cursor.fetchall()]
    conn.close()
    return c_dict

def insert_complaint_db(complaint_dict: dict):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute('''
        INSERT INTO complaints VALUES (
            :id, :category, :description, :latitude, :longitude, :address,
            :ward_id, :ward_name, :authority_name, :department_name, :department_id,
            :officer_name, :officer_id, :contract_id, :contract_title, :status,
            :priority, :sla_hours, :created_at, :expected_resolution, :ai_confidence,
            :before_image_url, :after_image_url, :upvotes, :jurisdiction_version
        )
    ''', complaint_dict)

    for t in complaint_dict.get("timeline", []):
        cursor.execute('''
            INSERT INTO timelines (complaint_id, time, status, actor, desc)
            VALUES (?, ?, ?, ?, ?)
        ''', (complaint_dict["id"], t["time"], t["status"], t["actor"], t["desc"]))

    conn.commit()
    conn.close()

    # Sync to Firebase Firestore collection
    sync_to_firebase_firestore("complaints", complaint_dict["id"], {
        "category": complaint_dict["category"],
        "description": complaint_dict["description"],
        "address": complaint_dict["address"],
        "status": complaint_dict["status"],
        "ward_name": complaint_dict["ward_name"],
        "before_image_url": complaint_dict["before_image_url"]
    })

    return complaint_dict

def update_complaint_status_db(complaint_id: str, new_status: str, actor: str, notes: str, after_image_url: Optional[str] = None):
    conn = get_db()
    cursor = conn.cursor()

    if after_image_url:
        cursor.execute("UPDATE complaints SET status = ?, after_image_url = ? WHERE id = ?", (new_status, after_image_url, complaint_id))
    else:
        cursor.execute("UPDATE complaints SET status = ? WHERE id = ?", (new_status, complaint_id))

    time_str = datetime.now().strftime("%I:%M %p")
    cursor.execute('''
        INSERT INTO timelines (complaint_id, time, status, actor, desc)
        VALUES (?, ?, ?, ?, ?)
    ''', (complaint_id, time_str, new_status, actor, notes or f"Status updated to {new_status}"))

    conn.commit()
    conn.close()

    # Sync status to Firebase Firestore
    sync_to_firebase_firestore("complaints", complaint_id, {
        "status": new_status,
        "after_image_url": after_image_url or ""
    })

    return get_complaint_by_id_db(complaint_id)

def upvote_complaint_db(complaint_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE complaints SET upvotes = upvotes + 1 WHERE id = ?", (complaint_id,))
    conn.commit()
    cursor.execute("SELECT upvotes FROM complaints WHERE id = ?", (complaint_id,))
    upvotes = cursor.fetchone()[0]
    conn.close()
    return upvotes

def register_user_db(name, email, password, role="citizen", phone="", ward_id="WARD-42"):
    conn = get_db()
    cursor = conn.cursor()
    user_id = f"USR-{datetime.now().strftime('%M%S')}"
    now = datetime.now().isoformat()

    try:
        cursor.execute('''
            INSERT INTO users (id, name, email, password_hash, role, phone, ward_id, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, name, email, password, role, phone, ward_id, now))
        conn.commit()

        # Sync user to Firebase Firestore users collection
        sync_to_firebase_firestore("users", user_id, {
            "name": name,
            "email": email,
            "role": role,
            "phone": phone
        })
    except sqlite3.IntegrityError:
        conn.close()
        return None, "Email already registered"

    conn.close()
    return {
        "id": user_id,
        "name": name,
        "email": email,
        "role": role,
        "phone": phone,
        "ward_id": ward_id,
        "token": f"token_{user_id}_{now}"
    }, None

def login_user_db(email, password):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ? AND password_hash = ?", (email, password))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None, "Invalid email or password"

    u = dict(row)
    return {
        "id": u["id"],
        "name": u["name"],
        "email": u["email"],
        "role": u["role"],
        "phone": u["phone"],
        "ward_id": u["ward_id"],
        "token": f"token_{u['id']}_{datetime.now().isoformat()}"
    }, None

init_db()
