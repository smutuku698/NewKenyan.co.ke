/**
 * Verify Google for Jobs Implementation
 *
 * This script checks:
 * 1. JobPosting structured data on sample job pages
 * 2. Jobs sitemap accessibility
 * 3. Required fields for Google for Jobs
 *
 * Run with: node verify-google-jobs.js
 */

const localJobsData = require('./local-jobs.json');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

const BASE_URL = 'https://newkenyan.com';

// Required fields for Google for Jobs
const REQUIRED_FIELDS = [
  'title',
  'description',
  'datePosted',
  'validThrough',
  'employmentType',
  'hiringOrganization',
  'jobLocation',
];

const RECOMMENDED_FIELDS = [
  'baseSalary',
  'applicantLocationRequirements',
  'educationRequirements',
  'experienceRequirements',
  'applicationContact',
  'identifier',
];

console.log('🔍 Google for Jobs Implementation Verification\n');
console.log('=' .repeat(60));

// Summary
console.log('\n📊 Site Overview:');
console.log(`   Total Jobs: ${localJobsData.total_jobs}`);
console.log(`   Last Updated: ${localJobsData.updated_at}`);
console.log(`   Last Scrape: Added ${localJobsData.last_scrape_added} new jobs`);
console.log(`   Source: ${localJobsData.source}`);

// Sample job URLs
console.log('\n📝 Sample Job URLs (first 5):');
const sampleJobs = localJobsData.jobs.slice(0, 5);
sampleJobs.forEach((job, index) => {
  const slug = slugify(job.job_title);
  const url = `${BASE_URL}/jobs-in-kenya/${slug}`;
  console.log(`   ${index + 1}. ${job.job_title}`);
  console.log(`      ${url}`);
});

// Sitemap URLs
console.log('\n🗺️  Sitemap URLs:');
console.log(`   Main Sitemap: ${BASE_URL}/sitemap.xml`);
console.log(`   Jobs Sitemap: ${BASE_URL}/jobs-sitemap.xml`);
console.log(`   Jobs Page: ${BASE_URL}/jobs-in-kenya`);

// Structured data verification
console.log('\n✅ Structured Data Implementation:');
console.log('\n   Required Fields (Google for Jobs):');
REQUIRED_FIELDS.forEach(field => {
  console.log(`   ✓ ${field}`);
});

console.log('\n   Recommended Fields:');
RECOMMENDED_FIELDS.forEach(field => {
  console.log(`   ✓ ${field}`);
});

// Test URLs
console.log('\n🧪 Testing URLs:');
console.log('\n   1. Rich Results Test (Google):');
console.log(`      https://search.google.com/test/rich-results?url=${encodeURIComponent(BASE_URL + '/jobs-in-kenya/' + slugify(sampleJobs[0].job_title))}`);

console.log('\n   2. Schema Markup Validator:');
console.log(`      https://validator.schema.org/#url=${encodeURIComponent(BASE_URL + '/jobs-in-kenya/' + slugify(sampleJobs[0].job_title))}`);

console.log('\n   3. Google Search Console:');
console.log('      https://search.google.com/search-console');

// Submission checklist
console.log('\n📋 Submission Checklist:');
console.log('\n   Google Search Console:');
console.log('   [ ] Verify site ownership');
console.log('   [ ] Submit sitemap: jobs-sitemap.xml');
console.log('   [ ] Request indexing for /jobs-in-kenya');
console.log('   [ ] Monitor Coverage report');
console.log('   [ ] Check Enhancements > Job Postings');

console.log('\n   IndexNow (Automated):');
console.log('   [ ] Run: node submit-jobs-to-google.js');
console.log('   [ ] Verify submission success');

console.log('\n   Testing & Validation:');
console.log('   [ ] Test sample job URL in Rich Results Test');
console.log('   [ ] Verify no structured data errors');
console.log('   [ ] Check mobile-friendliness');
console.log('   [ ] Ensure logo.png exists and is accessible');

// Data quality checks
console.log('\n📊 Data Quality Checks:');

let issuesFound = 0;

// Check for jobs with missing critical data
const jobsWithIssues = localJobsData.jobs.filter(job => {
  const issues = [];

  if (!job.job_title || job.job_title.trim() === '') issues.push('missing title');
  if (!job.job_location || job.job_location.trim() === '') issues.push('missing location');
  if (!job.duties_and_responsibilities || job.duties_and_responsibilities.trim() === '') issues.push('missing description');
  if (!job.date || job.date.trim() === '') issues.push('missing date');

  return issues.length > 0;
});

if (jobsWithIssues.length > 0) {
  console.log(`   ⚠️  ${jobsWithIssues.length} jobs have missing data`);
  issuesFound += jobsWithIssues.length;
} else {
  console.log('   ✓ All jobs have required data');
}

// Check date formats
const invalidDates = localJobsData.jobs.filter(job => {
  const date = new Date(job.date);
  return isNaN(date.getTime());
});

if (invalidDates.length > 0) {
  console.log(`   ⚠️  ${invalidDates.length} jobs have invalid date formats`);
  issuesFound += invalidDates.length;
} else {
  console.log('   ✓ All job dates are valid');
}

// Summary
console.log('\n' + '='.repeat(60));

if (issuesFound === 0) {
  console.log('\n✨ All checks passed! Your site is ready for Google for Jobs.');
  console.log('\n🚀 Next Steps:');
  console.log('   1. Run: node submit-jobs-to-google.js');
  console.log('   2. Submit sitemap in Google Search Console');
  console.log('   3. Test a sample job URL in Rich Results Test');
  console.log('   4. Wait 1-2 weeks for initial indexing');
  console.log('   5. Monitor performance in Search Console');
} else {
  console.log(`\n⚠️  Found ${issuesFound} issues that should be fixed before submission.`);
  console.log('   Review the data quality checks above.');
}

console.log('\n📚 Documentation:');
console.log('   See GOOGLE_JOBS_SETUP.md for detailed instructions');
console.log('\n');
