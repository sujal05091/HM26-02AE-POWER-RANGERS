# CivicRoute — System Architecture

**HackMysuru 1.0 — Phase 1**  
**Team:** HM26-02AE-POWER-RANGERS  
**Domain:** Civic Governance & Clean Mysuru  
**Selected Sub-Problem:** Routing

---

# 1. Architecture Overview

CivicRoute follows a modular client-server architecture.

The system consists of:

1. Citizen Mobile Application
2. Officer/Admin Web Dashboard
3. FastAPI Backend
4. Civic Routing Engine
5. AI Classification Layer
6. PostgreSQL + PostGIS Database
7. Object Storage for complaint evidence
8. Notification and synchronization services

The central architectural principle is:

> **AI understands the complaint; geospatial and deterministic business rules determine responsibility.**

The system does not allow an AI model to independently decide which authority is legally responsible.

---

# 2. High-Level Architecture

```mermaid
flowchart TD

    C[Citizen Mobile App<br/>Flutter]
    O[Officer/Admin Dashboard<br/>React]
    
    API[FastAPI REST API]

    AUTH[Authentication & RBAC]

    AI[AI Classification Layer]
    ROUTE[Civic Routing Engine]
    DUP[Duplicate Detection]
    SLA[SLA & Escalation Engine]
    SYNC[Offline Sync Manager]

    DB[(PostgreSQL + PostGIS)]
    STORAGE[(Object Storage)]
    NOTIFY[Notification Service]

    C --> API
    O --> API

    API --> AUTH
    API --> AI
    API --> ROUTE
    API --> DUP
    API --> SLA
    API --> SYNC

    ROUTE --> DB
    AI --> DB
    DUP --> DB
    SLA --> DB
    SYNC --> DB

    API --> STORAGE
    SLA --> NOTIFY
    API --> NOTIFY