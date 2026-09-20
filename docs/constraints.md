# The Five Hard Constraints

[← Back to README](../README.md)

| # | Constraint | Status | Implementation Details |
|---|---|---|---|
| 1 | Fake, spam and harassment reports | ✅ **Handled** | AI Vision classification confidence thresholding (94%) & duplicate check |
| 2 | Unclear jurisdiction | ✅ **Handled** | Spatial polygon geofencing & Jurisdiction Version Manager (V1/V2/V3) |
| 3 | Prioritisation beyond "most votes" | ✅ **Handled** | Multi-factor SLA formula (Severity × Sensitive Location × Ticket Age) |
| 4 | Bad input (duplicate, fake photo, wrong location) | ✅ **Handled** | 50m / 7-day geo-deduplication & Cloudinary Base64 image validation |
| 5 | Works without internet | ✅ **Handled** | Flutter `SharedPreferences` persistent queue & intent recovery |

---

## 1. Fake, Spam and Harassment Reports

- **Approach:** Every citizen report undergoes two-stage verification:
  1. **AI Vision Defect Classifier (`ai_classifier.py`)**: Computes feature vectors and assigns a confidence score (minimum 85% threshold required for automatic High priority dispatch).
  2. **Duplicate Check Engine (`duplicate_engine.py`)**: Checks for existing reports within a 50-meter radius filed within the last 7 days.
- **Anonymity Trade-off:** Citizens can report without mandatory public sign-in while device tokens and ward IDs prevent automated script spam.
- **Code Reference:** [src/backend/duplicate_engine.py](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/backend/duplicate_engine.py) & [src/backend/ai_classifier.py](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/backend/ai_classifier.py).

---

## 2. Unclear Jurisdiction

- **Approach:** Bounced complaints are eliminated through deterministic spatial polygon matching. Instead of relying on static radial distance, coordinates are tested against MCC Ward polygon boundaries (`routing_engine.py`).
- **Boundary Cases:** If a report falls near the boundary of Ward 42 (Devaraja/Agrahara) and Ward 38 (Vijayanagar), the routing engine assigns a confidence score and routes it to the primary jurisdiction while creating a shared view for neighboring ward officers.
- **Jurisdiction Schema Evolution:** Admin Governance can dynamically toggle between V1 (2022), V2 (2024), and V3 (2026 active) polygon boundary versions.
- **Code Reference:** [src/backend/routing_engine.py](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/backend/routing_engine.py) & [src/dashboard/src/screens/admin/JurisdictionVersionManager.jsx](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/dashboard/src/screens/admin/JurisdictionVersionManager.jsx).

---

## 3. Prioritisation Beyond "Most Votes"

- **Formula / Rules:** SLA priority is calculated using a dynamic mathematical weighting formula rather than simple upvote counts:
  $$\text{Priority Score} = (\text{Defect Severity Weight}) \times (\text{Location Weight}) + (\text{Ticket Age Hours}) + (\text{Upvotes} \times 0.2)$$
  - *High Severity Defects* (Potholes on arterial roads, Drainage blockages near schools) receive an automated **24-hour SLA resolution clock**.
  - *Medium Severity Defects* (Streetlight outages, Garbage overflow) receive a **48-hour SLA resolution clock**.
- **Code Reference:** [src/backend/sla_engine.py](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/backend/sla_engine.py).

---

## 4. Bad Input Handling

| Input Scenario | System Defense & Behavior |
|---|---|
| **Duplicate Report** | Flagged by `duplicate_engine.py` (within 50m radius). Increments upvote count on existing master ticket instead of creating redundant dispatches. |
| **Fake / Unrelated Photo** | AI Vision Classifier detects lack of civic defect feature vectors, lowering confidence score and flagging for officer manual review. |
| **Out-of-Boundary Coordinates** | Pinned on OpenStreetMap in mobile app; routing engine maps to nearest Mysuru municipal boundary with notice. |
| **App Process Crash on Camera Pick** | Handled in `splash_screen.dart` using `ImagePicker().retrieveLostData()` and `SharedPreferences` to restore evidence photos seamlessly. |

---

## 5. Offline Operation

- **What Works Offline:** Photo capture, AI scan animation preview, live GPS location pinning, local report drafting, and ticket history viewing.
- **How It Syncs:** Unsent complaints are serialized as JSON and stored in `SharedPreferences`. When network connectivity is restored, `ApiService.fetchComplaints()` flushes the queue to Firebase Firestore and FastAPI backends.
- **Testing Offline Mode:** Enable Airplane mode on phone or DevTools Offline mode in browser → File report → Turn network back on → Observe real-time sync.
- **Code Reference:** [src/mobile/lib/screens/splash_screen.dart](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/mobile/lib/screens/splash_screen.dart) & [src/mobile/lib/services/api_service.dart](file:///d:/project%20by%20sujal/MYSORE-HACKTHON/HM26-02AE-POWER-RANGERS/src/mobile/lib/services/api_service.dart).
