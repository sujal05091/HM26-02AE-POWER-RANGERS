import math
from data_store import COMPLAINTS_DB

def calculate_haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate the great circle distance in meters between two GPS coordinates using Haversine formula.
    """
    R = 6371000  # Radius of Earth in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2.0) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = R * c
    return distance

def check_duplicate_complaint(lat: float, lng: float, category: str, radius_meters: float = 50.0):
    """
    Check if a similar complaint already exists within the specified radius (50 meters).
    Returns duplicate status, existing complaint details, and distance.
    """
    nearby_duplicates = []
    
    for complaint in COMPLAINTS_DB:
        # Check matching or similar category and active status
        if complaint["status"] in ["Reported", "Assigned", "In Progress", "Escalated"]:
            dist = calculate_haversine_distance(lat, lng, complaint["latitude"], complaint["longitude"])
            if dist <= radius_meters:
                nearby_duplicates.append({
                    "complaint_id": complaint["id"],
                    "category": complaint["category"],
                    "description": complaint["description"],
                    "status": complaint["status"],
                    "distance_meters": round(dist, 1),
                    "created_at": complaint["created_at"],
                    "upvotes": complaint.get("upvotes", 1)
                })

    if nearby_duplicates:
        # Sort by distance
        nearby_duplicates.sort(key=lambda x: x["distance_meters"])
        return {
            "has_duplicate": True,
            "matched_complaint": nearby_duplicates[0],
            "all_nearby_duplicates": nearby_duplicates,
            "message": f"Similar complaint found {nearby_duplicates[0]['distance_meters']} meters away."
        }
    
    return {
        "has_duplicate": False,
        "matched_complaint": None,
        "all_nearby_duplicates": [],
        "message": "No duplicate complaints detected nearby."
    }
