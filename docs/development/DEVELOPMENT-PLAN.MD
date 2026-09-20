# CivicRoute — Development Plan

**Hackathon:** HackMysuru 1.0  
**Phase:** Phase 1 — Open Build Challenge  
**Team:** HM26-02AE-POWER-RANGERS  
**Project:** CivicRoute  
**Selected Sub-Problem:** Routing  
**Development Window:** 18–20 September 2026  
**Version:** 1.0

---

# 1. Development Objective

The objective is to build a working MVP of CivicRoute that demonstrates how a civic complaint can be automatically routed from a citizen to the appropriate authority and department using location, issue type, and time-aware jurisdiction data.

The MVP will additionally demonstrate:

- Officer/team identification where data is available
- Contract/tender context
- SLA tracking
- Complaint history
- Duplicate detection
- Resolution evidence
- Escalation
- Offline complaint creation
- Transparent routing explanation

The development strategy prioritizes a **working end-to-end flow over feature quantity**.

---

# 2. Development Philosophy

The project will follow these principles:

1. Build the core flow first.
2. Keep the architecture modular.
3. Use deterministic rules for responsibility.
4. Use AI only where it adds measurable value.
5. Use real or organizer-provided data where available.
6. Clearly identify synthetic data.
7. Test bad inputs deliberately.
8. Commit code incrementally throughout development.
9. Avoid implementing features that do not contribute to the core routing problem.
10. Maintain documentation alongside development.

---

# 3. MVP Definition

The minimum successful product is:

```text
Citizen
   ↓
Create Complaint
   ↓
Photo + GPS + Description
   ↓
Issue Classification
   ↓
Duplicate Check
   ↓
Jurisdiction Detection
   ↓
Department Routing
   ↓
Officer/Team Identification
   ↓
SLA Calculation
   ↓
Officer Dashboard
   ↓
Status Update
   ↓
Resolution Evidence
   ↓
Citizen Verification
4. Priority Levels
P0 — Critical

Must work for the final demo.

Citizen complaint creation
GPS capture
Photo upload
Issue category
Jurisdiction routing
Department routing
Officer/team mapping
Complaint database
Officer dashboard
Complaint status
SLA
Routing explanation
End-to-end API flow
P1 — Important

Should work if time permits.

Duplicate detection
Contract/tender matching
Resolution evidence
Complaint timeline
Reopen complaint
Offline queue
Escalation
P2 — Enhancement

Only implement after the P0/P1 flow is stable.

Advanced analytics
Hotspot visualization
Advanced AI classification
Push notifications
Advanced map filters
Predictive analytics
5. Technology Stack
Citizen Application
Flutter
Dart
Officer/Admin Dashboard
React
Vite
Tailwind CSS
Backend
Python
FastAPI
Pydantic
SQLAlchemy
Database
PostgreSQL
PostGIS
Authentication
Supabase Auth / JWT
Storage
Supabase Storage
AI/ML
Python
OpenCV
Suitable lightweight classification model
Maps
Leaflet / MapLibre
Version Control
Git
GitHub
6. Repository Structure
HM26-02AE-POWER-RANGERS/
│
├── docs/
│   ├── PRD.md
│   ├── SRS.md
│   ├── architecture.md
│   ├── UI_UX.md
│   ├── DEVELOPMENT_PLAN.md
│   ├── constraints.md
│   ├── limitations.md
│   ├── setup.md
│   └── images/
│
├── resource-templates/
│
├── src/
│   ├── mobile/
│   ├── backend/
│   └── dashboard/
│
├── ai.md
├── README.md
├── resource.md
└── .gitignore
7. Development Phases
Phase 0 — Repository Setup
Tasks
Clone official HackMysuru template.
Verify public GitHub repository.
Configure .gitignore.
Create development branches if required.
Configure environment variables.
Create project folders.
Deliverable

Working repository with correct structure.

Commit
chore: initialize CivicRoute project structure
8. Phase 1 — Data and Database
Tasks

Create database schema for:

users
authorities
departments
wards
jurisdictions
officers
contracts
complaints
complaint_assignments
status_history
evidence
escalations
sla_rules
notifications

Configure:

PostgreSQL
PostGIS
Spatial indexes
Foreign keys
Required indexes
Important

Use organizer-provided datasets where available.

If required data is unavailable, create clearly identified synthetic data.

Deliverable

Database successfully created and populated with development data.

Commit
feat: add civic routing database schema
9. Phase 2 — Backend Foundation
Tasks

Create FastAPI project.

Implement:

/api/auth
/api/complaints
/api/routing
/api/jurisdictions
/api/departments
/api/officers
/api/contracts
/api/dashboard

Implement:

Configuration
Database connection
Models
Schemas
Authentication
Error handling
API validation
Deliverable

Backend starts successfully and database connection works.

Commit
feat: initialize FastAPI backend
10. Phase 3 — Core Routing Engine

This is the highest-priority engineering component.

Step 1

Receive:

latitude
longitude
issue_category
complaint_date
Step 2

Validate location.

Step 3

Perform PostGIS point-in-polygon query.

Step 4

Determine active jurisdiction version.

Step 5

Determine ward.

Step 6

Determine authority.

Step 7

Map issue category to department.

Step 8

Find officer/team assignment.

Step 9

Find relevant active contract.

Step 10

Generate routing explanation.

Output
{
  "authority": "Mysuru City Corporation",
  "ward": "42",
  "department": "Road Engineering",
  "officer": "Officer Name",
  "contract": "RM-2042",
  "routing_confidence": 0.96
}
Commit
feat: implement time-aware civic routing engine
11. Phase 4 — Complaint API

Implement:

POST /api/complaints
GET /api/complaints/{id}
GET /api/complaints/my
GET /api/complaints/{id}/route
GET /api/complaints/{id}/history
PATCH /api/complaints/{id}/status

Complaint creation should trigger:

Create Complaint
      ↓
Classification
      ↓
Routing
      ↓
SLA
      ↓
Assignment
Commit
feat: implement complaint management APIs
12. Phase 5 — Citizen Mobile App

Build the minimum citizen flow first.

Screens
Screen 1

Home

Report a Civic Issue
Active Reports
Screen 2

Create Report

Camera
Category
Description
GPS
Submit
Screen 3

Routing Result

Authority
Ward
Department
Officer
SLA
Screen 4

Complaint Details

Status
Responsibility
Timeline
Contract
SLA
Screen 5

Resolution

Before
After
Issue Fixed
Issue Still Exists
Commit
feat: build citizen complaint mobile flow
13. Phase 6 — Officer Dashboard

Build desktop dashboard.

Dashboard

Show:

Assigned
In Progress
Overdue
Escalated
Complaint List

Show:

Issue
Ward
Priority
SLA
Status
Complaint Details

Show:

Photo
Location
Description
Department
Officer
Contract
SLA
Timeline

Actions:

Acknowledge
Start Work
Mark Resolved
Escalate
Upload Evidence
Commit
feat: build officer dashboard
14. Phase 7 — SLA Engine

Implement configurable SLA rules.

Example:

Pothole → 48 hours
Garbage → 24 hours
Streetlight → 48 hours
Drainage → 24 hours

The system calculates:

created_at
+
SLA duration
=
expected_resolution

Then:

Current Time < Warning Threshold
→ ON TRACK

Warning Threshold Reached
→ WARNING

Expected Resolution Passed
→ OVERDUE

Escalation Rule Triggered
→ ESCALATED
Commit
feat: implement SLA and escalation engine
15. Phase 8 — Duplicate Detection

Implement MVP duplicate detection.

Initial signals:

Distance
+
Issue Category
+
Time Window

Optional:

Text similarity
+
Image similarity

Example:

Distance < 50m
AND
Same category
AND
Reported within 24h

→ Potential duplicate.

Do not automatically delete or reject the new complaint.

Commit
feat: add duplicate complaint detection
16. Phase 9 — Contract/Tender Matching

Implement matching using:

Issue Type
+
Geographic Scope
+
Contract Validity
+
Contract Status

Display:

Contract Number
Scope
Status
Start Date
End Date
Coverage

If no matching contract exists:

No active matching contract found.
Commit
feat: add contract context to complaint routing
17. Phase 10 — Offline Mode

Implement local complaint queue.

Create Complaint
      ↓
Network Available?
      |
   ┌──┴──┐
  YES    NO
   |      |
  API   Local Queue
          |
          ↓
     Internet Restored
          |
          ↓
       Sync API

The mobile application must show:

2 reports waiting to sync

After synchronization:

✓ Report submitted
Commit
feat: add offline complaint synchronization
18. Phase 11 — Resolution Verification

Officer uploads:

After Image
Resolution Note
Timestamp

Citizen sees:

Issue resolved?

Options:

Issue fixed
Issue still exists

If not fixed:

Complaint reopened
Commit
feat: add resolution verification and reopen flow
19. Phase 12 — UI Polish

After all critical functionality works, polish the UI.

Check:

Typography
Spacing
Button consistency
Status colors
Loading states
Empty states
Error states
Mobile responsiveness
Map readability
Timeline clarity
Accessibility

Do not add decorative UI before the core flow works.

Commit
style: polish CivicRoute interface
20. Phase 13 — Testing
Functional Testing

Test:

Create complaint
Upload image
Capture GPS
Route complaint
Assign officer
Calculate SLA
Update status
Upload evidence
Reopen complaint
21. Required Bad-Input Tests

The final video must demonstrate actual system behavior.

Test 1 — Duplicate Complaint

Submit the same pothole twice.

Expected:

Potential duplicate detected.
Test 2 — Invalid Location

Submit a location outside the supported jurisdiction.

Expected:

Unable to determine jurisdiction.
Manual review required.
Test 3 — Unknown Category

Submit an unclear description/image.

Expected:

Low classification confidence.
Please select a category manually.
Test 4 — Missing Officer

Use a complaint with no officer assignment.

Expected:

Department identified.
Officer assignment unavailable.
Test 5 — Expired Contract

Use a contract whose end date has passed.

Expected:

No active matching contract found.
Test 6 — Offline Submission

Turn off internet.

Create complaint.

Expected:

Saved offline.
Waiting for synchronization.

Reconnect.

Expected:

Automatically synchronized.
22. Jurisdiction Change Test

This is a mandatory demonstration because it directly addresses the problem statement.

Before Change
Area A
Version V1
Authority A
After Change
Area A
Version V2
MCC

Submit the same location under different jurisdiction versions.

Expected routing changes accordingly.

This demonstrates that the system does not depend on hard-coded permanent authority mappings.

23. API Testing

Test all core endpoints using:

Postman
Swagger/OpenAPI
Automated API tests where possible

Core tests:

POST /complaints
GET /complaints/{id}
POST /routing/resolve
PATCH /complaints/{id}/status
POST /complaints/{id}/evidence
POST /complaints/{id}/reopen
24. Database Testing

Verify:

Foreign key constraints
Spatial queries
Jurisdiction validity dates
Contract date filtering
Complaint history
SLA calculations
Duplicate detection
Index performance
25. Security Testing

Verify:

Authentication
Role-based access
Unauthorized API access
Input validation
File upload validation
Environment variable protection
No secrets in GitHub

Run:

git status

and verify sensitive files are ignored.

26. Deployment Plan
Mobile

Generate:

CivicRoute.apk

for demonstration/testing.

Frontend

Deploy dashboard to:

Vercel
Backend

Deploy FastAPI to a suitable cloud platform.

Database

Deploy PostgreSQL/PostGIS through the selected database provider.

Storage

Use object storage for images and evidence.

27. Git Strategy

The organizers require evidence of iterative development.

Therefore, commits should represent real development milestones.

Recommended commit sequence:

chore: initialize CivicRoute project structure

feat: add database schema

feat: initialize FastAPI backend

feat: implement routing engine

feat: implement complaint APIs

feat: build citizen complaint flow

feat: build officer dashboard

feat: implement SLA engine

feat: add duplicate detection

feat: add contract matching

feat: add offline synchronization

feat: add resolution verification

test: add routing and complaint tests

fix: resolve routing edge cases

style: polish CivicRoute interface

docs: update architecture and setup

docs: finalize submission documentation

Do not create fake commits or artificially manipulate timestamps.

28. Development Order

The development order is intentionally:

1. Repository
      ↓
2. Database
      ↓
3. Backend
      ↓
4. Routing Engine
      ↓
5. Complaint API
      ↓
6. Citizen App
      ↓
7. Officer Dashboard
      ↓
8. SLA
      ↓
9. Duplicate Detection
      ↓
10. Contract Matching
      ↓
11. Offline Mode
      ↓
12. Resolution Verification
      ↓
13. Testing
      ↓
14. UI Polish
      ↓
15. Documentation
      ↓
16. Final Demo
29. Final Demo Flow

The final demo should follow one realistic complaint.

Example:

Citizen sees pothole
        ↓
Takes photo
        ↓
GPS captured
        ↓
Submits complaint
        ↓
AI identifies pothole
        ↓
Duplicate check
        ↓
PostGIS finds Ward 42
        ↓
MCC identified
        ↓
Road Engineering identified
        ↓
Officer identified
        ↓
Active contract found
        ↓
48-hour SLA calculated
        ↓
Officer receives complaint
        ↓
Officer starts work
        ↓
Officer uploads after-photo
        ↓
Citizen verifies
        ↓
Complaint resolved
30. Demo Failure Scenarios

The final demonstration should also show:

Duplicate complaint
Invalid location
Unknown classification
Missing officer
Expired contract
Offline submission
SLA breach
Jurisdiction change

The objective is to prove that the system handles failure rather than only demonstrating the happy path.

31. Performance Optimization

For the MVP:

Use database indexes.
Use PostGIS spatial indexes.
Paginate complaint lists.
Compress uploaded images.
Avoid unnecessary API calls.
Cache dashboard statistics where appropriate.
Avoid loading all map markers simultaneously.

For future production deployment:

Caching
↓
Read Replicas
↓
Background Workers
↓
Database Partitioning
↓
Horizontal Scaling
32. Development Risks
Risk	Mitigation
Routing data unavailable	Use organizer-provided or clearly synthetic data
Boundary data incomplete	Document limitations
Officer data unavailable	Use synthetic assignment records
Contract data unavailable	Use synthetic contract records
AI model unreliable	Allow manual category selection
Offline sync duplicates	Use client-generated IDs
GIS query slow	PostGIS indexes
Feature overload	Protect P0 scope
Deployment failure	Maintain local demo environment
UI takes too long	Implement core screens first
33. Definition of Done

A feature is considered complete only when:

It works in the application.
Backend integration is complete.
Database persistence works.
Error states are handled.
Basic testing is completed.
The feature can be demonstrated.
Code is committed to GitHub.
Documentation is updated when required.
34. Final MVP Checklist
Citizen
 Login
 Home
 Create complaint
 Camera
 GPS
 Description
 Category
 Submit
 Routing result
 Complaint tracking
 Timeline
 SLA
 Resolution verification
 Reopen complaint
 Offline queue
Backend
 Authentication
 Complaint API
 Routing engine
 PostGIS
 Jurisdiction versioning
 Department mapping
 Officer mapping
 Contract matching
 SLA engine
 Duplicate detection
 Escalation
 Evidence storage
Dashboard
 Login
 Statistics
 Complaint list
 Complaint details
 Map
 SLA status
 Officer assignment
 Status update
 Evidence upload
 Escalation
Testing
 Duplicate
 Invalid location
 Low AI confidence
 Missing officer
 Expired contract
 Offline
 SLA breach
 Jurisdiction change
35. Final Deliverables

The final project shall contain:

Working Mobile Application
Working Officer/Admin Dashboard
Working Backend API
PostgreSQL + PostGIS Database
AI Classification Component
Offline Synchronization
Routing Engine
Test Data
Automated/Manual Test Evidence
Technical Documentation

Submission documentation:

README.md
resource.md
ai.md
docs/PRD.md
docs/SRS.md
docs/architecture.md
docs/UI_UX.md
docs/DEVELOPMENT_PLAN.md
docs/constraints.md
docs/limitations.md
docs/setup.md

External deliverables:

Live MVP
10-minute Google Drive Video
1-page Decision Log PDF
10-slide Presentation PDF
36. Final Development Principle

The project will be judged primarily on whether the team understands and can defend the system.

Therefore:

A smaller system that works end-to-end and can be explained line-by-line is more valuable than a larger system with incomplete functionality.

The development priority is:

WORKING
   ↓
CORRECT
   ↓
EXPLAINABLE
   ↓
TESTED
   ↓
POLISHED

Save it as:

```text
D:\project by sujal\MYSORE-HACKTHON\HM26-02AE-POWER-RANGERS\docs\DEVELOPMENT_PLAN.md

Then:

git add docs/DEVELOPMENT_PLAN.md
git commit -m "docs: add development plan"
git push