# Setup & Run Instructions

[← Back to README](../README.md)

This document provides complete instructions to set up, run, and verify the CivicRoute platform (FastAPI Backend Engine, Neumorphic Web Governance Portal, and Flutter Mobile App) locally.

---

## Prerequisites

| Tool | Required Version | Verification Command |
|---|---|---|
| **Python** | 3.11+ | `python --version` |
| **Node.js** | 18.x or 20.x | `node -v` |
| **Flutter SDK** | 3.22+ | `flutter --version` |
| **Git** | 2.x | `git --version` |

---

## 1. Repository Clone

```bash
git clone https://github.com/sujal/MYSORE-HACKTHON.git
cd MYSORE-HACKTHON
```

---

## 2. Environment Variables Setup

```bash
# Copy example environment configuration in src/backend/
cd src/backend
cp .env.example .env
```

### Environment Configuration (`src/backend/.env`)

```env
# Server & API Config
PORT=8000
HOST=0.0.0.0

# Cloudinary Storage Credentials
CLOUDINARY_CLOUD_NAME=dycudtwkj
CLOUDINARY_API_KEY=871249512398412
CLOUDINARY_UPLOAD_PRESET=civicroute-mysuru

# Firebase Firestore REST API Config
FIRESTORE_PROJECT_ID=civicroute-mysuru
```

---

## 3. Launch Backend Engine & Seed Demo Data

```bash
cd src/backend

# Install Python dependencies
pip install fastapi uvicorn requests pydantic shapely

# Seed Firebase Firestore & SQLite with 14 MCC Ward Complaints
python seed_firebase.py

# Run FastAPI Server
python -m uvicorn main:app --reload --port 8000
```
Backend API will be available at `http://localhost:8000` with Swagger docs at `http://localhost:8000/docs`.

---

## 4. Launch Neumorphic Web Governance Portal

```bash
# In a new terminal window:
cd src/dashboard

# Install Node modules
npm install

# Start Vite Development Server
npm run dev
```
Web Governance Portal will be available at `http://localhost:5173`.

---

## 5. Launch Flutter Mobile Application

```bash
# In a new terminal window:
cd src/mobile

# Get Flutter dependencies
flutter pub get

# Run on connected Android device or emulator
flutter run -d V2334
```

---

## Testing Credentials

| Portal / App | Role | Email / ID | Password |
|---|---|---|---|
| **Web Governance Portal** | 👮 Officer | `officer.rajesh@mysuru.gov.in` | `officer123` |
| **Web Governance Portal** | 👑 Admin | `admin.governance@mysuru.gov.in` | `admin123` |
| **Mobile Application** | 📱 Citizen | `citizen@civicroute.org` | `password123` |

---

## Testing Offline Mode

1. Open Flutter Mobile App on device or emulator.
2. Turn off Wi-Fi and Cellular Mobile Data (or set Chrome DevTools Network to Offline).
3. Tap **Report a Civic Issue** → Capture evidence photo → Confirm OpenStreetMap location.
4. Tap **File Report & Route to Department**. Notice report is saved to `SharedPreferences` local queue.
5. Reconnect Wi-Fi / Mobile Data → Open app → Observe report automatically syncs to Firebase Firestore and renders on the Web Governance Dashboard in real time.
