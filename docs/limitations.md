# Known Limitations & Scaling Roadmap

[← Back to README](../README.md)

## What Doesn't Work Yet

| Limitation | Why It Exists | Planned Engineering Fix |
|---|---|---|
| **High-Frequency Polygon Spatial Indexing** | Standard linear polygon search across 65+ MCC wards during peak traffic | Integrate R-Tree spatial indexing & GeoJSON caching via PostGIS (`geography` type) |
| **Kannada Native Voice Reporting** | Time constraints during 72-hour hackathon sprint | Integrate Bhashini / Whisper API speech-to-text model for Kannada voice complaints |
| **Automated Escalation SMS Gateway** | Requires paid DLT registration for Indian telecom SMS gateways | Currently sends real-time in-app alerts and Firebase dashboard push updates |

---

## Edge Cases We Don't Handle

- **GPS Spoofing / Mock Locations:** Users manually spoofing GPS coordinates outside Mysuru city limits are pinned to the nearest boundary edge.
- **Multiple Photo Angles for Single Defect:** Current version accepts one primary evidence photo per report submission.

---

## Scaling to All of Mysuru (65+ MCC Wards & Dasara Festival Traffic)

| What Breaks First | Estimated Numbers / Load | Engineering Fix |
|---|---|---|
| **Linear Database Table Scans** | 50,000+ complaints across 65 wards during Mysuru Dasara festival | Partition `complaints` table by `ward_id` and create B-Tree indexes on `status` and `created_at`. |
| **Synchronous Image Upload Overhead** | 500 simultaneous photo uploads on weak 3G networks | Offload image processing to an async background worker queue (Celery + Redis) with progressive WebP compression. |
| **Real-time Firestore Polling Overhead** | 1,000+ ward officers polling REST API every 3 seconds | Replace polling interval with WebSocket / Server-Sent Events (SSE) stream notifications. |

---

## Technical Roadmap

1. **Phase 1 MVP (Current)**: Dynamic spatial routing, AI Vision defect scan, OpenStreetMap pin, Cloudinary CDN, Neumorphic Governance Web Portal, and Flutter Mobile App.
2. **Phase 2 (City Scale)**: Full 65 MCC ward GIS integration, PostGIS spatial indexing, Kannada voice reporting, and contractor escrow penalty automation.
