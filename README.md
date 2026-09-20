# CivicRoute — Dynamic Civic Infrastructure Routing & Governance Platform

> HackMysuru 1.0 · Phase 1 Submission · Civic Governance & Clean Mysuru  
> Team **Power Rangers** (`HM26-02AE`)  
> 🌐 **Live Web Governance Portal:** [`https://hm-26-02-ae-power-rangers.vercel.app/`](https://hm-26-02-ae-power-rangers.vercel.app/)

| 📎 Submission links | 📋 Templates | 🏗️ Architecture | 🛡️ Hard constraints | ⚙️ Setup | 🤖 AI usage | ⚠️ Limitations |
|---|---|---|---|---|---|---|
| [resource.md](./resource.md) | [resource-templates/](./resource-templates/) | [docs/architecture.md](./docs/architecture.md) | [docs/constraints.md](./docs/constraints.md) | [docs/setup.md](./docs/setup.md) | [ai.md](./ai.md) | [docs/limitations.md](./docs/limitations.md) |

---

## 1. Problem Understanding

**Chosen sub-problem:** `Dynamic Civic Complaint Routing, Ward Geofencing & SLA Accountability`

- **The gap we saw:** In Mysuru, citizen complaints regarding potholes, garbage overflows, and broken infrastructure frequently bounce between departments (MCC, Town Panchayats, Gram Panchayats, and KPTCL). Citizens have no visibility into jurisdiction boundaries, leading to unassigned tickets and breached resolution SLAs.
- **Why it matters:** Bounced complaints cause prolonged infrastructure hazards, public distrust, delayed field dispatches, and zero accountability for service contractors holding municipal maintenance tenders.
- **Why we chose this over the others:** Routing is the foundational bottleneck. Without deterministic spatial geofencing and automated officer assignment, even valid civic reports sit unaddressed.
- **What "solved" looks like for us:** A citizen captures a photo, and within 5 seconds, AI Vision classifies the defect, detects the device's live GPS, maps it to the exact MCC Ward polygon boundary, uploads the evidence to Cloudinary, and assigns it to the designated Senior AEE Officer with an active 24-hour SLA clock.

---

## 2. Target Users & Mysuru Context

| User | Their situation | What they need from us |
|---|---|---|
| **Mysuru Resident / Citizen** | Standing on Agrahara or Vijayanagar road with a pothole; unfamiliar with municipal ward maps; patchy mobile data. | 1-tap photo capture, automatic 5s AI classification, live map pin, instant ticket ID `#HM-1024`, and SLA tracking. |
| **MCC Ward Officer (Eng. Rajesh Kumar)** | Senior AEE managing Ward 42; flooded with scattered phone calls and unverified complaints. | Prioritized task queue, high-confidence AI evidence photos, contract tender mapping, and field navigation map. |
| **Municipal Administrator (Admin Governance)** | Managing 14+ MCC wards; needs executive visibility over ward performance and contractor SLA compliance. | Executive summary heatmaps, boundary version manager (V1/V2/V3), escalation audit trail, and officer performance metrics. |

**Local context we designed for:** Mysuru City Corporation (MCC) ward boundaries, multi-zone jurisdiction splits (Zone 1 to Zone 5), offline-resilient Flutter mobile app with SharedPreferences persistence, OpenStreetMap tile geofencing, and Neumorphic web governance portal.

---

## 3. Solution Overview

CivicRoute provides a end-to-end civic accountability loop consisting of a Flutter Mobile App for Citizens and a Neumorphic Web Governance Portal for Officers & Admins.

**Core 4-Step Journey:**
1. **Citizen Capture**: Citizen opens Flutter app, captures photo evidence, and runs 5-second AI Vision classification scan.
2. **Dynamic Routing Engine**: System detects live GPS, pins location on OpenStreetMap, maps coordinates to MCC Ward 42 polygon boundaries (V3 schema), and uploads evidence to Cloudinary.
3. **Officer Inspection & Action**: Senior AEE Officer receives real-time ticket notification on Web Governance Portal, inspects defect details, and dispatches field team.
4. **Resolution & Escrow SLA Tracking**: Officer uploads resolution proof photo; ticket updates to "Resolved" across mobile and web dashboards before SLA clock expiration.

---

## 4. Architecture

`Flutter Mobile App & Neumorphic React Web Dashboard → FastAPI REST Engine / Firebase Firestore Sync → Cloudinary Evidence CDN & SQLite Storage`

➡️ Full diagram, components, data model and APIs: **[docs/architecture.md](./docs/architecture.md)**

---

## 5. Tech Stack & AI Usage

**Tech Stack:**
- **Mobile App:** Flutter 3.x (Dart), `image_picker`, `geolocator`, `flutter_map`, `latlong2`, `shared_preferences`.
- **Web Dashboard:** React 18, Vite, Lucide Icons, Neumorphic CSS Design System.
- **Backend API:** FastAPI (Python 3.11), Uvicorn, SQLite Persistent Engine.
- **Database & Sync:** Firebase Firestore REST API (Live realtime synchronization).
- **Storage CDN:** Cloudinary REST API (`dycudtwkj` cloud name).

**AI tools used in development:** Antigravity AI Coding Assistant, ChatGPT-4o.  
**AI inside the product:** AI Vision Classifier (`ai_classifier.py`) providing defect classification, boundary extraction, and confidence scoring (94% confidence).

➡️ Full disclosure: **[ai.md](./ai.md)**

---

## 6. Decision Log (Summary)

- **Chose:** Spatial Polygon Geofencing (OpenStreetMap / Boundary V3) + Direct Cloudinary Base64 Storage, **over:** Static radial distance matching and local file path references.
- **Because:** Boundary cases near ward edges (e.g. Ward 42 vs Ward 38) require exact polygon containment to prevent jurisdiction bouncing, and Cloudinary URLs allow seamless web & mobile image rendering.
- **First thing to break at city scale:** High-frequency spatial point-in-polygon queries across 65+ MCC wards during heavy festival traffic (e.g., Mysuru Dasara). Fixed by adding R-Tree spatial indexing & GeoJSON caching.

➡️ Full decision log: **[resource.md](./resource.md#4-submission-artifacts-google-drive)** · Template: **[decision-log-template.md](./resource-templates/decision-log-template.md)**

---

## 7. Setup & Run

```bash
# 1. Start FastAPI Backend Engine
cd src/backend
python -m uvicorn main:app --reload --port 8000

# 2. Start Neumorphic Web Governance Portal
cd src/dashboard
npm install && npm run dev

# 3. Launch Flutter Mobile App
cd src/mobile
flutter run -d V2334
```

➡️ Prerequisites, environment variables, seed data and offline testing: **[docs/setup.md](./docs/setup.md)**

---

## 8. Known Limitations

- **Camera Activity Lifecycle on Low-RAM Devices:** Resolved using `ImagePicker().retrieveLostData()` and `SharedPreferences` persistence in `splash_screen.dart`.
- **Boundary Schema Evolution:** Managed via Jurisdiction Boundary Version Manager (supporting V1, V2, and V3 polygon schemas).
- **Offline Sync Queue:** Local reports queued in `SharedPreferences` when offline, auto-syncing to Firebase Firestore upon network reconnection.

➡️ Full list, edge cases and scaling roadmap: **[docs/limitations.md](./docs/limitations.md)**

---

## Team Power Rangers (`HM26-02AE`)

**Institution:** Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM), Bantakal, Udupi

| # | Name | Program & Year | Role | GitHub |
|---|---|---|---|---|
| 1 | **Sujal** (Lead) | B.E. AI & DS, 4th yr | Full Stack, Flutter App & Spatial Routing Engine | [`@sujal`](https://github.com/sujal05091) |
| 2 | **Hitesh A** | B.E. AI & DS, 4th yr | Web Governance Portal & UI/UX Architecture | [`@Hiteshacu`](https://github.com/Hiteshacu) |
| 3 | **Shama Patwardhan** | B.E. AI & DS, 4th yr | FastAPI Backend, Firebase Sync & Cloudinary CDN | [`@Shama-patwardhan`](https://github.com/Shama-patwardhan) |
| 4 | **Yathika P Amin** | B.E. AI & DS, 4th yr | Mobile App Testing, AI Classifier & Spatial Geofencing | [`@yathikapamin`](https://github.com/yathikapamin) |

---

## License

MIT License. Developed for HackMysuru 1.0 (September 2026).
