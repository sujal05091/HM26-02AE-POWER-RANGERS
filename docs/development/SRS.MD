# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

# CivicRoute
## Dynamic Civic Complaint Routing & Accountability Platform

**Hackathon:** HackMysuru 1.0  
**Phase:** Phase 1 — Open Build Challenge  
**Domain:** Civic Governance & Clean Mysuru  
**Selected Sub-Problem:** Routing  
**Team:** HM26-02AE-POWER-RANGERS  
**Version:** 1.0  
**Date:** September 2026

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) defines the functional and non-functional requirements of CivicRoute, a civic complaint routing and accountability platform designed for Mysuru.

The system allows citizens to report civic problems such as potholes, garbage overflow, drainage issues, broken streetlights, illegal dumping, and damaged public infrastructure.

CivicRoute automatically analyzes the complaint location and issue type to determine the applicable jurisdiction and responsible department. Where reliable assignment data is available, the system also identifies the responsible officer or team and relevant active contract/tender information.

The system additionally provides SLA tracking, complaint history, escalation, duplicate detection, resolution verification, and offline complaint submission.

---

# 2. Scope

CivicRoute consists of three primary components:

1. Citizen Mobile Application
2. Officer/Admin Web Dashboard
3. Backend Routing and Accountability System

The system focuses specifically on civic complaint routing while providing supporting accountability features.

The core routing pipeline is:

```text
Citizen Complaint
       ↓
Photo + GPS + Description
       ↓
Issue Classification
       ↓
Duplicate Detection
       ↓
Jurisdiction Detection
       ↓
Department Identification
       ↓
Officer/Team Identification
       ↓
Contract/Tender Matching
       ↓
SLA Calculation
       ↓
Complaint Tracking
       ↓
Resolution / Escalation