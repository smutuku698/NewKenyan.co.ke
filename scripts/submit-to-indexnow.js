/**
 * Submit URLs to IndexNow for Instant Indexing
 *
 * This script submits all important pages to IndexNow API
 * which notifies Bing, Yandex, and other search engines instantly
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const INDEXNOW_API_KEY = '4552f861398b42c591437a07760a58e4';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITE_URL = 'https://newkenyan.com';

// How many days before we allow resubmitting the same URL
const RESUBMIT_AFTER_DAYS = 7;

// JSON file to track submissions
const SUBMISSIONS_FILE = path.join(__dirname, '..', 'indexnow-submissions.json');

/**
 * Load submission history from JSON file
 */
function loadSubmissions() {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('⚠️  Could not load submissions file, starting fresh');
  }

  return {
    lastSubmission: null,
    totalSubmitted: 0,
    submissions: []
  };
}

/**
 * Save submission history to JSON file
 */
function saveSubmissions(data) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('❌ Error saving submissions file:', error.message);
    return false;
  }
}

/**
 * Check which URLs have NOT been submitted in the last X days
 * Returns only URLs that are new or haven't been submitted recently
 */
function filterUnsubmittedUrls(urls, submissionsData) {
  if (!urls || urls.length === 0) return urls;

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - RESUBMIT_AFTER_DAYS);

  // Build a map of recently submitted URLs
  const recentlySubmitted = new Map();

  for (const submission of submissionsData.submissions) {
    const submittedDate = new Date(submission.lastSubmittedAt);
    if (submittedDate >= cutoffDate && submission.success) {
      recentlySubmitted.set(submission.url, submission);
    }
  }

  // Filter out recently submitted URLs
  const newUrls = urls.filter(url => !recentlySubmitted.has(url));

  return newUrls;
}

/**
 * Record successful URL submissions to JSON file
 */
function recordSubmissions(urls, success = true, submissionsData) {
  if (!urls || urls.length === 0) return submissionsData;

  const now = new Date().toISOString();

  // Update or add each URL
  for (const url of urls) {
    const existingIndex = submissionsData.submissions.findIndex(s => s.url === url);

    if (existingIndex >= 0) {
      // Update existing entry
      submissionsData.submissions[existingIndex].lastSubmittedAt = now;
      submissionsData.submissions[existingIndex].success = success;
      submissionsData.submissions[existingIndex].submissionCount++;
    } else {
      // Add new entry
      submissionsData.submissions.push({
        url,
        firstSubmittedAt: now,
        lastSubmittedAt: now,
        submissionCount: 1,
        success
      });
    }
  }

  submissionsData.lastSubmission = now;
  submissionsData.totalSubmitted = submissionsData.submissions.filter(s => s.success).length;

  return submissionsData;
}

async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.log('⚠️  No URLs to submit');
    return { success: false, urls: [] };
  }

  const urlsToSubmit = urls.slice(0, 10000); // IndexNow limit

  const payload = {
    host: 'newkenyan.com',
    key: INDEXNOW_API_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_API_KEY}.txt`,
    urlList: urlsToSubmit,
  };

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { success: true, urls: urlsToSubmit };
    } else {
      const text = await response.text();
      console.error(`❌ IndexNow returned status ${response.status}: ${text}`);
      return { success: false, urls: urlsToSubmit };
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    return { success: false, urls: urlsToSubmit };
  }
}

async function submitAllPages() {
  console.log('\n' + '═'.repeat(70));
  console.log('🚀 SUBMITTING PAGES TO INDEXNOW');
  console.log('═'.repeat(70));

  // Load submission history
  let submissionsData = loadSubmissions();
  console.log(`\n📁 Loaded ${submissionsData.submissions.length} URLs from history`);
  if (submissionsData.lastSubmission) {
    console.log(`   Last submission: ${new Date(submissionsData.lastSubmission).toLocaleString()}`);
  }

  const allUrls = [];

  // 1. Homepage and main pages
  console.log('\n1️⃣ Adding main pages...');
  const mainPages = [
    `${SITE_URL}`,
    `${SITE_URL}/properties`,
    `${SITE_URL}/business-directory`,
    `${SITE_URL}/jobs-in-kenya`,
    `${SITE_URL}/real-estate-companies-in-kenya`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/about`,
    `${SITE_URL}/contact`,
    // Standalone pages
    `${SITE_URL}/apartments-for-rent-nairobi`,
    `${SITE_URL}/houses-for-sale-nairobi`,
    `${SITE_URL}/houses-for-rent-kenya`,
    `${SITE_URL}/land-for-sale-kenya`,
    `${SITE_URL}/bedsitter-nairobi`,
    `${SITE_URL}/bedsitter-kasarani`,
    `${SITE_URL}/real-estate-services`,
    `${SITE_URL}/website-services`,
    `${SITE_URL}/construction-cost-calculator-kenya`,
    `${SITE_URL}/mortgage-calculator-kenya`,
    `${SITE_URL}/net-pay-calculator`,
  ];
  allUrls.push(...mainPages);
  console.log(`   Added ${mainPages.length} main pages`);

  // 2. Location pages
  console.log('\n2️⃣ Fetching location pages...');
  const { data: locations } = await supabase
    .from('locations')
    .select('slug')
    .eq('is_active', true)
    .limit(500); // Top 500 locations

  const propertyTypes = [
    'houses-for-sale',
    'houses-for-rent',
    'apartments-for-sale',
    'apartments-for-rent',
    'land-for-sale',
  ];

  locations?.forEach(location => {
    propertyTypes.forEach(type => {
      allUrls.push(`${SITE_URL}/${type}/${location.slug}`);
    });
  });
  console.log(`   Added ${locations?.length * propertyTypes.length || 0} location pages`);

  // 3. Recent properties (last 100)
  console.log('\n3️⃣ Fetching recent property listings...');
  const { data: properties } = await supabase
    .from('property_listings')
    .select('id')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(100);

  properties?.forEach(prop => {
    allUrls.push(`${SITE_URL}/properties/${prop.id}`);
  });
  console.log(`   Added ${properties?.length || 0} property pages`);

  // 4. Blog posts
  console.log('\n4️⃣ Fetching blog posts...');
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true)
    .limit(100);

  blogPosts?.forEach(post => {
    allUrls.push(`${SITE_URL}/blog/${post.slug}`);
  });
  console.log(`   Added ${blogPosts?.length || 0} blog pages`);

  // Filter out recently submitted URLs
  console.log('\n5️⃣ Filtering out recently submitted URLs...');
  console.log(`   Total URLs before filtering: ${allUrls.length}`);

  const urlsToSubmit = filterUnsubmittedUrls(allUrls, submissionsData);

  const skippedCount = allUrls.length - urlsToSubmit.length;
  console.log(`   ✅ New/Updated URLs to submit: ${urlsToSubmit.length}`);
  console.log(`   ⏭️  Skipped (submitted within ${RESUBMIT_AFTER_DAYS} days): ${skippedCount}`);

  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('📊 SUBMISSION SUMMARY');
  console.log('═'.repeat(70));
  console.log(`Total URLs collected: ${allUrls.length}`);
  console.log(`URLs to submit (new/updated): ${urlsToSubmit.length}`);
  console.log(`URLs skipped (recently submitted): ${skippedCount}`);
  console.log(`API Key: ${INDEXNOW_API_KEY}`);
  console.log(`Key Location: ${SITE_URL}/${INDEXNOW_API_KEY}.txt`);

  if (urlsToSubmit.length === 0) {
    console.log('\n✅ All URLs were recently submitted. Nothing to do!');
    console.log(`💡 URLs will be eligible for resubmission after ${RESUBMIT_AFTER_DAYS} days.\n`);
    return;
  }

  // Submit in batches of 10,000 (IndexNow limit)
  const batchSize = 10000;
  let successCount = 0;
  let failCount = 0;

  console.log('\n🔄 Submitting to IndexNow...\n');

  for (let i = 0; i < urlsToSubmit.length; i += batchSize) {
    const batch = urlsToSubmit.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(urlsToSubmit.length / batchSize);

    console.log(`📤 Submitting batch ${batchNum}/${totalBatches} (${batch.length} URLs)...`);

    const result = await submitToIndexNow(batch);

    if (result.success) {
      console.log(`   ✅ Batch ${batchNum} submitted successfully`);
      successCount += batch.length;

      // Record successful submissions
      submissionsData = recordSubmissions(result.urls, true, submissionsData);
      saveSubmissions(submissionsData);
    } else {
      console.log(`   ❌ Batch ${batchNum} failed`);
      failCount += batch.length;

      // Record failed submissions
      submissionsData = recordSubmissions(result.urls, false, submissionsData);
      saveSubmissions(submissionsData);
    }

    // Wait 1 second between batches to avoid rate limiting
    if (i + batchSize < urlsToSubmit.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n' + '═'.repeat(70));
  console.log('✅ SUBMISSION COMPLETE');
  console.log('═'.repeat(70));
  console.log(`✅ Successfully submitted: ${successCount} URLs`);
  console.log(`❌ Failed: ${failCount} URLs`);
  console.log('\n💡 What happens next:');
  console.log('   1. Search engines will be notified instantly');
  console.log('   2. Bing & Yandex will crawl these pages soon');
  console.log('   3. Pages should appear in search results within 24-48 hours');
  console.log('   4. Monitor indexing status in Bing Webmaster Tools');
  console.log(`   5. Skipped URLs can be resubmitted after ${RESUBMIT_AFTER_DAYS} days`);
  console.log(`\n📁 Submission history saved to: indexnow-submissions.json`);
  console.log(`   Total URLs tracked: ${submissionsData.submissions.length}`);
  console.log(`   Successfully submitted (all time): ${submissionsData.totalSubmitted}\n`);
}

if (require.main === module) {
  submitAllPages()
    .then(() => {
      console.log('🎉 Script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { submitAllPages, submitToIndexNow };
