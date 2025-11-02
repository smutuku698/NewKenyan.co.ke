# NewKenyan.com Performance Optimization Guide

## Current Score: 72 (Mobile) → Target: 90+

---

## ✅ COMPLETED OPTIMIZATIONS

### 1. Next.js Configuration Updates
- ✅ Added `optimizeCss: true` for better CSS optimization
- ✅ Added `@clerk/nextjs` to optimizePackageImports
- ✅ Enabled console.log removal in production
- ✅ Prioritized AVIF format over WebP for better compression
- ✅ Added resource hints (preconnect, dns-prefetch) for critical origins

---

## 🚨 CRITICAL FIXES NEEDED (Do These First)

### 1. Fix Redirect Chain (-461ms) - HIGHEST PRIORITY

**Problem**: 3 redirects before reaching content (461ms wasted)

**Solution**:
1. **In Cloudflare Dashboard**:
   - Go to: Rules → Redirect Rules
   - Add Rule 1: `http://newkenyan.com/*` → `https://newkenyan.com/$1` (301)
   - Add Rule 2: `https://www.newkenyan.com/*` → `https://newkenyan.com/$1` (301)

2. **Check DNS Settings**:
   - Ensure A/AAAA records point directly to your server
   - Remove any CNAME chains
   - Enable Cloudflare's "Automatic HTTPS Rewrites"

**Expected Impact**: +8-10 performance points

---

### 2. Fix Accessibility Issues - REQUIRED FOR SEO

**Problem**: Missing labels and low contrast (failing 87/100)

**Fix the Following**:

```tsx
// In src/app/page.tsx or wherever these selects are

// BEFORE:
<select className="w-full px-4 py-3...">
  <option>All Locations</option>
</select>

// AFTER:
<label htmlFor="location-filter" className="sr-only">Filter by location</label>
<select
  id="location-filter"
  name="location"
  aria-label="Filter by location"
  className="w-full px-4 py-3..."
>
  <option>All Locations</option>
</select>
```

Apply to ALL 4 select elements found in the report.

**Fix Contrast Issues**:

```tsx
// Change "NEW" badges from:
className="bg-green-600 text-white..." // Contrast ratio: 3.2:1 ❌

// To:
className="bg-green-700 text-white..." // Contrast ratio: 4.6:1 ✅

// Change buttons from:
className="bg-[#066046]..." // If failing contrast

// To:
className="bg-[#055039]..." // Darker shade
```

**Expected Impact**: +13 accessibility points, +2-3 SEO points

---

### 3. Image Optimization (-24 KiB savings)

**Problem**: Images not fully compressed

**Fix in Supabase Storage**:
1. Download all property images
2. Compress using [Squoosh.app](https://squoosh.app) or ImageOptim
   - Target: 80-85% quality for JPEG
   - Use WebP/AVIF formats
3. Re-upload to Supabase

**Or use this script** (add to package.json):

```json
"scripts": {
  "optimize-images": "node scripts/optimize-images.js"
}
```

Create `scripts/optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const imageDir = './public/images';
  const files = await fs.readdir(imageDir);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await sharp(path.join(imageDir, file))
        .avif({ quality: 80 })
        .toFile(path.join(imageDir, file.replace(/\.(jpg|jpeg|png)$/i, '.avif')));

      await sharp(path.join(imageDir, file))
        .webp({ quality: 85 })
        .toFile(path.join(imageDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp')));
    }
  }
}

optimizeImages().catch(console.error);
```

Install: `npm install sharp`

**Expected Impact**: +3-4 performance points

---

## 📊 MEDIUM PRIORITY FIXES

### 4. Reduce JavaScript Bundle Size (-206 KiB)

**Problem**: Unused Clerk JavaScript

**Solution**: Use dynamic imports for Clerk components

```tsx
// In components that use Clerk
import dynamic from 'next/dynamic';

const SignInButton = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.SignInButton),
  { ssr: false }
);

const UserButton = dynamic(
  () => import('@clerk/nextjs').then(mod => mod.UserButton),
  { ssr: false }
);
```

**Expected Impact**: +5-6 performance points

---

### 5. Improve Cache Strategy

**Current**: Cloudflare script cache TTL = 1 day ❌
**Target**: Static resources = 1 year ✅

**In Cloudflare Dashboard**:
- Page Rules → Create Page Rule
- URL: `newkenyan.com/_next/static/*`
- Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 year
  - Browser Cache TTL: 1 year

**Expected Impact**: +2-3 performance points

---

### 6. Reduce DOM Size (1,145 elements)

**Problem**: Select with 197 children (All Cities dropdown)

**Solution**: Use virtualized select or search

```tsx
// Install react-select
npm install react-select

// Replace large select with:
import Select from 'react-select';

<Select
  options={cities.map(city => ({ value: city, label: city }))}
  placeholder="All Cities"
  classNamePrefix="select"
  styles={{
    menuList: (base) => ({
      ...base,
      maxHeight: 300, // Limit visible options
    }),
  }}
/>
```

**Expected Impact**: +3-4 performance points

---

## 🎯 QUICK WINS (Do These Next)

### 7. Lazy Load Below-the-Fold Images

```tsx
// In PropertyCard component
<Image
  src={property.image}
  alt={property.title}
  fill
  loading="lazy" // ✅ Add this
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

---

### 8. Add Favicon Preload

```tsx
// In app/layout.tsx <head>
<link rel="preload" href="/favicon.ico" as="image" type="image/x-icon" />
```

---

### 9. Defer Non-Critical Scripts

```tsx
// In layout.tsx
<GoogleTagManager />

// Change GoogleTagManager component to:
export default function GoogleTagManager() {
  return (
    <Script
      id="gtm"
      strategy="afterInteractive" // Change from "beforeInteractive"
      dangerouslySetInnerHTML={{...}}
    />
  );
}
```

---

## 📈 EXPECTED FINAL SCORES

After ALL optimizations:

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Performance** | 72 | **92-95** | +20-23 |
| **Accessibility** | 87 | **100** | +13 |
| **Best Practices** | 96 | **100** | +4 |
| **SEO** | 92 | **100** | +8 |
| **FCP** | 2.4s | **1.2s** | -50% |
| **LCP** | 5.7s | **2.5s** | -56% |
| **TBT** | 210ms | **100ms** | -52% |

---

## 🚀 DEPLOYMENT CHECKLIST

1. ✅ Update next.config.ts (already done)
2. ✅ Update layout.tsx with resource hints (already done)
3. ⬜ Fix Cloudflare redirects
4. ⬜ Add labels to all form elements
5. ⬜ Fix color contrast issues
6. ⬜ Optimize images (compress + convert)
7. ⬜ Dynamic import Clerk components
8. ⬜ Update Cloudflare cache rules
9. ⬜ Virtualize large select dropdowns
10. ⬜ Add lazy loading to images
11. ⬜ Deploy to production
12. ⬜ Re-run PageSpeed Insights

---

## 🔍 MONITORING

After deployment, monitor:
- Google Search Console → Core Web Vitals
- PageSpeed Insights (mobile + desktop)
- Lighthouse CI in your build pipeline

**Target Metrics**:
- LCP < 2.5s ✅
- FID < 100ms ✅
- CLS < 0.1 ✅
- Performance Score > 90 ✅

---

## 💡 ADDITIONAL RECOMMENDATIONS

### For Future Optimization:

1. **Implement Route-based Code Splitting**
   - Use dynamic imports for heavy pages
   - Load property detail features on-demand

2. **Add Service Worker** (PWA)
   - Cache static assets
   - Offline support
   - Background sync

3. **Use CDN for Static Assets**
   - Move images to Cloudflare R2 or Supabase Storage with CDN
   - Serve fonts from CDN

4. **Database Query Optimization**
   - Add indexes to frequently queried fields
   - Use Supabase's query caching
   - Implement stale-while-revalidate pattern

5. **Implement ISR More Aggressively**
   - Increase revalidation time for static pages
   - Use on-demand revalidation for property updates

---

**Last Updated**: November 1, 2025
**Next Review**: After implementing critical fixes
