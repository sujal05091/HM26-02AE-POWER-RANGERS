# CIVICROUTE

## Dynamic Civic Complaint Routing & Accountability Platform

**HackMysuru 1.0 — Phase 1 Open Build Challenge**
**Domain:** Civic Governance & Clean Mysuru
**Sub-Problem:** Routing
**Version:** 1.0

---

# 1. Product Overview

CivicRoute is a location-aware civic complaint management platform that automatically determines the responsible authority and department for a citizen-reported civic issue.

The system accepts a complaint containing a description, photograph, and GPS location. It classifies the issue, determines the active jurisdiction using geospatial boundaries, identifies the responsible department and assigned officer from the available authority data, checks relevant service/tender information, calculates the expected resolution timeline, and provides the citizen with a transparent status trail.

The platform is designed around a key challenge in Mysuru: administrative responsibilities and jurisdiction boundaries can change over time. Therefore, CivicRoute uses versioned jurisdiction data rather than permanently hard-coded authority mappings.

---

# 2. Problem Statement

Citizens frequently encounter civic problems such as:

* Potholes and damaged roads
* Garbage overflow
* Blocked drains
* Broken streetlights
* Illegal dumping
* Damaged public infrastructure

A citizen may not know which authority or department is responsible for resolving the issue. When responsibility is unclear, complaints can be incorrectly routed, delayed, transferred between offices, or remain unresolved.

The problem becomes more complex when administrative boundaries and responsibilities change.

CivicRoute addresses this problem by creating an automated routing and accountability layer between citizens and civic authorities.

---

# 3. Product Vision

To create a transparent civic reporting system where a citizen can report an issue once and immediately understand:

1. What type of civic problem was detected.
2. Which jurisdiction the issue belongs to.
3. Which authority is responsible.
4. Which department should handle it.
5. Which officer/team is assigned, when such data is available.
6. Whether a relevant contract/tender or service obligation is active.
7. When the issue is expected to be resolved.
8. What actions have already been taken.
9. Whether the complaint has exceeded its expected resolution time.

---

# 4. Goals

## Primary Goals

* Automatically route civic complaints based on location and issue type.
* Support multiple civic issue categories, not only garbage-related complaints.
* Handle changing administrative jurisdictions using time-versioned geographic data.
* Provide transparent reasoning for routing decisions.
* Track complaint status and activity history.
* Display responsible department/officer information when available in the dataset.
* Associate complaints with relevant contracts/tenders when reliable data is available.
* Provide SLA/deadline tracking.
* Support automatic escalation when a complaint remains inactive beyond its defined SLA.
* Provide offline complaint creation and synchronization in the mobile application.
* Detect duplicate complaints near the same location.
* Provide resolution evidence and allow complaints to be reopened when the issue persists.

## Secondary Goals

* Provide an officer/admin dashboard.
* Provide ward-level complaint statistics.
* Identify recurring civic-problem hotspots.
* Provide explainable routing confidence.
* Maintain an auditable history of every complaint status change.

---

# 5. Non-Goals

The Phase 1 MVP will NOT attempt to:

* Replace official government complaint systems.
* Make legally binding claims about individual officers.
* Automatically determine legal liability.
* Guarantee that a particular officer is personally responsible when the underlying data does not establish that responsibility.
* Build a complete city-wide surveillance system.
* Monitor every road using permanent CCTV cameras.
* Automatically approve or reject citizens without human review.
* Provide every possible municipal service.
* Build a full tender/procurement management system.

Officer and contract information will be displayed only when supported by the available data.

---

# 6. Target Users

## 6.1 Citizen

A resident who wants to report a civic problem.

Needs:

* Simple complaint submission
* Camera/photo capture
* Automatic GPS
* Issue category
* Complaint tracking
* Responsible authority information
* Expected resolution time
* Status updates
* Ability to report that an issue was not actually resolved

---

## 6.2 Civic Officer

An authorized official responsible for handling assigned complaints.

Needs:

* View assigned complaints
* View complaint location and evidence
* View priority and SLA
* Update complaint status
* Add action notes
* Upload resolution evidence
* View escalation status

---

## 6.3 Administrator

A user responsible for maintaining civic routing information.

Needs:

* Manage jurisdiction data
* Manage departments
* Manage officers
* Manage contracts/tenders
* Configure SLA rules
* View system-wide complaint statistics
* Review uncertain routing cases

---

# 7. Core User Journey

```text
Citizen
   ↓
Capture Photo
   ↓
GPS Location
   ↓
Enter Description
   ↓
Issue Classification
   ↓
Duplicate Check
   ↓
Jurisdiction Detection
   ↓
Department Routing
   ↓
Officer / Team Identification
   ↓
Contract / Tender Matching
   ↓
SLA Calculation
   ↓
Complaint Created
   ↓
Officer Action
   ↓
Resolution Evidence
   ↓
Citizen Verification
   ↓
Resolved / Reopened
```

---

# 8. Core Features

## 8.1 Civic Complaint Creation

The citizen can:

* Capture a photograph.
* Select or describe the issue.
* Automatically capture GPS coordinates.
* Add additional text.
* Submit the complaint online.
* Save the complaint offline when connectivity is unavailable.

Supported categories include:

* Pothole
* Damaged road
* Garbage overflow
* Illegal dumping
* Drainage blockage
* Broken streetlight
* Public infrastructure damage
* Other supported civic issues

---

# 9. Issue Classification

The system determines the complaint category using:

1. Citizen-selected category, when available.
2. Text description.
3. Image classification, when implemented.

Example:

```text
Input:
Photo + "Large pothole near school"

Classification:
Road Damage / Pothole

Confidence:
94%
```

AI classification is advisory. Final routing is determined using civic rules and verified jurisdiction data.

---

# 10. Jurisdiction Routing

The routing engine uses:

* GPS coordinates
* Jurisdiction geometry
* Ward boundaries
* Issue category
* Effective date of jurisdiction

Example:

```text
Location
   ↓
PostGIS spatial query
   ↓
Active jurisdiction
   ↓
Ward
   ↓
Authority
   ↓
Department
```

The system must not permanently hard-code a location to one authority.

---

# 11. Time-Versioned Jurisdictions

Each jurisdiction record should support:

```text
jurisdiction_id
authority_id
geometry
valid_from
valid_until
version
status
```

Example:

```text
Area A

01 Jan 2026 – 30 Sep 2026
Authority: Previous Authority

01 Oct 2026 – Present
Authority: MCC
```

When routing a complaint, the system evaluates the jurisdiction version applicable to the complaint date.

---

# 12. Responsible Department

After identifying the jurisdiction, the system maps the issue category to the responsible department.

Example:

```text
Pothole
→ Road Engineering

Garbage Overflow
→ Solid Waste Management

Broken Streetlight
→ Street Lighting / Electrical

Drainage Blockage
→ Drainage / Sanitation
```

The mapping must be configurable rather than embedded throughout the application code.

---

# 13. Officer / Team Identification

If reliable officer/team assignment data exists, the system displays:

* Officer/team name
* Department
* Designation
* Assigned ward/area
* Current assignment status

Example:

```text
Responsible Department:
Road Engineering

Assigned Officer:
Officer Name

Ward:
42

Assignment:
Active
```

If the system cannot establish an assignment, it must clearly display:

```text
Responsible department identified.
Specific officer assignment unavailable.
```

It must not fabricate responsibility.

---

# 14. Contract / Tender Association

Where available, the system can associate an issue with a relevant active contract/tender.

Example:

```text
Contract:
Road Maintenance — RM-2042

Status:
Active

Valid Until:
31 Dec 2026

Relevant Scope:
Road maintenance in Ward 42
```

The system must distinguish between:

* Contract exists
* Contract is active
* Contract scope matches the complaint

A contract's existence alone must not be interpreted as proof that an individual is personally liable.

---

# 15. SLA and Resolution Timeline

Each issue category can have a configurable expected resolution period.

Example:

```text
Issue:
Pothole

Expected SLA:
48 hours

Complaint Age:
31 hours

Remaining:
17 hours
```

The system should display:

* SLA target
* Current elapsed time
* Remaining time
* SLA status

Statuses:

```text
ON TRACK
WARNING
OVERDUE
ESCALATED
```

---

# 16. Escalation Engine

If a complaint exceeds its configured SLA without sufficient activity:

```text
Complaint
   ↓
SLA breached
   ↓
Escalation created
   ↓
Higher authority notified
```

The escalation history must be stored.

Example:

```text
09:00 — Complaint submitted
09:02 — Routed
10:15 — Officer assigned
Next Day 10:15 — SLA warning
Next Day 16:15 — SLA breached
16:16 — Escalation triggered
```

---

# 17. Complaint History

Every complaint maintains an immutable status timeline.

Example:

```text
18 Sep 09:00
Complaint submitted

18 Sep 09:02
Automatically routed

18 Sep 09:10
Officer assigned

18 Sep 14:30
Work acknowledged

19 Sep 08:45
Repair started

19 Sep 11:30
Marked resolved
```

---

# 18. Resolution Verification

An officer can upload:

* After-repair photograph
* Resolution note
* Timestamp
* Location information

The citizen can confirm:

```text
Issue fixed
```

or:

```text
Issue not fixed / reopened
```

A reopened complaint remains linked to the original complaint.

---

# 19. Duplicate Detection

The system should detect potential duplicate complaints using:

* Geographic distance
* Issue category
* Submission time
* Image similarity when available
* Text similarity when available

Example:

```text
Potential duplicate detected.

Existing Complaint:
#HM-1024

Distance:
24 metres

Issue:
Pothole

Action:
Merge / Link / Create Separate
```

The system should not automatically merge every nearby complaint because two separate issues can exist in the same area.

---

# 20. Routing Explanation

Every routing decision should be explainable.

Example:

```text
WHY WAS THIS COMPLAINT ROUTED HERE?

Location:
Ward 42

Jurisdiction:
MCC — Current Version V3

Issue:
Pothole

Department:
Road Engineering

Active Contract:
RM-2042

Routing Confidence:
96%
```

This feature is important for transparency and judge evaluation.

---

# 21. Offline Mode

The mobile application must support complaint creation without internet connectivity.

```text
Internet OFF
     ↓
Complaint created
     ↓
Stored locally
     ↓
"Waiting for synchronization"
     ↓
Internet restored
     ↓
Automatic synchronization
     ↓
Server routing
```

The system should prevent duplicate submission during synchronization.

---

# 22. Hotspot Detection

The system aggregates complaints by geographic area.

Example:

```text
Ward 42

Potholes: 31
Garbage: 18
Drainage: 11

Recurring hotspot:
XYZ Road

Pothole reports:
8 within 30 days
```

This allows administrators to identify recurring civic problems.

---

# 23. Citizen Dashboard

The citizen dashboard should display:

* My complaints
* Current status
* Responsible department
* Assigned officer/team when available
* SLA countdown
* Complaint timeline
* Resolution evidence
* Reopen option
* Notification history

---

# 24. Officer Dashboard

The officer dashboard should display:

* Assigned complaints
* Priority
* SLA status
* Location
* Evidence
* Complaint history
* Escalations
* Update status
* Upload resolution evidence

---

# 25. Administrator Dashboard

The administrator dashboard should display:

* Total complaints
* Open complaints
* Resolved complaints
* Overdue complaints
* Escalated complaints
* Ward distribution
* Department workload
* Recurring hotspots
* Routing failures
* Uncertain/low-confidence complaints

---

# 26. Technology Requirements

## Mobile Application

* Flutter
* Dart
* Camera
* GPS/location services
* Local storage / SQLite or Hive
* Offline synchronization

## Web Dashboard

* React
* Vite
* Tailwind CSS
* MapLibre or Leaflet

## Backend

* Python
* FastAPI
* Pydantic
* SQLAlchemy

## Database

* PostgreSQL
* PostGIS

## AI / ML

Potential components:

* Image classification
* Text classification
* Duplicate detection
* Similarity matching

AI must support the product rather than replace deterministic civic routing rules.

## Authentication

* Supabase Auth or JWT-based authentication

## Storage

* Supabase Storage or equivalent object storage

## Deployment

* Mobile APK for demonstration
* Vercel for web dashboard
* FastAPI hosted on a suitable cloud platform
* PostgreSQL/PostGIS hosted through Supabase or equivalent

---

# 27. Data Requirements

The system requires the following data entities:

```text
Users
Authorities
Departments
Wards
Jurisdictions
Officers
Contracts
Complaints
Complaint Assignments
Status History
Evidence
Escalations
SLA Rules
Notifications
```

Priority should be given to organizer-provided synthetic datasets.

Where official data is unavailable, synthetic records may be used for demonstration and must be clearly identified as synthetic.

---

# 28. Functional Requirements

### FR-01

The system shall allow citizens to create civic complaints.

### FR-02

The system shall capture complaint location.

### FR-03

The system shall support image evidence.

### FR-04

The system shall classify supported civic issue types.

### FR-05

The system shall determine the active jurisdiction for a complaint location.

### FR-06

The system shall route complaints to the appropriate department.

### FR-07

The system shall support time-versioned jurisdiction records.

### FR-08

The system shall display responsible officer/team information when available.

### FR-09

The system shall associate relevant active contracts/tenders when supported by the data.

### FR-10

The system shall calculate SLA status.

### FR-11

The system shall maintain complaint history.

### FR-12

The system shall support escalation.

### FR-13

The system shall support duplicate detection.

### FR-14

The system shall support resolution evidence.

### FR-15

The system shall allow citizens to reopen unresolved complaints.

### FR-16

The system shall support offline complaint creation and synchronization.

### FR-17

The system shall provide an explanation for routing decisions.

---

# 29. Non-Functional Requirements

## Performance

Typical routing operations should complete within a few seconds under normal MVP load.

## Reliability

Complaint data must not be lost during temporary network failures.

## Security

* Authentication required for protected dashboards.
* Role-based access control.
* Secure API endpoints.
* No sensitive credentials committed to GitHub.
* Uploaded evidence must have controlled access.

## Auditability

All important status and assignment changes must be timestamped.

## Scalability

The architecture must support expansion from synthetic MVP data to city-scale complaint volumes.

## Explainability

Routing decisions must be understandable to citizens and judges.

---

# 30. Core Business Rules

1. A complaint must contain a valid location before automatic routing.
2. Jurisdiction is determined using the active jurisdiction version.
3. Issue category determines the department mapping.
4. AI classification must not independently determine legal responsibility.
5. Officer information is displayed only when supported by assignment data.
6. Contract information is displayed only when the contract matches the relevant scope and validity period.
7. Duplicate detection produces a potential-match result rather than blindly deleting complaints.
8. SLA timers begin according to the configured complaint workflow.
9. SLA breaches trigger escalation according to configured rules.
10. Resolved complaints can be reopened when the citizen reports that the issue remains unresolved.
11. Every status transition must be recorded.
12. Synthetic data must be clearly identified during evaluation.

---

# 31. MVP Scope for HackMysuru Phase 1

The Phase 1 MVP will prioritize the following:

### Must Have

* Citizen complaint submission
* Photo capture/upload
* GPS capture
* Civic issue classification
* Jurisdiction routing
* Department identification
* Officer/team mapping using available data
* Contract/tender matching using available data
* SLA countdown
* Complaint status timeline
* Officer dashboard
* Duplicate detection
* Offline complaint queue
* Routing explanation
* Resolution evidence

### Should Have

* Automatic escalation
* Reopen workflow
* Ward analytics
* Hotspot detection
* Notifications

### Future

* Advanced ML prediction
* Large-scale real-time analytics
* Integration with official government systems
* Multilingual voice reporting
* Advanced computer vision
* Live government data synchronization

---

# 32. Success Criteria

The MVP will be considered successful if a judge can perform the following flow:

```text
1. Open the citizen application.
2. Capture/upload a pothole photograph.
3. Allow GPS location.
4. Submit the complaint.
5. System identifies the issue.
6. System determines the current jurisdiction.
7. System identifies the responsible department.
8. System displays officer/team information when available.
9. System displays relevant contract information when available.
10. System calculates the SLA.
11. Complaint appears in the officer dashboard.
12. Officer updates the complaint.
13. Officer uploads resolution evidence.
14. Citizen sees the updated timeline.
15. Citizen can reopen the complaint if unresolved.
```

A second demonstration should show:

```text
Jurisdiction Version A
        ↓
Authority A

Jurisdiction boundary updated
        ↓
Jurisdiction Version B
        ↓
Authority B
```

This demonstrates the central engineering challenge of the Routing sub-problem.

---

# 33. Key Product Differentiator

CivicRoute is not simply a complaint-registration application.

Its core value is:

```text
REPORT
  ↓
UNDERSTAND
  ↓
LOCATE
  ↓
ROUTE
  ↓
IDENTIFY RESPONSIBILITY
  ↓
TRACK
  ↓
ESCALATE
  ↓
VERIFY
```

The system attempts to answer the citizen's most important question:

> **"I reported this problem. Who is responsible for it, why are they responsible, what should happen next, and has anything actually been done?"**

---

# 34. Phase 1 Engineering Principle

The MVP will prioritize **depth over breadth**.

Rather than attempting to solve every civic-governance problem, CivicRoute focuses on one core problem:

> **Automatically and transparently routing a civic complaint to the correct current authority and department despite changing jurisdiction boundaries.**

All additional features—officer mapping, contract context, SLA tracking, escalation, history, duplicate detection, and resolution verification—support this central workflow.
