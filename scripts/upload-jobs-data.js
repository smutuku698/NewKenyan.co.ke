/**
 * Upload Jobs Data to Supabase Database
 * 
 * This script uploads all job postings from src/data/jobs.json
 * to the Supabase jobs table for use on the live site.
 * 
 * Usage: node scripts/upload-jobs-data.js
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function uploadJobsData() {
  try {
    const jobsFilePath = path.join(__dirname, '..', 'src', 'data', 'jobs.json');
    
    if (!fs.existsSync(jobsFilePath)) {
      console.log('❌ Jobs data file not found:', jobsFilePath);
      return;
    }
    
    const jobsData = JSON.parse(fs.readFileSync(jobsFilePath, 'utf8'));
    const jobs = jobsData.jobs || [];
    
    console.log(`Found ${jobs.length} jobs to upload...`);

    let uploadedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (const job of jobs) {
      try {
        // Map JSON data to database schema
        const jobRecord = {
          job_title: job.job_title,
          nature_of_job: job.nature_of_job,
          industry: job.industry,
          salary: job.salary,
          job_location: job.job_location,
          duties_and_responsibilities: job.duties_and_responsibilities,
          key_requirements_skills_qualification: job.key_requirements_skills_qualification,
          how_to_apply: job.how_to_apply,
          
          // Default values for required fields missing in JSON
          company_name: null,
          contact_email: job.how_to_apply.includes('@') ? 
            job.how_to_apply.match(/[\w\.-]+@[\w\.-]+\.\w+/)?.[0] || null : null,
          contact_phone: '0736 407642',
          
          // Payment and status info
          payment_reference: `job_upload_${job.id}`,
          payment_amount: 'KES 300',
          payment_status: 'completed',
          payment_verified: true,
          
          // Approve all uploaded jobs
          status: 'approved',
          featured: false,
          
          // Set created date from JSON date if available
          created_at: job.date ? new Date(job.date).toISOString() : new Date().toISOString(),
          approved_at: new Date().toISOString(),
          
          // Admin notes
          admin_notes: `Uploaded from jobs.json - Original ID: ${job.id}`,
          
          // No user association for bulk upload
          user_id: null
        };

        console.log(`Uploading: ${job.job_title} (${job.job_location})`);

        // Check if job already exists (by title, location, and company)
        const { data: existingJob } = await supabase
          .from('jobs')
          .select('id')
          .eq('job_title', jobRecord.job_title)
          .eq('job_location', jobRecord.job_location)
          .eq('company_name', jobRecord.company_name)
          .single();

        if (existingJob) {
          console.log(`⏭️  Skipped ${job.job_title} (already exists)`);
          skippedCount++;
          continue;
        }

        // Insert job record
        const { data, error } = await supabase
          .from('jobs')
          .insert([jobRecord])
          .select();

        if (error) {
          console.error(`❌ Error uploading ${job.job_title}:`, error);
          errorCount++;
        } else {
          console.log(`✅ Uploaded: ${job.job_title} (ID: ${data[0].id})`);
          uploadedCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`❌ Error processing job ${job.id} (${job.job_title}):`, error);
        errorCount++;
      }
    }

    console.log(`\n🎉 Upload Summary:`);
    console.log(`✅ Uploaded: ${uploadedCount} jobs`);
    console.log(`⏭️  Skipped: ${skippedCount} jobs`);
    console.log(`❌ Errors: ${errorCount} jobs`);
    console.log(`📁 Total processed: ${jobs.length} jobs`);

    // Fetch and display some sample uploaded jobs
    console.log(`\n📋 Sample uploaded jobs:`);
    const { data: sampleJobs } = await supabase
      .from('jobs')
      .select('job_title, job_location, slug, created_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(5);

    if (sampleJobs && sampleJobs.length > 0) {
      sampleJobs.forEach(job => {
        console.log(`🔗 ${job.job_title} (${job.job_location}) - Slug: ${job.slug}`);
      });
    }

  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
}

if (require.main === module) {
  uploadJobsData();
}

module.exports = { uploadJobsData };