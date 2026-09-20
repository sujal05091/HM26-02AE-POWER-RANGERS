from datetime import datetime, timedelta

def calculate_sla_status(created_at_iso: str, sla_hours: int, current_status: str):
    """
    Calculate SLA remaining time, status (On Track, Warning, Overdue/Escalated), and completion percentage.
    """
    if current_status in ["Resolved", "Closed"]:
        return {
            "status": "Completed",
            "is_breached": False,
            "remaining_seconds": 0,
            "remaining_formatted": "Resolved",
            "percentage_remaining": 100
        }

    try:
        created_time = datetime.fromisoformat(created_at_iso)
    except Exception:
        created_time = datetime.now() - timedelta(hours=2)

    deadline = created_time + timedelta(hours=sla_hours)
    now = datetime.now()
    
    total_seconds = sla_hours * 3600
    elapsed_seconds = (now - created_time).total_seconds()
    remaining_seconds = (deadline - now).total_seconds()

    if remaining_seconds <= 0:
        is_breached = True
        status_label = "Escalated" if current_status == "Escalated" else "Overdue"
        overdue_hours = abs(remaining_seconds) / 3600
        remaining_formatted = f"-{int(overdue_hours)}h overdue"
        percentage = 0
    else:
        is_breached = False
        hours = int(remaining_seconds // 3600)
        minutes = int((remaining_seconds % 3600) // 60)
        remaining_formatted = f"{hours}h {minutes}m remaining"
        percentage = max(0, min(100, int((remaining_seconds / total_seconds) * 100)))
        
        if percentage < 25:
            status_label = "SLA Warning"
        else:
            status_label = "On Track"

    return {
        "status": status_label,
        "is_breached": is_breached,
        "remaining_seconds": int(remaining_seconds),
        "remaining_formatted": remaining_formatted,
        "percentage_remaining": percentage,
        "deadline_iso": deadline.isoformat()
    }
