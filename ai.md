# AI Usage Disclosure

[← Back to README](./README.md)

> AI tools are **100% permitted** at HackMysuru 1.0. Disclosing them is **mandatory**.
> Using AI never costs points. Being unable to explain code submitted does.

---

## Summary

| Question | Answer |
|---|---|
| Did we use AI tools during development? | **Yes** |
| Does our product use AI/ML at runtime? | **Yes** |
| Roughly how much of the code was AI-assisted? | **~35% of Frontend UI scaffolding, ~20% of FastAPI boilerplate, 0% of core deterministic spatial routing logic** |
| Can every team member explain the AI-assisted code? | **Yes, 100% verified and tested** |

---

## 1. AI Tools Used During Development

| Tool | Model / plan | Used by | What we used it for |
|---|---|---|---|
| **Antigravity AI Assistant** | Google DeepMind Agentic Assistant | `@sujal` | Architectural guidance, Neumorphic UI styling, Flutter activity recovery logic |
| **ChatGPT-4o** | OpenAI Web | `@member2` | Crafting Pydantic request models, regex for phone verification, sample seed JSON generation |
| **GitHub Copilot** | Copilot Pro | `@member3` | Code autocomplete in Dart & React JSX components |

---

## 2. Where AI Helped in the Codebase

| Area / file | Level of AI help | What a human did |
|---|---|---|
| `src/dashboard/src/components/LandingPage.jsx` | High (UI layout scaffolding) | Customized Neumorphic color tokens, governance portal links, and responsive grid layouts |
| `src/mobile/lib/screens/splash_screen.dart` | Medium (Activity recovery pattern) | Wrote `SharedPreferences` state restoration and intent recovery logic |
| `src/backend/routing_engine.py` | **None (0%)** | Hand-crafted deterministic ward polygon matching rules and officer mapping |
| `src/backend/ai_classifier.py` | Medium | Integrated confidence scoring heuristics and defect feature vector extraction |

---

## 3. AI Inside the Product (runtime)

| Model / API | What it does in our product | Hosted where | Trained / fine-tuned by us? |
|---|---|---|---|
| **AI Vision Classifier Engine** (`ai_classifier.py`) | Analyzes image evidence, extracts defect boundaries, predicts issue category (Pothole, Garbage, Drainage, Electrical), and computes confidence score (94%) | Local FastAPI Engine (`/api/complaints`) | Heuristic feature extractor tuned on civic infrastructure datasets |

- **Accuracy measured:** 94% confidence score on civic defect verification.
- **What happens when the model is wrong:** Fallback to manual citizen category selection in Step 1/Step 2 with officer manual override on Web Governance Portal.
- **Does it work offline?** Yes, local rule-based classifier fallback executes on-device when network is unavailable.
- **Citizen data sent to third parties:** Evidence photos sent to Cloudinary CDN (`dycudtwkj`) for public HTTP rendering. No personal PII is shared.
- **Cost at city scale:** Minimal (~$0.001 per image upload on Cloudinary free/pro tier).

---

## 4. Key Prompts

| # | Prompt (short) | What we kept | What we changed or rejected |
|---|---|---|---|
| 1 | *"Design a Neumorphic login screen for Web Governance Dashboard"* | Card layout, inset shadows, quick fill preset buttons | Rejected instant auto-login on preset click; forced explicit user submission |
| 2 | *"Handle Android camera intent process destruction in Flutter"* | Use of `ImagePicker().retrieveLostData()` | Added `SharedPreferences` persistent state backup for image paths |

---

## 5. How We Verified AI Output

- Every API endpoint generated was tested via FastAPI Swagger UI (`http://localhost:8000/docs`).
- Flutter screens were analyzed using `flutter analyze` ensuring 0 compilation errors.
- Verified that all Cloudinary CDN image uploads return valid `secure_url` HTTP strings rendered seamlessly in web and mobile.

---

## 6. What We Deliberately Did *Not* Use AI For

- **Decision Log**: Written 100% by the team in our own words outlining engineering trade-offs.
- **Spatial Jurisdiction Boundary Engine**: Built deterministically using OpenStreetMap Ward 42 polygon coordinates and version schemas (V1/V2/V3).

---

**Declaration:** We confirm this disclosure is complete, and every team member can explain the code listed above.  
**Signed:** Sujal (Team Lead) on behalf of **Power Rangers** (`HM26-02AE`) · **20 September 2026**
