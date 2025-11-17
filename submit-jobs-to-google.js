/**
 * Submit all job URLs to search engines via IndexNow API
 * This notifies Google, Bing, and other search engines about job listings
 *
 * Run with: node submit-jobs-to-google.js
 */

const localJobsData = require('./local-jobs.json');
const { slugify } = require('./src/lib/slugify');

const BASE_URL = 'https://newkenyan.com';
const INDEXNOW_ENDPOINT = `${BASE_URL}/api/indexnow`;
const BATCH_SIZE = 100; // Submit in batches to avoid overwhelming the API

// Generate all job URLs
function generateJobUrls() {
  const urls = [];

  // Add main jobs page
  urls.push(`${BASE_URL}/jobs-in-kenya`);

  // Add all individual job pages
  localJobsData.jobs.forEach((job) => {
    const slug = slugify(job.job_title);
    urls.push(`${BASE_URL}/jobs-in-kenya/${slug}`);
  });

  // Add jobs sitemap
  urls.push(`${BASE_URL}/jobs-sitemap.xml`);

  return urls;
}

// Submit URLs in batches
async function submitUrlsInBatches(urls) {
  console.log(`\n📊 Total URLs to submit: ${urls.length}`);
  console.log(`📦 Batch size: ${BATCH_SIZE}\n`);

  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`🔄 Submitting ${batches.length} batches...\n`);

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`📤 Submitting batch ${i + 1}/${batches.length} (${batch.length} URLs)...`);

    try {
      const response = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: batch }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Batch ${i + 1} submitted successfully:`, data.message);
      } else {
        const error = await response.text();
        console.error(`❌ Batch ${i + 1} failed:`, error);
      }

      // Add a small delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ Error submitting batch ${i + 1}:`, error.message);
    }
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting job URL submission to Google Jobs via IndexNow...\n');
  console.log(`📋 Jobs found in local-jobs.json: ${localJobsData.total_jobs}`);
  console.log(`📅 Last updated: ${localJobsData.updated_at}\n`);

  const urls = generateJobUrls();
  await submitUrlsInBatches(urls);

  console.log('\n✨ Submission complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Submit sitemap to Google Search Console: https://search.google.com/search-console');
  console.log('2. Add sitemap URL: https://newkenyan.com/jobs-sitemap.xml');
  console.log('3. Request indexing for main jobs page: https://newkenyan.com/jobs-in-kenya');
  console.log('4. Monitor indexing status in Google Search Console');
  console.log('5. Check Google Jobs integration: https://search.google.com/test/rich-results');
  console.log('\n💡 Google for Jobs requirements:');
  console.log('- ✓ JobPosting structured data on all job pages');
  console.log('- ✓ Valid sitemap with all job URLs');
  console.log('- ✓ Jobs updated regularly (currently: ' + localJobsData.last_scrape_added + ' new jobs)');
  console.log('- ✓ Each job has title, location, description, date posted');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generateJobUrls, submitUrlsInBatches };
