import math
from datetime import datetime, timedelta

# Mysuru Civic Governance Data Seed — Expanded Dataset Across 7 Wards

JURISDICTION_VERSIONS = {
    "V3": {
        "version": "V3",
        "label": "V3 — Current (2026 Active Boundaries)",
        "effective_date": "2025-01-01",
        "description": "Updated MCC ward boundaries including reorganized Ward 42 Agrahara zone."
    },
    "V2": {
        "version": "V2",
        "label": "V2 — 2024 Boundary Split",
        "effective_date": "2024-01-01",
        "description": "Intermediate boundary division prior to suburban expansion."
    },
    "V1": {
        "version": "V1",
        "label": "V1 — 2022 Legacy Boundaries",
        "effective_date": "2022-01-01",
        "description": "Historical jurisdiction layout for retrospective complaint routing audit."
    }
}

AUTHORITIES = [
    {
        "id": "AUTH-MCC",
        "name": "Mysuru City Corporation (MCC)",
        "code": "MCC",
        "jurisdiction_type": "Municipal Corporation",
        "contact_email": "helpdesk@mysurucity.gov.in",
        "contact_phone": "+91 821 2418800"
    },
    {
        "id": "AUTH-MUDA",
        "name": "Mysuru Urban Development Authority (MUDA)",
        "code": "MUDA",
        "jurisdiction_type": "Urban Development",
        "contact_email": "support@muda.gov.in",
        "contact_phone": "+91 821 2420100"
    },
    {
        "id": "AUTH-KPTCL",
        "name": "Karnataka Power Transmission Corp Ltd (CESC/KPTCL)",
        "code": "KPTCL",
        "jurisdiction_type": "Power & Lighting",
        "contact_email": "power@cescmysore.in",
        "contact_phone": "+91 821 2435522"
    },
    {
        "id": "AUTH-KUWSDB",
        "name": "Karnataka Urban Water Supply & Drainage Board (KUWSDB)",
        "code": "KUWSDB",
        "jurisdiction_type": "Water & Sanitation",
        "contact_email": "water@kuwsdb.gov.in",
        "contact_phone": "+91 821 2441100"
    }
]

DEPARTMENTS = [
    {
        "id": "DEPT-ROAD",
        "name": "Road Engineering & Infrastructure",
        "authority_id": "AUTH-MCC",
        "categories": ["Pothole", "Damaged Road", "Infrastructure Damage"],
        "default_sla_hours": 24
    },
    {
        "id": "DEPT-SWM",
        "name": "Solid Waste Management (SWM)",
        "authority_id": "AUTH-MCC",
        "categories": ["Garbage Overflow", "Illegal Dumping"],
        "default_sla_hours": 12
    },
    {
        "id": "DEPT-DRAIN",
        "name": "Drainage & Sewerage Operations",
        "authority_id": "AUTH-MCC",
        "categories": ["Drainage Blockage", "Waterlogging"],
        "default_sla_hours": 18
    },
    {
        "id": "DEPT-ELEC",
        "name": "Streetlight & Electrical Maintenance",
        "authority_id": "AUTH-KPTCL",
        "categories": ["Broken Streetlight", "Power Fault"],
        "default_sla_hours": 48
    },
    {
        "id": "DEPT-WATER",
        "name": "Water Supply & Sanitation",
        "authority_id": "AUTH-KUWSDB",
        "categories": ["Water Pipeline Leakage", "Potable Water Supply"],
        "default_sla_hours": 12
    }
]

OFFICERS = [
    {
        "id": "OFF-101",
        "name": "Eng. Rajesh Kumar",
        "designation": "Senior Assistant Executive Engineer",
        "department_id": "DEPT-ROAD",
        "ward_id": "WARD-42",
        "phone": "+91 98450 12345",
        "active_complaints": 6,
        "rating": 4.8
    },
    {
        "id": "OFF-102",
        "name": "Officer S. Lakshmi",
        "designation": "Chief Health & Sanitary Inspector",
        "department_id": "DEPT-SWM",
        "ward_id": "WARD-38",
        "phone": "+91 98450 67890",
        "active_complaints": 4,
        "rating": 4.6
    },
    {
        "id": "OFF-103",
        "name": "Eng. P. Venkatesh",
        "designation": "Junior Electrical Engineer",
        "department_id": "DEPT-ELEC",
        "ward_id": "WARD-41",
        "phone": "+91 98450 11223",
        "active_complaints": 5,
        "rating": 4.9
    },
    {
        "id": "OFF-104",
        "name": "Inspector M. Swamy",
        "designation": "Sanitary Inspector",
        "department_id": "DEPT-SWM",
        "ward_id": "WARD-12",
        "phone": "+91 98450 44556",
        "active_complaints": 3,
        "rating": 4.5
    },
    {
        "id": "OFF-105",
        "name": "Eng. H. N. Manjunath",
        "designation": "Executive Water Engineer",
        "department_id": "DEPT-WATER",
        "ward_id": "WARD-15",
        "phone": "+91 98450 77889",
        "active_complaints": 4,
        "rating": 4.7
    }
]

CONTRACTS = [
    {
        "id": "RM-2042",
        "title": "Ward 42 Comprehensive Road Maintenance & Patchwork Contract",
        "contractor_name": "Mysore Infrastructure & Paving Pvt Ltd",
        "department_id": "DEPT-ROAD",
        "ward_id": "WARD-42",
        "valid_until": "2026-12-31",
        "status": "Active",
        "contact_person": "M. N. Suresh (Site Supervisor)",
        "scope": "Asphalt patching, pothole repairs, curb restoration within Ward 42 limits."
    },
    {
        "id": "WM-1088",
        "title": "Zone 4 Door-to-Door Waste Collection & Dump Clearance",
        "contractor_name": "Clean Mysuru Waste Services Ltd",
        "department_id": "DEPT-SWM",
        "ward_id": "WARD-38",
        "valid_until": "2027-06-30",
        "status": "Active",
        "contact_person": "K. Somanna",
        "scope": "Daily garbage collection, hotspot clearance, and community container management."
    },
    {
        "id": "WS-3012",
        "title": "Kuwempunagar Potable Water Mains Maintenance Contract",
        "contractor_name": "Cauvery Water Infrastructure Ltd",
        "department_id": "DEPT-WATER",
        "ward_id": "WARD-12",
        "valid_until": "2026-08-31",
        "status": "Active",
        "contact_person": "P. Ramesh",
        "scope": "Pipe leak repair, valve maintenance, and emergency water supply."
    }
]

WARDS = [
    {"id": "WARD-42", "number": 42, "name": "Devaraja / Agrahara", "zone": "Zone 4", "center_lat": 12.3051, "center_lng": 76.6551, "bounds": {"min_lat": 12.2980, "max_lat": 12.3120, "min_lng": 76.6480, "max_lng": 76.6620}, "jurisdiction_mapping": {"V3": "MCC Zone 4", "V2": "MCC Sub-Zone B", "V1": "Legacy Central Ward 12"}},
    {"id": "WARD-38", "number": 38, "name": "Vijayanagar 2nd Stage", "zone": "Zone 3", "center_lat": 12.3200, "center_lng": 76.6200, "bounds": {"min_lat": 12.3100, "max_lat": 12.3300, "min_lng": 76.6100, "max_lng": 76.6300}, "jurisdiction_mapping": {"V3": "MCC Zone 3", "V2": "MUDA Expansion", "V1": "Gram Panchayat Outer"}},
    {"id": "WARD-41", "number": 41, "name": "Gokulam 3rd Stage / KRS Road", "zone": "Zone 5", "center_lat": 12.3350, "center_lng": 76.6380, "bounds": {"min_lat": 12.3250, "max_lat": 12.3450, "min_lng": 76.6280, "max_lng": 76.6480}, "jurisdiction_mapping": {"V3": "MCC Zone 5", "V2": "MCC Zone 5", "V1": "North Ward 8"}},
    {"id": "WARD-12", "number": 12, "name": "Kuvempunagar Complex", "zone": "Zone 2", "center_lat": 12.2900, "center_lng": 76.6320, "bounds": {"min_lat": 12.2800, "max_lat": 12.3000, "min_lng": 76.6200, "max_lng": 76.6400}, "jurisdiction_mapping": {"V3": "MCC Zone 2", "V2": "MCC Zone 2", "V1": "South Ward 5"}},
    {"id": "WARD-15", "number": 15, "name": "Saraswathipuram", "zone": "Zone 2", "center_lat": 12.3010, "center_lng": 76.6350, "bounds": {"min_lat": 12.2950, "max_lat": 12.3100, "min_lng": 76.6250, "max_lng": 76.6450}, "jurisdiction_mapping": {"V3": "MCC Zone 2", "V2": "MCC Zone 2", "V1": "West Ward 4"}},
    {"id": "WARD-22", "number": 22, "name": "Hebbal Industrial Zone", "zone": "Zone 1", "center_lat": 12.3520, "center_lng": 76.6150, "bounds": {"min_lat": 12.3400, "max_lat": 12.3650, "min_lng": 76.6000, "max_lng": 76.6300}, "jurisdiction_mapping": {"V3": "MCC Zone 1", "V2": "MUDA Industrial", "V1": "Outer Ward 1"}},
    {"id": "WARD-30", "number": 30, "name": "Chamundipuram", "zone": "Zone 4", "center_lat": 12.2920, "center_lng": 76.6580, "bounds": {"min_lat": 12.2850, "max_lat": 12.3000, "min_lng": 76.6500, "max_lng": 76.6700}, "jurisdiction_mapping": {"V3": "MCC Zone 4", "V2": "MCC Zone 4", "V1": "Central Ward 9"}}
]

# Initial Seed Complaints List
COMPLAINTS_DB = [
    {
        "id": "HM-1024",
        "category": "Pothole",
        "description": "Deep dangerous pothole near Agrahara Circle school gate causing traffic block and accidents.",
        "latitude": 12.3052,
        "longitude": 76.6553,
        "address": "Agrahara Circle, Ward 42, Mysuru",
        "ward_id": "WARD-42",
        "ward_name": "Ward 42 — Devaraja / Agrahara",
        "authority_name": "Mysuru City Corporation (MCC)",
        "department_name": "Road Engineering & Infrastructure",
        "department_id": "DEPT-ROAD",
        "officer_name": "Eng. Rajesh Kumar",
        "officer_id": "OFF-101",
        "contract_id": "RM-2042",
        "contract_title": "Ward 42 Road Maintenance Contract",
        "status": "In Progress",
        "priority": "High",
        "sla_hours": 24,
        "created_at": (datetime.now() - timedelta(hours=6)).isoformat(),
        "expected_resolution": (datetime.now() + timedelta(hours=18)).isoformat(),
        "ai_confidence": 94,
        "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/pothole_sample.jpg",
        "after_image_url": None,
        "upvotes": 24,
        "timeline": [
            {"time": "09:00 AM", "status": "Reported", "actor": "Citizen", "desc": "Complaint submitted with location tag & photo evidence."},
            {"time": "09:02 AM", "status": "Auto Routed", "actor": "CivicRoute AI", "desc": "Matched location to Ward 42 MCC Road Engineering."},
            {"time": "09:15 AM", "status": "Assigned", "actor": "System Engine", "desc": "Assigned to Eng. Rajesh Kumar under Contract RM-2042."},
            {"time": "11:30 AM", "status": "In Progress", "actor": "Eng. Rajesh Kumar", "desc": "Road repair team dispatched with asphalt patcher."}
        ]
    },
    {
        "id": "HM-1025",
        "category": "Garbage Overflow",
        "description": "Unattended waste accumulation near Vijayanagar water tank.",
        "latitude": 12.3205,
        "longitude": 76.6208,
        "address": "2nd Main, Vijayanagar 2nd Stage, Mysuru",
        "ward_id": "WARD-38",
        "ward_name": "Ward 38 — Vijayanagar 2nd Stage",
        "authority_name": "Mysuru City Corporation (MCC)",
        "department_name": "Solid Waste Management (SWM)",
        "department_id": "DEPT-SWM",
        "officer_name": "Officer S. Lakshmi",
        "officer_id": "OFF-102",
        "contract_id": "WM-1088",
        "contract_title": "Zone 4 Garbage Collection Contract",
        "status": "Assigned",
        "priority": "Medium",
        "sla_hours": 12,
        "created_at": (datetime.now() - timedelta(hours=2)).isoformat(),
        "expected_resolution": (datetime.now() + timedelta(hours=10)).isoformat(),
        "ai_confidence": 91,
        "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/garbage_sample.jpg",
        "after_image_url": None,
        "upvotes": 14,
        "timeline": [
            {"time": "10:15 AM", "status": "Reported", "actor": "Citizen", "desc": "Complaint registered via Mobile App."},
            {"time": "10:16 AM", "status": "Auto Routed", "actor": "CivicRoute AI", "desc": "Routed to SWM Dept, Officer S. Lakshmi."}
        ]
    },
    {
        "id": "HM-1019",
        "category": "Broken Streetlight",
        "description": "Streetlight pole non-functional for past 3 days on KRS Road.",
        "latitude": 12.3355,
        "longitude": 76.6385,
        "address": "KRS Main Road, Gokulam 3rd Stage, Mysuru",
        "ward_id": "WARD-41",
        "ward_name": "Ward 41 — Gokulam 3rd Stage",
        "authority_name": "Karnataka Power Transmission Corp Ltd (KPTCL)",
        "department_name": "Streetlight & Electrical Maintenance",
        "department_id": "DEPT-ELEC",
        "officer_name": "Eng. P. Venkatesh",
        "officer_id": "OFF-103",
        "contract_id": None,
        "contract_title": "Direct Department Maintenance",
        "status": "Escalated",
        "priority": "High",
        "sla_hours": 48,
        "created_at": (datetime.now() - timedelta(hours=52)).isoformat(),
        "expected_resolution": (datetime.now() - timedelta(hours=4)).isoformat(),
        "ai_confidence": 96,
        "before_image_url": "https://res.cloudinary.com/dycudtwkj/image/upload/v1680000000/streetlight_sample.jpg",
        "after_image_url": None,
        "upvotes": 31,
        "timeline": [
            {"time": "2 Days Ago", "status": "Reported", "actor": "Citizen", "desc": "Streetlight fault submitted."},
            {"time": "2 Days Ago", "status": "Assigned", "actor": "System Engine", "desc": "Assigned to Eng. P. Venkatesh."},
            {"time": "4 Hours Ago", "status": "Escalated", "actor": "SLA Monitor", "desc": "SLA breached (48h limit exceeded). Auto-escalated to Executive Engineer."}
        ]
    }
]
