# Digital Mental Health & Psychological Support MVP

## Overview
This repository contains the MVP (2–3 week scope) for a stigma-free, student-focused digital mental health and psychological support platform.  
It is designed to provide **quick assessments, 24×7 chatbot support, anonymous/signed-in flows, community spaces, and crisis-safe mechanisms**.

---

## 🎯 MVP Goals
- Private, stigma-free entry (Anonymous or College SSO/OTP).
- 2–3 min assessment (PHQ-9 / GAD-7) → plain-language result card.
- 24×7 chatbot for small talk, coping strategies, and routing.
- Anonymous path → booking calls only, no history stored.
- Signed-in path → dashboard, score trends, updates, community, cultural videos/courses.
- Crisis-safe → helplines + escalation SOP.

---

## 🧭 Primary User Flows

### 0) Entry
- Sign in with College ID (OTP/SSO) or Continue Anonymously.
- Language picker: English, Hindi, Urdu, Dogri, Kashmiri.

### 1) Quick Assessment
- Choose PHQ-9 or GAD-7 (2–3 min).
- Consent checkbox (store if signed-in, skip if anonymous).
- Result card → band + 2 coping tips + CTA.

### 2) Chatbot (always on)
- Small talk & coping.
- Commands: `/exercise`, `/sleep`, `/book`, `/resources`, `/help`.
- Detects risk language → crisis banner + helplines + one-tap call.

### 3) Anonymous Path
- Book a call → slot picker, contact mode (anonymous link/phone).
- No history, only confirmation screen.

### 4) Signed-in Path
- My Analysis: last scores, trend sparkline, next steps.
- Updates: campus events, wellness drives, content.
- Community (moderated, anonymous handles).
- Cultural & Traditional resources (regional videos, audio, courses).

---

## 📱 Screen List
- Welcome: brand + language picker + sign-in/anonymous buttons.
- Auth: OTP or anonymous session generator.
- Assessment: PHQ-9/GAD-7 items, progress dots, consent toggle.
- Result: band, plain text, tips, CTA.
- Chatbot: chat pane + quick chips.
- Book a Call: slot picker, confirm screen.
- My Analysis (signed-in): scores, tips, revisit screener.
- Community (signed-in): topics, posts/replies, moderation.
- Resources: filterable cards (video/audio/pdf).
- Settings: language, privacy, delete/export data.

---

## 🗄 Minimal Data Model
- **session**: session_id, user_id?, lang, consent, created_at.
- **user**: user_id, college_id, role, phone/email?.
- **screening_event**: id, session_id, user_id?, tool, score, answers, band, created_at.
- **booking**: id, session_id/user_id, counsellor_id, start_time, mode, status.
- **resource**: id, type, title, lang[], tags[], url, duration, is_offline.
- **post**: id, user_id, topic, content, created_at, is_hidden.
- **helpline**: id, state, campus_id?, name, number/url, hours.

---

## 🔌 API Endpoints
- `POST /auth/otp/start` | `/auth/otp/verify`
- `POST /session/anonymous`
- `POST /screening/submit {tool, answers, consent}`
- `GET /screening/last` (signed-in)
- `GET /resources?topic&lang`
- `POST /booking/create {start_time, mode}`
- `GET /booking/mine`
- `GET /helplines?state&campus_id`
- `GET /community/topics`
- `POST /community/post`
- `POST /community/report`

---

## 🤖 Chatbot Behaviors
- Supportive, non-diagnostic, bilingual (English + regional languages).
- Explains the “why” behind coping tips.
- **Shortcuts**:  
  - `/exercise` → breathing/grounding script.  
  - `/sleep` → hygiene tips.  
  - `/book` → call booking flow.  
  - `/resources exam` → language-aware list.  
- **Risk words** → crisis escalation.

---

## 📦 Content Pack (Seed)
- **Videos**: 6 short clips (exam stress, sleep routine, homesickness, mindfulness) × 5 languages.
- **Audio**: 4 relaxations (breathing, body scan, gratitude, progressive relaxation).
- **Courses**: 2 micro-courses (Study Calm, Better Sleep in 7 Days).
- **Cultural**: localized practices (Urdu breathing, Dogri proverbs, Kashmiri traditions).

---

## 🛡 Moderation & Crisis SOP
- Auto-hide abusive/PII posts; counsellor review queue.
- If PHQ-9 item-9 > 0 or explicit risk → crisis banner + Tele-MANAS helpline + on-call connect option.
- Risk events logged with flags + timestamps (no sensitive text).

---

## 🛠 Tech Stack (Lean)
- **Frontend**: Next.js (web), React Native (mobile later), TailwindCSS.
- **Backend**: FastAPI/Node, PostgreSQL, Redis cache.
- **Storage**: S3 for media, SQLite offline packs.
- **AI**: OpenAI for chatbot, lightweight intent/risk prompts.
- **Auth**: OTP (college ID) + anonymous sessions.
- **Deploy**: Docker, Vercel (front), Render/Fly/GCP (backend).
- **Analytics**: PostHog.

---

## ✅ Acceptance Criteria
- Anonymous & signed-in flows both functional.
- PHQ-9/GAD-7 complete in ≤3 minutes.
- Chatbot responds with coping tips, resources, and booking.
- Signed-in dashboard: scores + trends + tips.
- Community: post/reply/report + moderation.
- Crisis flow: helplines visible + connect option.

---

## 🚀 10-Day Build Plan (Scrappy)
- **D1–2**: UI scaffolding + auth + anonymous sessions.
- **D3**: PHQ-9/GAD-7 components + result card.
- **D4–5**: Chatbot with OpenAI tools.
- **D6**: Booking + calendar + notifications.
- **D7**: Resources gallery (seed 12 assets).
- **D8**: Community (topics + post/reply/report).
- **D9**: Crisis SOP + moderation.
- **D10**: QA, bilingual copy, pilot deploy.

---

© 2025 – Student Wellbeing MVP Project
