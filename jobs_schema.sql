-- Jobs table schema for NewKenyan.co.ke job postings
-- This should be run in your Supabase SQL Editor

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Job basic info
    job_title VARCHAR(255) NOT NULL,
    nature_of_job VARCHAR(50) NOT NULL, -- FULL TIME, PART TIME, etc.
    industry VARCHAR(50) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    job_location VARCHAR(100) NOT NULL,
    
    -- Job description
    duties_and_responsibilities TEXT NOT NULL,
    key_requirements_skills_qualification TEXT NOT NULL,
    how_to_apply TEXT NOT NULL,
    
    -- Company info
    company_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(20),
    
    -- Payment info
    payment_reference VARCHAR(255),
    payment_amount VARCHAR(20) DEFAULT 'KES 300',
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    payment_verified BOOLEAN DEFAULT false,
    
    -- Status and moderation
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, expired
    featured BOOLEAN DEFAULT false,
    
    -- SEO and URL
    slug VARCHAR(300) UNIQUE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
    
    -- Admin notes
    admin_notes TEXT,
    
    -- User association (for user dashboard)
    user_id VARCHAR(255)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(job_location);
CREATE INDEX IF NOT EXISTS idx_jobs_industry ON jobs(industry);
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_payment_status ON jobs(payment_status);
CREATE INDEX IF NOT EXISTS idx_jobs_user_id ON jobs(user_id);

-- Function to auto-generate slug from job title and company
CREATE OR REPLACE FUNCTION generate_job_slug(title TEXT, company TEXT, location TEXT)
RETURNS TEXT AS $$
DECLARE
    base_slug TEXT;
    final_slug TEXT;
    counter INTEGER := 1;
BEGIN
    -- Create base slug from title, company, and location
    base_slug := LOWER(
        REGEXP_REPLACE(
            TRIM(title || '-' || company || '-' || location),
            '[^a-zA-Z0-9\s-]', '', 'g'
        )
    );
    base_slug := REGEXP_REPLACE(base_slug, '\s+', '-', 'g');
    base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
    base_slug := TRIM(base_slug, '-');
    
    final_slug := base_slug;
    
    -- Check for uniqueness and append number if needed
    WHILE EXISTS (SELECT 1 FROM jobs WHERE slug = final_slug) LOOP
        counter := counter + 1;
        final_slug := base_slug || '-' || counter;
    END LOOP;
    
    RETURN final_slug;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate slug on insert
CREATE OR REPLACE FUNCTION trigger_generate_job_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL THEN
        NEW.slug := generate_job_slug(NEW.job_title, NEW.company_name, NEW.job_location);
    END IF;
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_job_slug_trigger
    BEFORE INSERT OR UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION trigger_generate_job_slug();

-- Enable Row Level Security (but we'll use API for access control)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create a service role policy (for API access)
CREATE POLICY "Service role can manage jobs" ON jobs
    FOR ALL USING (auth.role() = 'service_role');

-- Insert some sample job data (optional)
INSERT INTO jobs (
    job_title,
    nature_of_job,
    industry,
    salary,
    job_location,
    duties_and_responsibilities,
    key_requirements_skills_qualification,
    how_to_apply,
    company_name,
    contact_email,
    contact_phone,
    payment_reference,
    payment_status,
    payment_verified,
    status
) VALUES 
(
    'Marketing Manager',
    'FULL TIME',
    'MARKETING',
    'KSHS. 60,000-80,000',
    'NAIROBI',
    'Develop and implement marketing strategies to promote company products and services. Manage social media campaigns, analyze market trends, and coordinate with sales team.',
    'Bachelor''s degree in Marketing or related field. 3+ years experience in digital marketing. Proficiency in Google Analytics, Facebook Ads, and content creation.',
    'Send your CV and cover letter to hr@techcompany.co.ke. Only shortlisted candidates will be contacted.',
    'Tech Solutions Kenya',
    'hr@techcompany.co.ke',
    '+254 700 123 456',
    'job_post_sample_001',
    'completed',
    true,
    'approved'
),
(
    'Software Developer',
    'FULL TIME',
    'TECHNOLOGY',
    'KSHS. 80,000-120,000',
    'NAIROBI',
    'Design, develop and maintain web applications using modern technologies. Collaborate with team members on various projects and ensure code quality.',
    'Degree in Computer Science or related field. Experience with React, Node.js, and databases. Strong problem-solving skills.',
    'Apply through our website at careers.devco.ke or email your portfolio to jobs@devco.ke',
    'DevCo Limited',
    'jobs@devco.ke',
    '+254 701 234 567',
    'job_post_sample_002',
    'completed',
    true,
    'approved'
);

COMMENT ON TABLE jobs IS 'Job postings for NewKenyan.co.ke job portal';