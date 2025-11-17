/**
 * Comprehensive URL Indexing Script
 *
 * Indexes ALL URLs from your sitemap to both Google Indexing API and Bing (IndexNow)
 * Tracks which URLs have been indexed and only submits new/changed URLs
 *
 * Usage: npx tsx scripts/index-all-urls.ts [options]
 * Options:
 *   --service=google|bing|both (default: both)
 *   --force (re-index all URLs, ignore tracking)
 *   --reindex-after=30 (re-index URLs older than X days)
 *   --dry-run (show what would be indexed without actually doing it)
 *   --stats (show indexing statistics)
 */

import { createClient } from '@supabase/supabase-js';
import { submitBatchToGoogle } from '../src/lib/google-indexing';
import { submitToIndexNow } from '../src/lib/indexnow';
import {
  loadTrackerData,
  markUrlIndexed,
  getUrlsToIndex,
  getIndexingStats,
} from '../src/lib/indexing-tracker';
import jobsData from '../local-jobs.json';
import { slugify } from '../src/lib/slugify';
import { generatePropertySlug } from '../src/utils/seo';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://newkenyan.com';

interface IndexingOptions {
  service: 'google' | 'bing' | 'both';
  force: boolean;
  reindexAfter?: number;
  dryRun: boolean;
  showStats: boolean;
}

/**
 * Parse command line arguments
 */
function parseArgs(): IndexingOptions {
  const args = process.argv.slice(2);
  const options: IndexingOptions = {
    service: 'both',
    force: false,
    dryRun: false,
    showStats: false,
  };

  for (const arg of args) {
    if (arg.startsWith('--service=')) {
      options.service = arg.split('=')[1] as 'google' | 'bing' | 'both';
    } else if (arg === '--force') {
      options.force = true;
    } else if (arg.startsWith('--reindex-after=')) {
      options.reindexAfter = parseInt(arg.split('=')[1]);
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--stats') {
      options.showStats = true;
    }
  }

  return options;
}

/**
 * Auto-discover all static app routes from file system
 */
function getAppRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const routes: string[] = [];

  function scanDirectory(dir: string, currentPath: string = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        // Skip special Next.js folders and files
        if (
          entry.name.startsWith('_') ||
          entry.name.startsWith('.') ||
          entry.name === 'api' ||
          entry.name === 'components' ||
          entry.name.includes('[') ||
          entry.name.includes(']')
        ) {
          continue;
        }

        const fullPath = path.join(dir, entry.name);
        const routePath = currentPath ? `${currentPath}/${entry.name}` : entry.name;

        if (entry.isDirectory()) {
          // Check if directory has a page.tsx or page.ts file
          const hasPage =
            fs.existsSync(path.join(fullPath, 'page.tsx')) ||
            fs.existsSync(path.join(fullPath, 'page.ts'));

          if (hasPage) {
            routes.push(`/${routePath}`);
          }

          // Recursively scan subdirectories
          scanDirectory(fullPath, routePath);
        }
      }
    } catch (error) {
      console.warn(`Could not scan directory ${dir}:`, error);
    }
  }

  scanDirectory(appDir);
  return routes;
}

/**
 * Generate all URLs from your site
 */
async function generateAllUrls(): Promise<string[]> {
  const urls: string[] = [];

  // 1. Static pages (auto-discovered)
  console.log('📄 Discovering static pages...');
  const staticRoutes = getAppRoutes();
  staticRoutes.forEach(route => {
    urls.push(route === '/' ? BASE_URL : `${BASE_URL}${route}`);
  });
  console.log(`   Found ${staticRoutes.length} static pages`);

  // 2. Job pages
  console.log('💼 Loading job pages...');
  urls.push(`${BASE_URL}/jobs-in-kenya`);
  jobsData.jobs.forEach(job => {
    const slug = slugify(job.job_title);
    urls.push(`${BASE_URL}/jobs-in-kenya/${slug}`);
  });
  console.log(`   Found ${jobsData.jobs.length} job pages`);

  // 3. Property pages from Supabase
  console.log('🏠 Loading property pages...');
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: properties } = await supabase
      .from('property_listings')
      .select('id, property_title, property_type, city, bedrooms, price_type')
      .eq('is_approved', true);

    if (properties) {
      properties.forEach(property => {
        const slug = generatePropertySlug(
          property.property_title,
          property.property_type,
          property.city,
          property.bedrooms,
          property.price_type
        );
        urls.push(`${BASE_URL}/properties/${slug}`);
      });
      console.log(`   Found ${properties.length} property pages`);
    }

    // 4. Business pages
    console.log('🏢 Loading business pages...');
    const { data: businesses } = await supabase
      .from('business_listings')
      .select('id')
      .eq('is_approved', true);

    if (businesses) {
      businesses.forEach(business => {
        urls.push(`${BASE_URL}/business/${business.id}`);
      });
      console.log(`   Found ${businesses.length} business pages`);
    }

    // 5. Location-based property pages
    console.log('📍 Loading location pages...');
    const { data: locations } = await supabase
      .from('locations')
      .select('slug')
      .eq('is_active', true);

    if (locations) {
      const propertyRoutes = [
        'houses-for-sale', 'houses-for-rent', 'apartments-for-sale', 'apartments-for-rent',
        '2-bedroom-houses-for-rent', '2-bedroom-houses-for-sale',
        '3-bedroom-houses-for-rent', '3-bedroom-houses-for-sale',
        '4-bedroom-houses-for-rent', '4-bedroom-houses-for-sale',
        '5-bedroom-houses-for-rent', '5-bedroom-houses-for-sale',
        'bedsitters-for-rent', 'bungalows-for-rent', 'bungalows-for-sale',
        'commercial-properties-for-rent', 'commercial-properties-for-sale',
        'container-houses-for-sale', 'land-for-sale',
        'maisonettes-for-rent', 'maisonettes-for-sale',
        'office-space-for-rent', 'serviced-apartments-for-rent',
        'shops-for-rent', 'shops-for-sale',
        'studio-apartments-for-rent', 'studio-apartments-for-sale',
        'townhouses-for-rent', 'townhouses-for-sale',
        'villas-for-rent', 'villas-for-sale',
        'warehouses-for-rent', 'warehouses-for-sale'
      ];

      locations.forEach(location => {
        propertyRoutes.forEach(route => {
          urls.push(`${BASE_URL}/${route}/${location.slug}`);
        });
      });
      console.log(`   Found ${locations.length * propertyRoutes.length} location pages`);
    }

    // 6. Blog posts
    console.log('📝 Loading blog posts...');
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
    if (fs.existsSync(blogDir)) {
      const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
      blogFiles.forEach(file => {
        const slug = file.replace('.md', '');
        urls.push(`${BASE_URL}/blog/${slug}`);
      });
      console.log(`   Found ${blogFiles.length} blog posts`);
    }

  } catch (error) {
    console.error('Error fetching dynamic URLs:', error);
  }

  // 7. Important sitemaps
  urls.push(`${BASE_URL}/sitemap.xml`);
  urls.push(`${BASE_URL}/jobs-sitemap.xml`);

  return urls;
}

/**
 * Index URLs to Google
 */
async function indexToGoogle(urls: string[], dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log(`\n[DRY RUN] Would index ${urls.length} URLs to Google`);
    return;
  }

  console.log(`\n🔵 Indexing ${urls.length} URLs to Google...`);

  // Google has rate limits: 200 requests per minute
  // We'll use 1 second delay between requests (60 per minute to be safe)
  const results = await submitBatchToGoogle(urls, 1000);

  // Track results
  results.forEach(result => {
    markUrlIndexed('google', result.url, result.success, result.error);
  });

  const successful = results.filter(r => r.success).length;
  console.log(`✅ Google: ${successful}/${urls.length} URLs indexed successfully`);
}

/**
 * Index URLs to Bing via IndexNow
 */
async function indexToBing(urls: string[], dryRun: boolean): Promise<void> {
  if (dryRun) {
    console.log(`\n[DRY RUN] Would index ${urls.length} URLs to Bing`);
    return;
  }

  console.log(`\n🟦 Indexing ${urls.length} URLs to Bing (IndexNow)...`);

  // IndexNow accepts up to 10,000 URLs per request
  const BATCH_SIZE = 100;
  let successCount = 0;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`   Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} URLs`);

    const success = await submitToIndexNow(batch);

    // Track results
    batch.forEach(url => {
      markUrlIndexed('bing', url, success);
    });

    if (success) successCount += batch.length;

    // Small delay between batches
    if (i + BATCH_SIZE < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log(`✅ Bing: ${successCount}/${urls.length} URLs indexed successfully`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 NewKenyan.com - Comprehensive URL Indexing\n');

  const options = parseArgs();

  // Show stats if requested
  if (options.showStats) {
    const stats = getIndexingStats();
    console.log('📊 Indexing Statistics:');
    console.log(`   Total URLs tracked: ${stats.total}`);
    console.log(`   Google: ${stats.google.indexed} indexed, ${stats.google.failed} failed, ${stats.google.pending} pending`);
    console.log(`   Bing: ${stats.bing.indexed} indexed, ${stats.bing.failed} failed, ${stats.bing.pending} pending`);
    console.log('');
  }

  console.log('⚙️  Configuration:');
  console.log(`   Service: ${options.service}`);
  console.log(`   Force re-index: ${options.force}`);
  console.log(`   Re-index after: ${options.reindexAfter || 'never'} days`);
  console.log(`   Dry run: ${options.dryRun}`);
  console.log('');

  // Generate all URLs
  console.log('🔍 Collecting all URLs from site...\n');
  const allUrls = await generateAllUrls();
  console.log(`\n📊 Total URLs found: ${allUrls.length}\n`);

  // Determine which URLs need indexing
  let googleUrls: string[] = [];
  let bingUrls: string[] = [];

  if (options.force) {
    console.log('⚠️  Force mode: Re-indexing ALL URLs\n');
    googleUrls = options.service === 'google' || options.service === 'both' ? allUrls : [];
    bingUrls = options.service === 'bing' || options.service === 'both' ? allUrls : [];
  } else {
    if (options.service === 'google' || options.service === 'both') {
      googleUrls = getUrlsToIndex(allUrls, 'google', options.reindexAfter);
      console.log(`🔵 Google: ${googleUrls.length} URLs need indexing`);
    }

    if (options.service === 'bing' || options.service === 'both') {
      bingUrls = getUrlsToIndex(allUrls, 'bing', options.reindexAfter);
      console.log(`🟦 Bing: ${bingUrls.length} URLs need indexing`);
    }
  }

  // Index to services
  if (googleUrls.length > 0) {
    await indexToGoogle(googleUrls, options.dryRun);
  } else if (options.service === 'google' || options.service === 'both') {
    console.log('\n✅ Google: All URLs already indexed');
  }

  if (bingUrls.length > 0) {
    await indexToBing(bingUrls, options.dryRun);
  } else if (options.service === 'bing' || options.service === 'both') {
    console.log('\n✅ Bing: All URLs already indexed');
  }

  // Final stats
  if (!options.dryRun && (googleUrls.length > 0 || bingUrls.length > 0)) {
    console.log('\n📊 Updated Statistics:');
    const finalStats = getIndexingStats();
    console.log(`   Total URLs tracked: ${finalStats.total}`);
    console.log(`   Google: ${finalStats.google.indexed} indexed, ${finalStats.google.failed} failed, ${finalStats.google.pending} pending`);
    console.log(`   Bing: ${finalStats.bing.indexed} indexed, ${finalStats.bing.failed} failed, ${finalStats.bing.pending} pending`);
  }

  console.log('\n✨ Indexing complete!\n');

  console.log('💡 Tips:');
  console.log('   • Run daily to index new content: npx tsx scripts/index-all-urls.ts');
  console.log('   • Re-index old URLs: npx tsx scripts/index-all-urls.ts --reindex-after=30');
  console.log('   • Force re-index everything: npx tsx scripts/index-all-urls.ts --force');
  console.log('   • Check stats only: npx tsx scripts/index-all-urls.ts --stats');
  console.log('');
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
