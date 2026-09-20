# CivicRoute — UI/UX Specification

**HackMysuru 1.0 — Phase 1**  
**Team:** HM26-02AE-POWER-RANGERS  
**Product:** CivicRoute  
**Selected Sub-Problem:** Civic Complaint Routing  
**Design Direction:** Minimal, Modern, Trustworthy, Mobile-First

---

# 1. Design Vision

CivicRoute uses a minimal civic-tech interface designed to make one thing immediately clear:

> **Who is responsible for my complaint, what is happening now, and what happens next?**

The interface should avoid the visual complexity commonly associated with government portals.

The design should be:

- Minimal
- Clean
- Professional
- Accessible
- Mobile-first
- Fast to understand
- Data-driven
- Trustworthy
- Consistent

The application should prioritize clarity over decoration.

---

# 2. Design Principles

## 2.1 Minimalism

Use:

- Large whitespace
- Simple cards
- Clear typography
- Limited colors
- Simple icons
- Short labels
- Progressive disclosure

Avoid:

- Excessive gradients
- Heavy shadows
- Decorative animations
- Crowded dashboards
- Excessive borders
- Unnecessary illustrations

---

## 2.2 Information Hierarchy

The most important information should appear first.

For a complaint:

```text
Problem
↓
Current Status
↓
Responsible Department
↓
Responsible Officer/Team
↓
SLA
↓
Why it was routed
↓
History
↓
Contract/Tender
↓
Evidence
3. Design System
3.1 Color Strategy

Use a neutral base with one primary accent.

Suggested palette:

Background:
#F8FAFC

Surface:
#FFFFFF

Primary:
#2563EB

Text:
#111827

Secondary Text:
#6B7280

Border:
#E5E7EB

Success:
#16A34A

Warning:
#D97706

Danger:
#DC2626

Colors should communicate status rather than decorate the interface.

4. Typography

Use a modern sans-serif font.

Preferred:

Inter

Typography hierarchy:

Page Title       28–32px / Bold
Section Title    20–24px / Semibold
Card Title       16–18px / Semibold
Body             14–16px / Regular
Caption          12–13px / Regular

Keep line lengths readable.

5. Spacing

Use an 8px spacing system.

4px
8px
16px
24px
32px
40px
48px

Avoid tightly packed content.

6. Border Radius

Use moderate rounded corners.

Small controls: 8px
Cards: 12px
Large containers: 16px
Buttons: 10px

Avoid extremely rounded "bubble" interfaces.

7. Shadows

Use very subtle shadows only when necessary.

Cards should primarily be separated using:

White surfaces
Borders
Spacing

rather than heavy shadows.

8. Iconography

Use a consistent outline icon system.

Preferred:

Lucide Icons

Icons should support the text and should not replace important labels.

9. Citizen Mobile Application

The citizen application is the primary mobile interface.

Navigation:

Home
Reports
Map
Profile

Use a bottom navigation bar.

10. Screen: Splash

Purpose:

Introduce CivicRoute briefly.

Content:

CivicRoute

Report it.
Route it.
Track it.

[Loading]

Keep the screen extremely minimal.

11. Screen: Onboarding

Three simple concepts:

Report
Take a photo and tell us what's wrong.

Route
We identify the responsible authority.

Track
Follow the complaint until resolution.

CTA:

Get Started

Onboarding should be skippable.

12. Screen: Citizen Home

The home screen should immediately provide the main action.

Structure:

Good morning

What needs attention?

[ + Report a Civic Issue ]

Your active reports
────────────────────

Pothole on XYZ Road
In Progress
SLA: 18h remaining

Garbage overflow
Assigned
SLA: 31h remaining

View all reports →

Optional:

Nearby civic issues
13. Screen: Create Complaint

The complaint flow should be short.

Step 1:

Report a civic issue

[ Take Photo ]

[ Choose from Gallery ]

Step 2:

What is the issue?

○ Pothole
○ Garbage
○ Drainage
○ Streetlight
○ Illegal Dumping
○ Other

Step 3:

Describe the issue

[ Text field ]

Step 4:

Location

📍 Current location

12.xxxx, 76.xxxx

[ Adjust Location ]

CTA:

Submit Report
14. Screen: AI Classification

After submission:

Analyzing your report...

✓ Image analyzed
✓ Location verified
✓ Issue identified

Result:

Pothole

94% confidence

The user should be able to correct the category.

CTA:

Looks correct

Secondary:

Change category
15. Screen: Routing Result

This is one of the most important screens.

Display:

Your report has been routed

Pothole

Mysuru City Corporation
Ward 42

Road Engineering

Assigned to
Officer / Team Name

SLA
18h remaining

Then:

Why here?

✓ Location matches Ward 42
✓ Current MCC jurisdiction
✓ Issue matches Road Engineering
✓ Active assignment found

CTA:

Track Report
16. Screen: Complaint Details

This is the main accountability screen.

Header:

Pothole
HM-1024

● In Progress

Then a large responsibility card:

RESPONSIBLE

Mysuru City Corporation
Road Engineering

Officer / Team
Officer Name

Ward 42

SLA card:

EXPECTED RESOLUTION

18h 24m remaining

████████░░

On Track
17. Responsibility Chain

Use a vertical visual chain:

Your Report
     ↓
Ward 42
     ↓
Mysuru City Corporation
     ↓
Road Engineering
     ↓
Officer / Team
     ↓
Active Road Maintenance Contract

Each step can be expanded.

This is one of the core visual differentiators of CivicRoute.

18. Screen: Why Was This Routed Here?

Provide transparent reasoning.

Why was this routed here?

LOCATION
Ward 42

JURISDICTION
MCC — Version V3

ISSUE
Pothole

DEPARTMENT
Road Engineering

ASSIGNMENT
Active

ROUTING CONFIDENCE
96%

Use simple explanations instead of technical terminology.

19. Screen: Complaint Timeline

Display a vertical timeline.

09:00
Report submitted
        │
09:02
Automatically routed
        │
09:15
Officer assigned
        │
10:30
Complaint acknowledged
        │
14:00
Repair started
        │
18:30
Marked resolved

Each event can contain:

Timestamp
Status
Actor
Short description
20. Screen: Contract / Responsibility

If relevant contract information exists:

ACTIVE SERVICE CONTRACT

Road Maintenance

RM-2042

Status
Active

Valid until
31 Dec 2026

Coverage
Ward 42

Scope
Road maintenance

Important:

The UI must present this as contextual information and not automatically claim personal legal liability.

21. Screen: Resolution Evidence

Display:

Resolution Evidence

Before
[ Before Image ]

After
[ After Image ]

Submitted by
Officer Name

18 Sep 2026
11:30 AM

Buttons:

Issue fixed

Issue still exists
22. Screen: Reopen Complaint

If the citizen says the problem remains:

Is the issue actually fixed?

[ Yes, it's fixed ]

[ No, issue still exists ]

If reopened:

Report reopened

The original complaint history has been preserved.
23. Screen: My Reports

List complaints with simple status indicators.

Example:

My Reports

Pothole on XYZ Road
● In Progress
18h remaining

Garbage overflow
● Resolved
2 days ago

Broken streetlight
● Escalated
SLA breached

Filters:

All
Active
Resolved
Escalated
24. Screen: Civic Map

The map should be simple.

Show:

Current location
User's complaints
Nearby civic reports
Hotspots

Avoid displaying hundreds of distracting markers.

Use clustering when necessary.

25. Screen: Offline Mode

When there is no network:

You're offline

Your report is saved safely
and will be submitted automatically
when you're back online.

2 reports waiting to sync.

Show a small offline indicator at the top.

26. Officer Dashboard

The officer dashboard should prioritize action.

Top statistics:

Assigned       24
In Progress    11
Overdue         3
Escalated       2

Complaint table:

Issue        Ward     SLA        Status
Pothole      42       18h        In Progress
Garbage      38       04h        Warning
Drainage     41       -2h        Overdue
27. Officer Complaint View

Show:

Pothole
HM-1024

Location
Ward 42

Citizen Evidence
[Photo]

SLA
18h remaining

Assignment
Officer Name

Contract
RM-2042

Actions:

Acknowledge
Start Work
Mark Resolved
Escalate
Upload Evidence
28. Admin Dashboard

The administrator dashboard should contain:

Total Reports
Open
Resolved
Overdue
Escalated

Charts:

Reports by category
Reports by ward
Department workload
Resolution time
Recurring hotspots

Use charts only where they help interpretation.

29. Admin Map

Display:

Ward boundaries
Jurisdiction boundaries
Complaint hotspots

Provide a date/version selector:

Jurisdiction Version

[ V3 — Current ]
[ V2 ]
[ V1 ]

This demonstrates the dynamic-boundary feature.

30. Empty States

Use informative empty states.

Example:

No active reports

You haven't reported any civic issues yet.

[ Report an Issue ]

Avoid unnecessary illustrations.

31. Error States

Examples:

Location Error
Location unavailable

Enable location services or select
your location manually.
Network Error
You're offline

Your report will sync automatically.
Routing Error
We couldn't determine the responsible
jurisdiction.

Your report has been sent for manual review.
32. Accessibility

The interface should:

Maintain readable contrast.
Use text alongside status colors.
Provide large touch targets.
Avoid color-only status indicators.
Support screen-reader-friendly labels.
Use simple language.
Avoid excessive technical terminology.

Example:

Do not display only:

🔴

Instead:

🔴 Overdue
33. Responsive Design

Citizen application:

Primary:
Mobile

Officer/Admin dashboard:

Primary:
Desktop / Tablet

The dashboard should remain usable on smaller screens.

34. Animation Guidelines

Animations should be subtle.

Allowed:

Page transitions
Loading indicators
Status updates
Progress animations
Map marker transitions

Avoid:

Excessive bouncing
Large decorative animations
Long loading animations
Distracting effects
35. UX Priority

The product hierarchy is:

1. Report an Issue
2. Know Who Is Responsible
3. Know What Is Happening
4. Know When It Should Be Resolved
5. Verify Resolution

Every major screen should reinforce this hierarchy.

36. Primary Design Rule

The interface should always answer:

"What happened to my complaint?"

within a few seconds of opening the complaint details screen.

37. Final UI/UX Direction

CivicRoute should look like a modern civic-tech product rather than a traditional government portal.

Design characteristics:

Minimal
White/neutral surfaces
One strong primary accent
Strong typography
Clear cards
Compact information hierarchy
Simple maps
Clear status indicators
Timeline-based tracking
Responsibility-chain visualization
Minimal decorative elements

The UI must make the routing and accountability system understandable without requiring technical knowledge.