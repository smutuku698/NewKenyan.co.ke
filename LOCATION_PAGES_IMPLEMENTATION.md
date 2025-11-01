# Location-Based Property Pages Implementation Guide

## Overview
This implementation creates SEO-optimized location pages for houses and apartments across Kenya using dynamic routes. Each location gets 4 unique pages:
- Houses for Sale
- Houses for Rent
- Apartments for Sale
- Apartments for Rent

## Total Pages Created
- **47 Counties** × 4 = 188 pages
- **~87 Nairobi Areas** × 4 = ~348 pages
- **~25 Mombasa Areas** × 4 = ~100 pages
- **Total: ~636+ dynamic pages**

## Implementation Steps

### 1. Create the Locations Table in Supabase

**Run the migration:**
```bash
# Option A: Using Supabase CLI (recommended)
supabase migration up

# Option B: Manually execute the SQL
# Open supabase/migrations/create_locations_table.sql in Supabase SQL Editor and run it
```

The migration creates:
- `locations` table with columns: id, name, slug, type, parent_id, city, county, description, meta_content, coordinates, is_active
- Indexes for optimal query performance
- Auto-update trigger for `updated_at` timestamp

### 2. Populate Location Data

**Run the population script:**
```bash
node scripts/populate-locations.js
```

This script will:
- Insert all 47 Kenya counties
- Insert Nairobi neighborhoods (87 areas)
- Insert Nairobi estates (46 estates)
- Insert Mombasa neighborhoods (25 areas)
- Generate unique slugs for each location
- Create SEO metadata templates

**Expected Output:**
```
Total counties: 47
Total Nairobi neighborhoods: 87
Total Nairobi estates: 46
Total Mombasa neighborhoods: 25
Grand Total: 205 locations
```

### 3. Verify Implementation

**Test the routes:**
- Visit: `/houses-for-sale/nairobi-county`
- Visit: `/apartments-for-rent/westlands-nairobi`
- Visit: `/houses-for-sale/buruburu-estate-nairobi`
- Visit: `/apartments-for-sale/bamburi-mombasa`

Each page should display:
- Unique H1 heading
- Dynamic property stats (count, price range)
- Filtered property listings
- Location-specific content
- Breadcrumbs
- Schema.org structured data

### 4. Test Sitemap Generation

```bash
# Development
npm run dev

# Visit: http://localhost:3000/sitemap.xml
# You should see all location pages listed
```

### 5. Verify SEO Elements

For each page, verify:
- ✅ Unique title tags
- ✅ Unique meta descriptions with real data
- ✅ Unique H1 tags (4 variations)
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Schema.org JSON-LD

## URL Structure

### Counties
```
/houses-for-sale/nairobi-county
/houses-for-rent/nairobi-county
/apartments-for-sale/nairobi-county
/apartments-for-rent/nairobi-county
```

### Neighborhoods
```
/houses-for-sale/westlands-nairobi
/houses-for-rent/kileleshwa-nairobi
/apartments-for-sale/westlands-nairobi
/apartments-for-rent/kilimani-nairobi
```

### Estates
```
/houses-for-sale/buruburu-estate-nairobi
/houses-for-rent/garden-estate-nairobi
/apartments-for-sale/nasra-gardens-estate-nairobi
/apartments-for-rent/city-park-estate-nairobi
```

## SEO Features

### Unique Title Templates

**County Level:**
- Houses Sale: `{Count} Houses for Sale in {County} County, Kenya | Buy Homes in {County}`
- Houses Rent: `Houses for Rent in {County} County - {Count}+ Rental Homes Available`
- Apartments Sale: `Apartments for Sale in {County} County | {Count}+ Flats & Units`
- Apartments Rent: `Apartments for Rent in {County} County, Kenya - Find Your Next Home`

**Neighborhood Level:**
- Uses real price data: `Houses for Sale in {Neighborhood}, {City} | {Count} Homes from KES {MinPrice}`
- Dynamic counts and pricing

**Estate Level:**
- Emphasizes gated community features
- Includes estate-specific amenities

### Unique H1 Variations

Each location gets one of 4 H1 variations (based on location ID hash):
1. `{Property Type} for {Sale/Rent} in {Location}`
2. `Find {Property Type} for {Sale/Rent} in {Location}, Kenya`
3. `Best {Property Type} for {Sale/Rent} in {Location}`
4. `{Location} {Property Type} for {Sale/Rent} - Verified Listings`

### Dynamic Meta Descriptions

Includes:
- Actual property count
- Real price ranges (min, max, average)
- Popular amenities from actual listings
- Location-specific features
- Call to action

## Property Filtering Logic

### County Pages
```typescript
query.eq('county', location.name)
```
Shows all properties in the county.

### Neighborhood Pages
```typescript
query.eq('county', location.county)
  .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`)
```
Shows properties where city or address matches the neighborhood name.

### Estate Pages
```typescript
query.eq('county', location.county)
  .ilike('address', `%${location.name}%`)
```
Shows properties with estate name in the address.

## Files Created

### Migration
- `supabase/migrations/create_locations_table.sql`

### Scripts
- `scripts/populate-locations.js`

### Utilities
- `src/lib/location-seo.ts` - SEO metadata generation functions

### Dynamic Routes
- `src/app/houses-for-sale/[location]/page.tsx`
- `src/app/houses-for-rent/[location]/page.tsx`
- `src/app/apartments-for-sale/[location]/page.tsx`
- `src/app/apartments-for-rent/[location]/page.tsx`

### Updated Files
- `src/app/sitemap.ts` - Now includes all location pages

## Adding More Locations

To add more locations (e.g., Kisumu neighborhoods):

1. Edit `scripts/populate-locations.js`
2. Add your location array:
```javascript
const kisumuNeighborhoods = [
  'Milimani', 'Migosi', 'Tom Mboya', 'Kondele', 'Nyalenda'
];
```

3. Add population logic:
```javascript
const kisumuCounty = insertedCounties.find(c => c.name === 'Kisumu');
const kisumuNeighborhoodData = kisumuNeighborhoods.map(neighborhood => ({
  name: neighborhood,
  slug: createSlug(neighborhood, 'kisumu'),
  type: 'neighborhood',
  parent_id: kisumuCounty.id,
  city: 'Kisumu',
  county: 'Kisumu',
  description: generateNeighborhoodDescription(neighborhood, 'Kisumu'),
  meta_content: generateMetaContent(neighborhood, 'neighborhood', 'Kisumu', 'Kisumu'),
  is_active: true
}));
```

4. Run the script again

## Performance Optimization

### Caching
- Next.js automatically caches these pages
- Use ISR (Incremental Static Regeneration) for better performance

### Database Indexes
All necessary indexes are created by the migration:
- `idx_locations_slug` - Fast slug lookups
- `idx_locations_type` - Filter by location type
- `idx_locations_county` - County-based queries
- `idx_locations_is_active` - Active locations only

## SEO Best Practices

### Canonical URLs
Each page has a unique canonical URL:
```
https://newkenyan.com/houses-for-sale/westlands-nairobi
```

### Robots.txt
Pages with `is_active: false` are automatically noindexed.

### Sitemap Priority
- County pages: 0.85
- Neighborhood/Estate pages: 0.80
- Updated daily

### Internal Linking
Breadcrumbs provide hierarchical linking:
```
Home > Houses for Sale > Nairobi > Westlands
```

## Content Uniqueness Strategy

### County Pages
- Overview of entire county
- Major cities/towns in county
- Economic activities
- Investment opportunities

### Neighborhood Pages
- Specific area characteristics
- Nearby amenities (schools, hospitals, malls)
- Transportation links
- Community vibe

### Estate Pages
- Estate-specific features
- Security, amenities
- Developer info
- Estate rules/fees

## Troubleshooting

### Pages Return 404
- Verify locations table exists in Supabase
- Check that locations have `is_active: true`
- Verify slug format matches route structure

### No Properties Showing
- Check property filtering logic
- Verify properties have correct county/city/address fields
- Check property approval status

### SEO Metadata Not Showing
- Verify `generateLocationMetadata()` is being called
- Check that location data includes `meta_content`
- Inspect page source for meta tags

### Sitemap Not Updating
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check Supabase connection

## Maintenance

### Regular Updates
- Add new locations as needed
- Update location descriptions periodically
- Monitor property counts per location
- Update meta templates based on SEO performance

### Analytics Tracking
Monitor these metrics:
- Page views per location
- Bounce rate by location type
- Conversion rate (contact clicks)
- Search rankings for target keywords

## Target Keywords

This implementation targets these high-volume keywords:
- "houses for sale in nairobi" ✅
- "houses for rent in nairobi" ✅
- "apartments for sale in nairobi" ✅
- "apartments for rent nairobi" ✅
- "apartments for sale in westlands" ✅
- "apartments for sale in kileleshwa" ✅
- "houses for sale in mombasa" ✅
- And 600+ more location combinations

## Next Steps

1. **Run the migration**: Create locations table
2. **Populate data**: Run population script
3. **Test pages**: Visit sample URLs
4. **Verify SEO**: Check meta tags and schema
5. **Submit sitemap**: Submit to Google Search Console
6. **Monitor rankings**: Track keyword positions
7. **Add more locations**: Expand to other counties

## Support

For issues or questions:
1. Check this documentation
2. Review error logs in Supabase
3. Verify environment variables in `.env.local`
4. Test with smaller dataset first

## Success Metrics

After implementation, you should see:
- ✅ 600+ new pages in sitemap
- ✅ Unique SEO metadata on every page
- ✅ Real-time property data on pages
- ✅ Fast page load times (<2s)
- ✅ Mobile-responsive design
- ✅ Schema.org markup validated

---

**Implementation Date**: 2025-10-31
**Last Updated**: 2025-10-31
**Version**: 1.0.0
