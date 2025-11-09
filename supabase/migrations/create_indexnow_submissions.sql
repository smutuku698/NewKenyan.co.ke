-- Create table to track IndexNow submissions
-- This prevents wasting daily quota on already-submitted URLs

CREATE TABLE IF NOT EXISTS indexnow_submissions (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  first_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submission_count INTEGER NOT NULL DEFAULT 1,
  success BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups when checking if URL was recently submitted
CREATE INDEX idx_indexnow_url ON indexnow_submissions(url);
CREATE INDEX idx_indexnow_last_submitted ON indexnow_submissions(last_submitted_at DESC);

-- Add comment
COMMENT ON TABLE indexnow_submissions IS 'Tracks URLs submitted to IndexNow API to avoid resubmitting within quota limits';
