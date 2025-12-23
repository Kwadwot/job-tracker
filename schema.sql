-- ============================================
-- Job Application Tracker - Database Schema
-- ============================================

-- ---------- CLEANUP (for development resets) ----------
DROP TABLE IF EXISTS applications CASCADE;
DROP TYPE IF EXISTS application_status CASCADE;
DROP TYPE IF EXISTS position_type CASCADE;

-- ---------- ENUM TYPE ----------
CREATE TYPE application_status AS ENUM (
    'Not Applied',
    'Applied',
    'Interviewing',
    'Offer',
    'Rejected',
    'Withdrawn'
);

CREATE TYPE position_type AS ENUM (
    'Full-time',
    'Part-time',
    'Contract',
    'Internship',
    'Temporary',
    'Freelance',
    'Other'
);

-- ---------- APPLICATIONS TABLE ----------
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,

    position VARCHAR(150) NOT NULL,
    position_type position_type NOT NULL DEFAULT 'Full-time',
    company VARCHAR(150) NOT NULL,
    location VARCHAR(150),

    site_link TEXT,

    status application_status NOT NULL DEFAULT 'Not Applied',

    notes TEXT,

    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_applied DATE,
    date_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------- TIMESTAMP UPDATE FUNCTION ----------
CREATE OR REPLACE FUNCTION update_date_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------- TRIGGER ----------
CREATE TRIGGER set_date_updated
BEFORE UPDATE ON jobs
FOR EACH ROW
EXECUTE FUNCTION update_date_updated();

-- ---------- OPTIONAL INDEXES ----------
-- Speeds up filtering & sorting in the UI
CREATE INDEX idx_applications_status ON jobs(status);
CREATE INDEX idx_applications_company ON jobs(company);
CREATE INDEX idx_applications_date_applied ON jobs(date_applied);
CREATE INDEX idx_applications_date_created ON jobs(date_created);

-- ============================================
-- END OF SCHEMA
-- ============================================
