# Firebase & Authentication Setup Guide — CivicRoute

Firebase configuration for **civicroute-mysuru** is now integrated across all project components!

---

## 🔑 Your Active Firebase Credentials

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBJV_8Ri4gaeVanwXC9ThD0ZGnPNp_dc9Q",
  authDomain: "civicroute-mysuru.firebaseapp.com",
  projectId: "civicroute-mysuru",
  storageBucket: "civicroute-mysuru.firebasestorage.app",
  messagingSenderId: "570859066509",
  appId: "1:570859066509:web:cdf7f10a5f3c75e7377ec4"
};
```

---

## 🛠️ Integrated Files

1. **Flutter Mobile Options**: [firebase_options.dart](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/mobile/lib/firebase_options.dart)
2. **Backend Environment**: [src/backend/.env](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/backend/.env)
3. **Database & Auth Engine**: [database.py](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/backend/database.py)

---

## 🔑 Test User Credentials (Pre-Seeded)

| Role | Email | Password | Assigned Ward |
| :--- | :--- | :--- | :--- |
| **Citizen** | `citizen@civicroute.org` | `password123` | Ward 42 |
| **Officer** | `officer.rajesh@mcc.gov.in` | `officer123` | Ward 42 (Road Dept) |
| **Admin** | `admin@mysurucity.gov.in` | `admin123` | City-wide |
