# HackMysuru 1.0 — Phase 1 Submission Index

> **This is the central landing file for team submission.** Reviewers open this file first.
> All external evaluation artifacts are uploaded to **Google Drive** and linked below.
> Freeze: **20 September 2026, 23:59 IST.**

---

## 1. Team Details

| Field | Value |
|---|---|
| Team ID (from dashboard) | `HM26-02AE` |
| Team Name | `Power Rangers` |
| College(s) | `Shri Madhwa Vadiraja Institute of Technology & Management (SMVITM), Bantakal, Udupi` |
| Team Leader | `Sujal` · `sujalUDUPI@gmail.com` · `+91 6360577780` |
| Repository | `https://github.com/sujal05091/HM26-02AE-POWER-RANGERS` |

| # | Member | Program & Year | GitHub Handle | Primary Role |
|---|---|---|---|---|
| 1 | Sujal (Lead) | B.E. AI & DS, 4th yr | `@sujal` | Full Stack, Flutter App & Spatial Routing Engine |
| 2 | Hitesh A | B.E. AI & DS, 4th yr | `@Hiteshacu` | Web Governance Portal & UI/UX Architecture |
| 3 | Shama Patwardhan | B.E. AI & DS, 4th yr | `@Shama-patwardhan` | FastAPI Backend, Firebase Sync & Cloudinary CDN |
| 4 | Yathika P Amin | B.E. AI & DS, 4th yr | `@yathikapamin` | Mobile App Testing, AI Classifier & Spatial Geofencing |

---

## 2. What We Built (one-liner)

**Sub-problem:** `Dynamic Civic Complaint Routing, Ward Geofencing & SLA Accountability Engine`

**In one sentence:** `An AI-powered offline-resilient mobile app and neumorphic governance portal that auto-routes citizen defect reports to Mysuru City Corporation (MCC) ward officers using spatial polygon boundaries (V1/V2/V3), Cloudinary evidence storage, and transparent 24-hour SLA escrow tracking.`

---

## 3. Repository Documents

| Document | What it covers |
|---|---|
| [README.md](./README.md) | Problem understanding, target user personas, 4-step core journey, architecture, setup & limitations |
| [ai.md](./ai.md) | AI tools used during development & runtime AI Vision Classifier specs |
| [docs/architecture.md](./docs/architecture.md) | Mermaid system architecture, component breakdown, ER data model, API endpoints, tech stack rationale |
| [docs/constraints.md](./docs/constraints.md) | Defense & verification against all 5 hard constraints (fake reports, jurisdiction, SLA formula, bad input, offline mode) |
| [docs/setup.md](./docs/setup.md) | Local run instructions for FastAPI backend, Vite dashboard, Flutter app, and Firebase Firestore seed script |
| [docs/limitations.md](./docs/limitations.md) | Known edge cases, scale limits (65+ wards, Dasara traffic), and technical roadmap |
| [docs/development/](./docs/development/) | Custom development specifications (PRD, SRS, UI-UX, Architecture, Setup guides) |
| [resource-templates/](./resource-templates/) | Official templates & checklists for video, decision log, and presentation |

---

## 4. Submission Artifacts (Google Drive)

> **Instructions for Team:**
> 1. Upload `HM26-02AE_video.mp4`, `HM26-02AE_decision-log.pdf`, and `HM26-02AE_presentation.pdf` to Google Drive.
> 2. Set sharing permission on each file to **"Anyone with the link can view"**.
> 3. Replace `YOUR_VIDEO_ID`, `YOUR_DECISION_LOG_ID`, `YOUR_PRESENTATION_ID` below with your actual Google Drive file IDs.
> 4. Generate SHA-256 hash using `certutil -hashfile <file> SHA256` on Windows, and paste the first 16 characters in the last column.

| # | Artifact | Google Drive Link | File Name | SHA-256 (first 16 chars) |
|---|---|---|---|---|
| 1 | [Pitch + Code Walkthrough Video](./resource-templates/video-guide.md) (≤ 10 min, MP4) | [Google Drive Link](https://drive.google.com/file/d/YOUR_VIDEO_ID/view?usp=sharing) | `HM26-02AE_video.mp4` | `REPLACE_WITH_16_HASH` |
| 2 | [Decision Log](./resource-templates/decision-log-template.md) (1 page, PDF) | [Google Drive Link](https://drive.google.com/file/d/1GcS-kIINsO7Y1DBmv0Fvw2M9M3SsoU9F/view?usp=sharing) | `HM26-02AE_decision-log.pdf` | `1GcS-kIINsO7Y1DB` |
| 3 | [Presentation](./resource-templates/presentation-template.md) (≤ 10 slides, PDF) | [Google Drive Link](https://drive.google.com/file/d/14NRtmjvZiooUUkxISjs_xN7GtumIiMD1/view?usp=sharing) | `CivicRoute_HackMysuru_Phase1.pdf` | `14NRtmjvZiooUUkx` |

### Video Chapters Breakdown

| Timestamp | Section | Key Topic / Demonstration |
|---|---|---|
| `00:00` | Hook & Problem | Team ID HM26-02AE, Mysuru civic defect gap, and bounced complaints scenario |
| `00:20` | Who It's For | Primary personas (Citizen, Ward Officer Eng. Rajesh, Admin Governance) & local constraints |
| `00:40` | Live Core Flow | Citizen snaps pothole → 5s AI scan → live GPS & OpenStreetMap pin → auto-routed ticket |
| `01:50` | Bad-Input Test | Submitting duplicate complaint, fake photo fallback, or out-of-boundary coordinates |
| `02:30` | Offline Mode Test | Device airplane mode, local queueing in SharedPreferences, automatic sync on reconnect |
| `03:00` | Architecture | Walkthrough of `docs/architecture.md`: Flutter → FastAPI / Firebase REST → Cloudinary CDN |
| `04:30` | Data Model & APIs | Inspection of schemas (`complaints`, `users`, `wards`) & core endpoints (`/api/complaints`) |
| `05:30` | Core Logic Walkthrough | Line-by-line IDE walkthrough of spatial routing (`routing_engine.py`) & boundary versions |
| `07:30` | Decisions & Trade-offs | Spatial polygon matching vs point distance; rationale from Decision Log |
| `08:30` | Scale & City Limits | What breaks at 65 MCC wards during Dasara festival; PostGIS spatial indexing fix |
| `09:15` | AI Usage Disclosure | Walkthrough of `ai.md`: AI Vision Classifier & code assistance verification |

---

## 5. Live MVP

| Field | Value |
|---|---|
| Live Web Dashboard | [`https://hm-26-02-ae-power-rangers.vercel.app/`](https://hm-26-02-ae-power-rangers.vercel.app/) |
| Mobile Application | Flutter Mobile Android App (`src/mobile`) |
| Credentials (Officer) | `officer.rajesh@mysuru.gov.in` / `officer123` (Senior AEE, Ward 42) |
| Credentials (Admin) | `admin.governance@mysuru.gov.in` / `admin123` (Chief Governance Director) |
| Credentials (Citizen) | `citizen@civicroute.org` / `password123` |
| Sample Data Loaded? | Yes — 14 MCC Ward Complaints synced with Firebase Firestore REST API |
| Testing Offline Mode | Turn off mobile data / Wi-Fi, take photo in Flutter app, tap File Report. On reconnect, complaint syncs to Firebase. |

---

## 6. Quick Reviewer Path (≤ 3 minutes)

1. Open Web Governance Portal at [`https://hm-26-02-ae-power-rangers.vercel.app/`](https://hm-26-02-ae-power-rangers.vercel.app/) → View Landing Page overview.
2. Click **Portal Login** → Select **Officer Login** preset (`officer.rajesh@mysuru.gov.in` / `officer123`) → Click **Sign In to Dashboard**.
3. Inspect Complaint `#HM-1024` (Pothole at Agrahara Circle, Ward 42) → View auto-assigned Officer, Tender `RM-2042`, and 24h SLA Countdown.
4. Launch Flutter Mobile App → Tap **Report a Civic Issue** → Capture evidence photo → Run 5s AI Vision Scan → Confirm OpenStreetMap Live GPS Pin → Tap **File Report**.
5. Observe complaint instant sync to Web Dashboard & Firebase Firestore REST API in real time.

---

## 7. Declaration

- [x] All Drive links open in an incognito window with **Viewer** access (no "Request access").
- [x] The video is one continuous recording, ≤ 10 minutes, Part 1 then Part 2.
- [x] The decision log is one page and written by us in our own words.
- [x] All AI tools used (development and in-product) are disclosed in [`ai.md`](./ai.md).
- [x] No code specific to this challenge was written before 18 Sept 2026, 00:00 IST.
- [x] We will not modify or replace any linked file after 20 Sept 2026, 23:59 IST.

**Submitted by:** Sujal (Team Lead) · **Date/Time (IST):** `20-09-2026 21:30 IST`
