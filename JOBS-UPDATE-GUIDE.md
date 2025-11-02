# Jobs Update Guide

## How to Add/Update Jobs

### File Location
**`local-jobs.json`** (root directory)

### Update Process (Twice Weekly)

1. **Get new jobs data** from your scraper/source
2. **Replace or append** to `local-jobs.json`
3. **Update metadata**:
   ```json
   {
     "updated_at": "2025-11-05T10:30:00.000000",  // Current timestamp
     "total_jobs": 250,                           // Total count
     "source": "Automated scraper from britesmanagement.com",
     "last_scrape_added": 25,                     // Jobs added this update
     "jobs": [ ... ]
   }
   ```
4. **Commit to git**:
   ```bash
   git add local-jobs.json
   git commit -m "Update jobs - November 5, 2025"
   git push
   ```

### Job Data Structure

Each job must have these fields:
```json
{
  "id": 226,                              // Unique ID
  "date": "5 November 2025",              // Format: "DD Month YYYY"
  "job_title": "SOFTWARE ENGINEER",
  "nature_of_job": "FULL TIME",
  "industry": "Technology",
  "salary": "KSHS.150,000",
  "job_location": "NAIROBI",
  "duties_and_responsibilities": "...",
  "key_requirements_skills_qualification": "...",
  "how_to_apply": "..."
}
```

### What Happens Automatically

✅ Jobs sorted by date (most recent first)
✅ Filters update with new locations/industries
✅ Canonical URLs point to jobvacancy.co.ke
✅ "Apply Now" redirects to jobvacancy.co.ke
✅ Job detail pages generated automatically

### User Journey

1. **Browse jobs** → `/jobs-in-kenya` (listing page with filters)
2. **Click "Learn More"** → `/jobs-in-kenya/[job-slug]` (full details on NewKenyan.com)
3. **Click "Apply Now"** → Opens jobvacancy.co.ke in new tab
4. **Apply on original site** → JobVacancy.co.ke

### URL Patterns

- **NewKenyan listing:** `newkenyan.com/jobs-in-kenya/marketing-managerfmcg`
- **JobVacancy original:** `jobvacancy.co.ke/jobs-in-kenya/marketing-managerfmcg`
- **Canonical URL:** Points to JobVacancy.co.ke (for SEO)

### No Code Changes Needed!

Just update `local-jobs.json` and commit. Everything else is automatic.
