-- ==============================================================================
-- RITVYA Core Database Migration
-- Women's Health Education & Care Navigation Platform
-- Designed with Row Level Security (RLS) for complete privacy-by-design
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_name TEXT,
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  enable_tracking BOOLEAN DEFAULT TRUE,
  enable_voice BOOLEAN DEFAULT FALSE,
  store_chat_history BOOLEAN DEFAULT TRUE,
  data_retention_days INT DEFAULT 365,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
  ON public.user_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 3. Cycle Entries Table
CREATE TABLE IF NOT EXISTS public.cycle_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE,
  flow_intensity VARCHAR(20) CHECK (flow_intensity IN ('spotting', 'light', 'medium', 'heavy', 'very_heavy')),
  cramping_intensity INT CHECK (cramping_intensity BETWEEN 0 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.cycle_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cycle entries"
  ON public.cycle_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cycle entries"
  ON public.cycle_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cycle entries"
  ON public.cycle_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cycle entries"
  ON public.cycle_entries FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_cycle_entries_user_date ON public.cycle_entries(user_id, start_date DESC);

-- 4. Health Entries Table (Symptoms, Mood, Energy, Sleep, Pain)
CREATE TABLE IF NOT EXISTS public.health_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  symptoms TEXT[] DEFAULT '{}',
  mood VARCHAR(50),
  energy_level VARCHAR(20) CHECK (energy_level IN ('very_low', 'low', 'moderate', 'high', 'vibrant')),
  sleep_hours NUMERIC(4, 1),
  pain_score INT CHECK (pain_score BETWEEN 0 AND 10),
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.health_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own health entries"
  ON public.health_entries FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_health_entries_user_date ON public.health_entries(user_id, entry_date DESC);

-- 5. Conversations Table
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT DEFAULT 'Health Consultation',
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own conversations"
  ON public.conversations FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Conversation Messages Table
CREATE TABLE IF NOT EXISTS public.conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_role VARCHAR(20) NOT NULL CHECK (sender_role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  safety_escalated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access messages for own conversations"
  ON public.conversation_messages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = conversation_messages.conversation_id
      AND c.user_id = auth.uid()
    )
  );

-- 7. Clinician Saved Summaries Table
CREATE TABLE IF NOT EXISTS public.saved_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  chief_complaint TEXT NOT NULL,
  timeline_summary TEXT,
  included_entry_ids UUID[] DEFAULT '{}',
  questions_for_doctor TEXT[] DEFAULT '{}',
  patient_notes TEXT,
  disclaimer_accepted BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.saved_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own clinician summaries"
  ON public.saved_summaries FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. Consent Records Table (Audit-ready compliance)
CREATE TABLE IF NOT EXISTS public.consent_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type VARCHAR(50) NOT NULL,
  granted BOOLEAN NOT NULL,
  version VARCHAR(20) NOT NULL,
  ip_hash TEXT,
  granted_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own consent records"
  ON public.consent_records FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own consent records"
  ON public.consent_records FOR INSERT
  WITH CHECK (auth.uid() = user_id);
