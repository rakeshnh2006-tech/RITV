# RITVYA — Women's Health Education & Care-Navigation Platform

> **Official Brand Name:** RITVYA  
> **Primary Tagline:** Ancient Wisdom. Intelligent Care.  
> **Secondary Tagline:** Understand Your Body. Find Your Next Step.

RITVYA is a calm, intelligent, multilingual women’s health education and care-navigation platform. It helps women understand health information, describe symptoms in their own words, explore conditions such as Polycystic Ovary Syndrome (PCOS), maintain optional private health diaries, recognize acute clinical warning signs, and prepare for confident, structured conversations with qualified healthcare professionals.

---

## 1. Core Principles

- **Education, not diagnosis:** RITVYA explains biological concepts and physiological mechanisms without ever claiming to determine a clinical condition.
- **Care navigation, not prescription:** We guide users toward reasonable next steps and preparation for clinical appointments without prescribing medications or dosages.
- **Privacy by design:** By default, user records are stored strictly on the user's device or isolated with PostgreSQL Row Level Security (RLS). No health metrics are ever sold or used for ad targeting.
- **Language inclusion:** Full multilingual support across 8 languages: English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ), Telugu (తెలుగు), Tamil (தமிழ்), Malayalam (മലയാളം), Marathi (मराठी), and Bengali (বাংলা).
- **Safety before engagement:** Deterministic medical red flag rules run before and after every AI response, instantly escalating acute emergencies to verified emergency services.
- **Evidence over speculation:** Educational modules cite reputable health bodies (WHO, Monash University, ACOG, Endocrine Society, ICMR).
- **No shame or stigma:** Respectful, clinical, and non-judgmental language across menstruation, fertility, hormonal skin/hair, and reproductive wellness.
- **User control:** Health tracking, voice input, AI conversation storage, and account creation are strictly optional.

---

## 2. Technology Stack

- **Frontend:** Next.js (App Router), React, TypeScript (strict mode), Tailwind CSS
- **Icons & Visuals:** Lucide Icons (`lucide-react`)
- **Visual Design:** Color palette derived from the official RITVYA logo (`#34213D` deep plum, `#7963A8` muted violet, `#F2EFF8` light lavender, `#FFFDF9` warm ivory, `#E98E83` soft coral, `#8EA187` muted sage)
- **Forms & Validation:** TypeScript schemas with strict server-side validation
- **Backend & APIs:** Next.js Route Handlers with deterministic safety pre-screening
- **AI Layer:** Server-side AI provider adapter supporting Google Gemini (`gemini-2.5-flash`), with built-in evidence engine simulation fallback (clearly labeled Demo Mode)
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS) migrations, plus resilient Local Demo repository when running without cloud credentials
- **Voice Capabilities:** Web Speech API (SpeechRecognition & SpeechSynthesis) with transcript preview & edit controls
- **Quality & Tests:** Node test runner (`node --import tsx --test`) covering safety rules, multilingual dictionaries, cycle calculations, insights, and summary generators

---

## 3. Project Structure

```
├── app/
│   ├── layout.tsx                # Root layout with fonts, metadata, and providers
│   ├── globals.css               # Design tokens, typography, print styles
│   ├── page.tsx                  # Public Landing Page (10 sections)
│   ├── about/page.tsx            # Mission and product principles
│   ├── safety/page.tsx           # Health limitations & verified emergency helplines
│   ├── privacy/page.tsx          # Privacy-by-design policy & user rights
│   ├── login/page.tsx            # Sign in (Supabase + 1-click Demo mode)
│   ├── signup/page.tsx           # Account creation with consent checks
│   ├── app/                      # Authenticated Workspace
│   │   ├── layout.tsx            # Workspace shell with AppNav
│   │   ├── page.tsx              # Personal Dashboard
│   │   ├── understand/page.tsx   # Guided Symptom Understanding Wizard
│   │   ├── chat/page.tsx         # AI Health Education Chat
│   │   ├── pcos/page.tsx         # PCOS Learning Center
│   │   ├── track/page.tsx        # Optional Health & Cycle Tracking Diary
│   │   ├── history/page.tsx      # Chronological Saved Records & Archives
│   │   ├── insights/page.tsx     # Trends derived strictly from actual records
│   │   ├── consultation/page.tsx # Clinician-Ready Summary Builder
│   │   └── settings/page.tsx     # Language, consents, export, and deletion
│   └── api/                      # Server-Side Route Handlers
│       ├── understand/route.ts   # Symptom analysis with safety pre-check
│       ├── chat/route.ts         # Education chat endpoint
│       ├── cycle-entries/route.ts# Cycle tracking endpoint
│       ├── health-entries/route.ts# Daily observation endpoint
│       ├── summaries/route.ts    # Clinician summaries endpoint
│       └── export/route.ts       # Data portability endpoint
├── components/
│   ├── brand/Logo.tsx            # Official RITVYA logo component
│   ├── layout/Header.tsx         # Public website header with language selector
│   ├── layout/Footer.tsx         # Public website footer with medical disclaimers
│   ├── layout/AppNav.tsx         # Authenticated workspace navigation bar
│   └── safety/EmergencyModal.tsx # Urgent healthcare safety alert modal
├── content/
│   └── health/pcos.ts            # Structured evidence-based PCOS learning modules
├── lib/
│   ├── brand.ts                  # Brand tokens, taglines, emergency numbers
│   ├── safety/                   # Deterministic safety rules & evaluator
│   ├── i18n/                     # Multilingual dictionaries (8 languages) & context
│   ├── ai/                       # AI provider adapter & evidence simulation
│   ├── db/                       # Supabase client & LocalStore repository
│   ├── auth/                     # Authentication context & Demo user manager
│   └── voice/                    # Browser speech recognition & speech synthesis
├── supabase/
│   └── migrations/               # PostgreSQL schema & Row Level Security policies
├── tests/                        # Automated unit & integration test suites
│   ├── safety.test.ts            # Deterministic red flag escalation tests
│   ├── i18n.test.ts              # Translation dictionary completeness tests
│   ├── insights.test.ts          # Insights calculator empirical integrity tests
│   └── summary.test.ts           # Clinician summary builder tests
└── public/
    └── images/ritvya-logo.jpg    # Official RITVYA Logo Asset
```

---

## 4. Getting Started

### Prerequisites

- Node.js v20+ or v22+
- npm v10+

### Installation

Clone the repository and install dependencies:

```bash
cd RITVYA
npm install
```

### Running Locally

To start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Environment Variables & Demo Mode

RITVYA works **out of the box in Local Demo Mode** without requiring external credentials. In Demo Mode, all data is isolated inside your browser's local storage and clearly labeled with a **Demo Mode** indicator.

To connect cloud persistence and the live AI model, create `.env.local` using `.env.example` as a template:

```bash
cp .env.example .env.local
```

### Environment Keys

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (`https://your-project.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase project public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase service key (never exposed to client) |
| `GEMINI_API_KEY` | Google Gemini API key for live AI responses (server-side only) |
| `NEXT_PUBLIC_APP_URL` | Base application URL (default: `http://localhost:3000`) |

---

## 6. Supabase Database Setup & Migrations

To apply database migrations to your Supabase instance:

1. Install Supabase CLI: `npm install -D supabase`
2. Link your project: `npx supabase link --project-ref your-project-ref`
3. Push the migrations: `npx supabase db push`

Alternatively, execute the SQL script located at:
`supabase/migrations/20261015000000_ritvya_core_schema.sql` directly in your Supabase SQL Editor.

The migration sets up Row Level Security (RLS) on all tables:
- `profiles`
- `user_preferences`
- `cycle_entries`
- `health_entries`
- `conversations`
- `conversation_messages`
- `saved_summaries`
- `consent_records`

---

## 7. Healthcare Safety Architecture

RITVYA implements a separate, deterministic safety layer (`lib/safety/rules.ts`) that runs **before any AI call is initiated** and **again before any output is presented**.

### Monitored Warning Signs

- **Severe Vaginal Hemorrhaging:** Soaking 2+ pads an hour for consecutive hours, passing large clots with faintness.
- **Acute Severe Pelvic Pain / Ectopic Suspicion:** Sudden sharp lower quadrant pain with shoulder-tip pain or positive pregnancy test.
- **Cardiovascular Warning Signs:** Crushing chest pain radiating to left arm or jaw with shortness of breath.
- **Obstetric Red Flags:** Third-trimester fluid leaking, sudden visual changes with elevated blood pressure, absence of fetal movement.
- **Neurological Emergencies:** Sudden facial drooping, speech difficulty, thunderclap headache.
- **Psychiatric Emergencies:** Active thoughts or urges of self-harm.

When triggered, educational processing stops and an urgent modal displays verified emergency helplines:
- **India National Emergency:** 112
- **National Ambulance:** 108
- **Maternal Health Relief:** 102
- **Tele-MANAS Mental Health:** 14416 (24/7 toll-free)
- **Women Helpline:** 1091 / 181
- **International:** Local emergency dispatch (911 / 999 / 112)

---

## 8. Running Automated Checks & Tests

Execute the unit test suite:

```bash
npm test
```

Build the production bundle:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

---

## 9. Deployment Steps

RITVYA can be deployed seamlessly to Vercel, Google Cloud Run, AWS Amplify, or any Node.js hosting platform:

### Deploying to Vercel

1. Push your code to a Git repository (GitHub/GitLab).
2. Import the repository into Vercel.
3. Configure the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GEMINI_API_KEY`, etc.).
4. Click **Deploy**.

---

## 10. Medical Disclaimer

> **IMPORTANT:** RITVYA provides health education and care navigation only. It is not a substitute for clinical diagnosis, professional medical advice, prescription, or treatment. Always consult a qualified healthcare professional regarding any personal health concern. If you believe you are experiencing a medical emergency, call your local emergency service (112 / 108 in India) immediately.
