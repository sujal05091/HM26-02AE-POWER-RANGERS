# Cloudinary Image Storage Setup Guide — CivicRoute

CivicRoute automatically stores evidence photographs captured by Citizens and resolution proof uploaded by Officers directly into **Cloudinary Cloud Storage**.

---

## 1. Cloudinary Account & Preset Setup

1. Create a free account at [Cloudinary Console](https://cloudinary.com/console).
2. Note your **Cloud Name**: `civicroute-mysuru`.
3. Go to **Settings** -> **Upload** -> **Upload Presets**.
4. Add an **Unsigned Upload Preset** named: `civicroute_preset`.
5. Set Folder to: `civicroute_evidence`.

---

## 2. Setting Environment Variables

In your environment or `.env` file:

```env
CLOUDINARY_CLOUD_NAME=civicroute-mysuru
CLOUDINARY_API_KEY=871249512398412
CLOUDINARY_UPLOAD_PRESET=civicroute_preset
```

---

## 3. How Image Upload Flow Works

```text
Citizen / Officer Camera
       ↓
Base64 / Multipart Binary Payload
       ↓
FastAPI `/api/upload` Endpoint
       ↓
Cloudinary Storage API
       ↓
https://res.cloudinary.com/civicroute-mysuru/image/upload/...
       ↓
Saved in Persistent Database (`civicroute.db`)
```
