# Comprehensive URL Indexing System

Your site now has an advanced indexing system that submits ALL URLs to both **Google Indexing API** and **Bing (IndexNow)**.

## 🎯 What Gets Indexed

The system automatically discovers and indexes:

- ✅ **Static pages** (45 pages) - All app routes
- ✅ **Job listings** (405+ pages) - All job detail pages
- ✅ **Property listings** (1,000+ pages) - All property detail pages
- ✅ **Business listings** (13+ pages) - All business profiles
- ✅ **Location pages** (6,468 pages) - All property type × location combinations
- ✅ **Blog posts** (4+ posts) - All blog articles
- ✅ **Sitemaps** - XML sitemaps for search engines

**Total: ~7,938 URLs indexed automatically!**

## 🚀 Quick Start

### Index Everything (Google + Bing)
```bash
npm run index
```

### Index Only to Google
```bash
npm run index:google
```

### Index Only to Bing
```bash
npm run index:bing
```

### Check Stats (No Indexing)
```bash
npm run index:stats
```

### Dry Run (See What Would Happen)
```bash
npm run index:dry-run
```

### Force Re-index Everything
```bash
npm run index:force
```

## 📊 How It Works

### Smart Tracking System

The system maintains a tracking file (`indexing-tracker.json`) that records:
- Which URLs have been indexed
- When they were indexed (timestamps)
- Success/failure status for each service
- How many times each URL has been indexed

### Intelligent Indexing

The script only indexes URLs that:
1. **Haven't been indexed yet** - New content gets indexed immediately
2. **Previously failed** - Retries failed URLs automatically
3. **Are outdated** (optional) - Re-index URLs older than X days

This prevents:
- ❌ Duplicate submissions
- ❌ Wasting API quota
- ❌ Rate limit issues

## 📁 File Structure

```
NewKenyan.co.ke-master/
├── src/lib/
│   ├── google-indexing.ts        # Google Indexing API integration
│   ├── indexnow.ts               # Bing IndexNow integration (existing)
│   └── indexing-tracker.ts       # URL tracking system
├── scripts/
│   └── index-all-urls.ts         # Main indexing script
├── indexnowapi-478503-1a9130d92cc2.json  # Google service account credentials
└── indexing-tracker.json         # Tracking data (auto-generated)
```

## 🔧 Advanced Usage

### Re-index URLs Older Than 30 Days
```bash
npx tsx scripts/index-all-urls.ts --reindex-after=30
```

### Index Only Google with Force
```bash
npx tsx scripts/index-all-urls.ts --service=google --force
```

### Combine Options
```bash
npx tsx scripts/index-all-urls.ts --service=google --reindex-after=7 --dry-run
```

## ⚙️ Configuration Options

| Option | Description | Example |
|--------|-------------|---------|
| `--service=<service>` | Target service: `google`, `bing`, or `both` (default) | `--service=google` |
| `--force` | Re-index all URLs, ignore tracking | `--force` |
| `--reindex-after=<days>` | Re-index URLs older than X days | `--reindex-after=30` |
| `--dry-run` | Show what would be indexed without doing it | `--dry-run` |
| `--stats` | Show indexing statistics only | `--stats` |

## 📈 Monitoring

### View Statistics
```bash
npm run index:stats
```

Shows:
- Total URLs tracked
- Google: indexed, failed, pending
- Bing: indexed, failed, pending

### Sample Output
```
📊 Indexing Statistics:
   Total URLs tracked: 7938
   Google: 5420 indexed, 12 failed, 2506 pending
   Bing: 7850 indexed, 5 failed, 83 pending
```

## 🔄 Recommended Schedule

### Daily (for new content)
```bash
npm run index
```
Indexes only new/changed URLs - fast and efficient!

### Weekly (refresh old content)
```bash
npx tsx scripts/index-all-urls.ts --reindex-after=30
```
Re-indexes URLs older than 30 days

### After Major Updates
```bash
npm run index:force
```
Force re-index everything

## 🌐 Service Differences

### Google Indexing API
- ✅ Direct indexing to Google
- ✅ Faster than waiting for crawlers
- ⚠️ Rate limit: 200 requests/minute
- ⚠️ Requires service account setup
- 🎯 Best for: Important pages, new content

### Bing IndexNow
- ✅ Also notifies Yandex and other search engines
- ✅ No rate limits (10,000 URLs per request)
- ✅ Simple API key authentication
- 🎯 Best for: Bulk submissions

## 🔑 Service Account Setup (Already Done!)

Your Google service account is configured:
- ✅ Service account: `indexnowapi-google@indexnowapi-478503.iam.gserviceaccount.com`
- ✅ Credentials: `indexnowapi-478503-1a9130d92cc2.json`
- ✅ Scope: Google Indexing API

**Important:** Keep the credentials file secure and never commit it to public repos!

## 🎯 Best Practices

### 1. Run Daily for New Content
Set up a daily cron job or GitHub Action:
```bash
npm run index
```

### 2. Monitor Stats Weekly
```bash
npm run index:stats
```

### 3. Handle Failed URLs
Failed URLs are automatically retried on next run.

### 4. Re-index Periodically
```bash
npx tsx scripts/index-all-urls.ts --reindex-after=30
```

### 5. After Content Updates
When you update:
- Job listings
- Property details
- Blog posts
- New pages

Run:
```bash
npm run index
```

## 🐛 Troubleshooting

### "Could not load tracker data"
Normal on first run - creates new tracking file automatically.

### Rate Limit Errors (Google)
The script automatically adds 1-second delays. If you still hit limits:
- Run Google-only indexing separately
- Use `--reindex-after` to reduce URL count

### Authentication Errors (Google)
Check that:
1. `indexnowapi-478503-1a9130d92cc2.json` exists
2. Environment variables are set (if using .env)
3. Service account has Indexing API permissions

### URLs Not Getting Indexed
1. Check if URL is in sitemap
2. Run with `--force` to retry
3. Check stats for errors: `npm run index:stats`

## 📊 Tracking File Format

`indexing-tracker.json` structure:
```json
{
  "lastUpdated": "2025-11-16T...",
  "totalUrls": 7938,
  "urls": {
    "https://newkenyan.com/page": {
      "url": "https://newkenyan.com/page",
      "firstIndexed": "2025-11-16T...",
      "lastIndexed": "2025-11-16T...",
      "indexCount": 1,
      "services": {
        "google": {
          "indexed": true,
          "timestamp": "2025-11-16T...",
          "success": true
        },
        "bing": {
          "indexed": true,
          "timestamp": "2025-11-16T...",
          "success": true
        }
      }
    }
  }
}
```

## 🔄 Automation Ideas

### GitHub Actions (Daily)
```yaml
name: Index URLs
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
jobs:
  index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run index
```

### Cron Job (Linux/Mac)
```bash
# Edit crontab
crontab -e

# Add daily indexing at 2 AM
0 2 * * * cd /path/to/NewKenyan.co.ke-master && npm run index
```

## 📝 API Quotas

### Google Indexing API
- 200 requests per minute
- Default quota: 200/day (can request increase)
- The script respects rate limits with 1s delays

### Bing IndexNow
- No official rate limits
- Up to 10,000 URLs per request
- Unlimited requests

## 🎉 Success Metrics

After running the indexing:

1. **Google Search Console**
   - Check "Coverage" for indexed pages
   - Monitor "Performance" for impressions

2. **Bing Webmaster Tools**
   - Check URL submission status
   - Monitor crawl stats

3. **Your Stats Command**
   ```bash
   npm run index:stats
   ```

## 📞 Support

If you encounter issues:
1. Check this README
2. Review error messages in console
3. Check tracking file: `indexing-tracker.json`
4. Run dry-run to debug: `npm run index:dry-run`

---

**Last Updated:** November 2025
**Total URLs:** ~7,938
**Services:** Google Indexing API + Bing IndexNow
