# Property Data Coverage Checklist
**NewKenyan.co.ke Property Listings Database**

This document outlines ALL property types and filterable categories in the system. Use this as a reference when uploading property data to ensure complete coverage across all listings.

---

## 📊 Quick Overview

**Total Property Type Categories:** 24
**Total Listing Type Combinations:** 42 (some types are sale-only or rent-only)

---

## 🏘️ RESIDENTIAL PROPERTIES

### 1️⃣ Houses (For Sale & Rent)
- **Database field:** `property_type` LIKE '%house%'
- **Listing types:** For Sale, For Rent
- **Bedroom variations to cover:**
  - 2 Bedroom Houses (High demand ⭐⭐⭐⭐⭐)
  - 3 Bedroom Houses (High demand ⭐⭐⭐⭐⭐)
  - 4 Bedroom Houses (High demand ⭐⭐⭐⭐)
  - 5 Bedroom Houses (Medium demand ⭐⭐⭐)
- **Routes:**
  - `/houses-for-sale/[location]`
  - `/houses-for-rent/[location]`
  - `/2-bedroom-houses-for-sale/[location]`
  - `/2-bedroom-houses-for-rent/[location]`
  - `/3-bedroom-houses-for-sale/[location]`
  - `/3-bedroom-houses-for-rent/[location]`
  - `/4-bedroom-houses-for-sale/[location]`
  - `/4-bedroom-houses-for-rent/[location]`
  - `/5-bedroom-houses-for-sale/[location]`
  - `/5-bedroom-houses-for-rent/[location]`

### 2️⃣ Apartments (For Sale & Rent)
- **Database field:** `property_type` LIKE '%apartment%'
- **Listing types:** For Sale, For Rent
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Average rental yield:** 7.5% (KNBS 2023-24)
- **Routes:**
  - `/apartments-for-sale/[location]`
  - `/apartments-for-rent/[location]`
- **Common search terms:** apartments, flats, apartment unit, condo

### 3️⃣ Studio Apartments (For Sale & Rent)
- **Database field:** `property_type` LIKE '%studio%'
- **Listing types:** For Sale, For Rent
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Average rental yield:** 2.2%
- **Routes:**
  - `/studio-apartments-for-sale/[location]`
  - `/studio-apartments-for-rent/[location]`
- **Target audience:** Singles, young professionals
- **Common search terms:** studio, studio apartment, single room, bachelor pad

### 4️⃣ Bedsitters (For Rent ONLY)
- **Database field:** `property_type` LIKE '%bedsitter%' OR LIKE '%bed sitter%' OR LIKE '%single room%'
- **Listing types:** For Rent ONLY (typically not sold)
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Average rental yield:** 2.2%
- **Routes:**
  - `/bedsitters-for-rent/[location]`
- **Target audience:** Students, budget-conscious renters
- **Common search terms:** bedsitter, bed sitter, single room, SQ, servants quarter

### 5️⃣ Bungalows (For Sale & Rent)
- **Database field:** `property_type` LIKE '%bungalow%'
- **Listing types:** For Sale, For Rent
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Routes:**
  - `/bungalows-for-sale/[location]`
  - `/bungalows-for-rent/[location]`
- **Description:** Single-story homes
- **Common search terms:** bungalow, single storey, one floor house

### 6️⃣ Maisonettes (For Sale & Rent)
- **Database field:** `property_type` LIKE '%maisonette%'
- **Listing types:** For Sale, For Rent
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Routes:**
  - `/maisonettes-for-sale/[location]`
  - `/maisonettes-for-rent/[location]`
- **Description:** Multi-level homes with modern designs
- **Common search terms:** maisonette, duplex, double storey, two storey house

### 7️⃣ Townhouses (For Sale & Rent)
- **Database field:** `property_type` LIKE '%townhouse%' OR LIKE '%town house%'
- **Listing types:** For Sale, For Rent
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Average rental yield:** 8.3% ⭐ HIGHEST RETURNS (KNBS)
- **Routes:**
  - `/townhouses-for-sale/[location]`
  - `/townhouses-for-rent/[location]`
- **Investment highlight:** Best ROI in residential category
- **Common search terms:** townhouse, town house, row house, terraced house

### 8️⃣ Villas (For Sale & Rent)
- **Database field:** `property_type` LIKE '%villa%'
- **Listing types:** For Sale, For Rent
- **Market demand:** High ⭐⭐⭐⭐
- **Routes:**
  - `/villas-for-sale/[location]`
  - `/villas-for-rent/[location]`
- **Description:** Luxury homes in exclusive neighborhoods
- **Common search terms:** villa, luxury home, mansion, executive home

### 9️⃣ Container Houses (For Sale ONLY)
- **Database field:** `property_type` LIKE '%container%house%' OR LIKE '%shipping container%' OR LIKE '%prefab%' OR LIKE '%modular house%'
- **Listing types:** For Sale ONLY
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Routes:**
  - `/container-houses-for-sale/[location]`
- **Key features:** Affordable, quick to build, eco-friendly
- **Common variations:** 3 bedroom, 4 bedroom container houses
- **Common search terms:** container houses, shipping container house, prefab houses, modular houses

### 🔟 Serviced Apartments (For Rent ONLY)
- **Database field:** `property_type` LIKE '%serviced%' OR LIKE '%furnished apartment%'
- **Listing types:** For Rent ONLY (short-term)
- **Market demand:** High ⭐⭐⭐⭐
- **Routes:**
  - `/serviced-apartments-for-rent/[location]`
- **Target audience:** Expats, business travelers, short-stay guests
- **Common search terms:** serviced apartment, furnished apartment, short stay, airbnb

---

## 🏢 COMMERCIAL PROPERTIES

### 1️⃣ Commercial Properties (For Sale & Rent)
- **Database field:** `property_type` LIKE '%commercial%'
- **Listing types:** For Sale, For Rent
- **Market demand:** High ⭐⭐⭐⭐
- **Average rental yield:** 12.0% (Higher than residential)
- **Routes:**
  - `/commercial-properties-for-sale/[location]`
  - `/commercial-properties-for-rent/[location]`
- **Includes:** Offices, retail spaces, mixed-use buildings

### 2️⃣ Office Space (For Rent PRIMARILY)
- **Database field:** `property_type` LIKE '%office%'
- **Listing types:** For Rent (primarily)
- **Market demand:** High ⭐⭐⭐⭐
- **Average rental yield:** 12.0%
- **Routes:**
  - `/office-space-for-rent/[location]`
- **Common search terms:** office space, office to let, office for rent, serviced office

### 3️⃣ Shops (For Sale & Rent)
- **Database field:** `property_type` LIKE '%shop%' OR LIKE '%retail%' OR LIKE '%store%'
- **Listing types:** For Sale, For Rent
- **Market demand:** High ⭐⭐⭐⭐
- **Routes:**
  - `/shops-for-sale/[location]`
  - `/shops-for-rent/[location]`
- **Common search terms:** shop, retail space, store, business premises

### 4️⃣ Warehouses (For Sale & Rent)
- **Database field:** `property_type` LIKE '%warehouse%' OR LIKE '%godown%'
- **Listing types:** For Sale, For Rent
- **Market demand:** Medium ⭐⭐⭐
- **Routes:**
  - `/warehouses-for-sale/[location]`
  - `/warehouses-for-rent/[location]`
- **Description:** Industrial warehouses and storage facilities
- **Common search terms:** warehouse, godown, storage space, industrial warehouse

---

## 🌾 LAND

### Land (For Sale ONLY)
- **Database field:** `property_type` LIKE '%land%' OR LIKE '%plot%'
- **Listing types:** For Sale ONLY
- **Market demand:** Very High ⭐⭐⭐⭐⭐
- **Routes:**
  - `/land-for-sale/[location]`
- **Categories to cover:**
  - Residential plots
  - Commercial land
  - Agricultural land (shamba)
- **Common search terms:** land, plot, acre, shamba, title deed

---

## 📍 LOCATIONS TO COVER

### Location Hierarchy
Your system supports 3 location types:

1. **Counties** (Top level)
   - Example: Nairobi County, Mombasa County, Kiambu County
   - Highest SEO priority

2. **Neighborhoods** (Mid level)
   - Example: Kilimani, Westlands, Karen, Kasarani
   - High search volume for popular areas
   - Parent: County

3. **Estates** (Granular level)
   - Example: Thindigua Estate, Greenspan Estate
   - Parent: Neighborhood or County

### Priority Locations for Complete Data Coverage

#### 🔥 TIER 1 - HIGHEST PRIORITY (Complete coverage essential)
**Nairobi County:**
- Nairobi CBD
- Westlands
- Kilimani
- Karen
- Lavington
- Kileleshwa
- Parklands
- Kasarani
- Ruaka
- Runda
- Muthaiga
- South B/C
- Embakasi
- Donholm
- Buruburu
- Umoja
- Ngong Road areas

**Mombasa:**
- Nyali
- Bamburi
- Diani
- Mombasa CBD
- Shanzu

#### 🔥 TIER 2 - HIGH PRIORITY
**Kiambu County:**
- Kiambu town
- Ruiru
- Thika
- Juja
- Kikuyu
- Limuru

**Other Major Towns:**
- Kisumu
- Nakuru
- Eldoret
- Machakos

#### 🔥 TIER 3 - MEDIUM PRIORITY
- Other 47 counties
- Emerging suburban areas
- Satellite towns

---

## 🎯 DATA UPLOAD STRATEGY

### For Each Property Type:
1. **Ensure property_type field matches the patterns above**
2. **Set correct price_type:** 'sale' or 'rent'
3. **Include bedroom count** for residential properties (critical for filtering)
4. **Add location data:**
   - `city` field
   - `county` field
   - Ensure location slug exists in `locations` table

### Critical Fields for Complete Listings:

```sql
-- Essential fields for every property
property_type      -- MUST match one of the property types above
price_type         -- 'sale' or 'rent'
bedrooms          -- Integer (critical for bedroom-specific searches)
bathrooms         -- Integer
city              -- Text (e.g., 'Nairobi', 'Mombasa')
county            -- Text (e.g., 'Nairobi County', 'Mombasa County')
location          -- Optional, can be neighborhood/estate name
price             -- Decimal
property_title    -- Text
description       -- Text
images            -- Array of URLs
amenities         -- Array of features
is_approved       -- Boolean (must be true for public display)
```

### Recommended Data Distribution:

For each major location (Tier 1), aim to have:
- ✅ At least 5-10 listings per property type
- ✅ Mix of price ranges (budget, mid-range, luxury)
- ✅ Various bedroom configurations (1BR, 2BR, 3BR, 4BR, 5BR)
- ✅ Both sale and rent options (where applicable)

---

## 📋 QUICK REFERENCE: ALL ROUTE COMBINATIONS

### Total Routes: 42 property type combinations × locations

1. `/houses-for-sale/[location]`
2. `/houses-for-rent/[location]`
3. `/apartments-for-sale/[location]`
4. `/apartments-for-rent/[location]`
5. `/2-bedroom-houses-for-sale/[location]`
6. `/2-bedroom-houses-for-rent/[location]`
7. `/3-bedroom-houses-for-sale/[location]`
8. `/3-bedroom-houses-for-rent/[location]`
9. `/4-bedroom-houses-for-sale/[location]`
10. `/4-bedroom-houses-for-rent/[location]`
11. `/5-bedroom-houses-for-sale/[location]`
12. `/5-bedroom-houses-for-rent/[location]`
13. `/bedsitters-for-rent/[location]`
14. `/bungalows-for-sale/[location]`
15. `/bungalows-for-rent/[location]`
16. `/maisonettes-for-sale/[location]`
17. `/maisonettes-for-rent/[location]`
18. `/townhouses-for-sale/[location]`
19. `/townhouses-for-rent/[location]`
20. `/villas-for-sale/[location]`
21. `/villas-for-rent/[location]`
22. `/studio-apartments-for-sale/[location]`
23. `/studio-apartments-for-rent/[location]`
24. `/container-houses-for-sale/[location]`
25. `/serviced-apartments-for-rent/[location]`
26. `/commercial-properties-for-sale/[location]`
27. `/commercial-properties-for-rent/[location]`
28. `/office-space-for-rent/[location]`
29. `/shops-for-sale/[location]`
30. `/shops-for-rent/[location]`
31. `/warehouses-for-sale/[location]`
32. `/warehouses-for-rent/[location]`
33. `/land-for-sale/[location]`

---

## 🔍 SEARCH FILTERS IN THE SYSTEM

Your property filtering supports:

### Primary Filters:
- ✅ **Property Type** (24 types listed above)
- ✅ **Listing Type** (For Sale / For Rent)
- ✅ **Location** (County / Neighborhood / Estate)
- ✅ **Bedrooms** (1, 2, 3, 4, 5+)
- ✅ **Price Range**
- ✅ **Bathrooms**
- ✅ **Amenities** (Array field)

### Ensure Data Exists For:
- All combinations of location × property type
- All bedroom ranges in each location
- Various price points in each category

---

## 💡 DATA UPLOAD CHECKLIST

When uploading new property data, check:

- [ ] Property type matches one of the 24 defined types
- [ ] Database query patterns will match (check `dbQuery` field in property-types.ts)
- [ ] Correct price_type ('sale' or 'rent')
- [ ] Bedroom count specified for residential properties
- [ ] Location exists in locations table (county, neighborhood, or estate)
- [ ] City and county fields populated
- [ ] Images array has at least 1 image
- [ ] Amenities array populated
- [ ] is_approved = true (for public display)
- [ ] All required fields filled (title, description, price, contact info)

---

## 📈 HIGH-PRIORITY GAPS TO FILL

Check your current database for these high-demand categories:

1. **Bedsitters in Kasarani** (Very high search volume)
2. **2-bedroom apartments in Kilimani**
3. **3-bedroom houses for rent in Nairobi**
4. **Studio apartments in Westlands**
5. **Townhouses in Kiambu** (8.3% avg yield - best ROI)
6. **Land for sale in all counties**
7. **Container houses** (emerging market)
8. **Commercial properties in CBD areas**

---

## 🗂️ Property Type Quick Reference Table

| Property Type | For Sale | For Rent | Demand | Avg Yield | DB Pattern |
|--------------|----------|----------|--------|-----------|------------|
| Houses | ✅ | ✅ | ⭐⭐⭐⭐⭐ | - | %house% |
| Apartments | ✅ | ✅ | ⭐⭐⭐⭐⭐ | 7.5% | %apartment% |
| Studio Apartments | ✅ | ✅ | ⭐⭐⭐⭐⭐ | 2.2% | %studio% |
| Bedsitters | ❌ | ✅ | ⭐⭐⭐⭐⭐ | 2.2% | %bedsitter% |
| Bungalows | ✅ | ✅ | ⭐⭐⭐⭐⭐ | - | %bungalow% |
| Maisonettes | ✅ | ✅ | ⭐⭐⭐⭐⭐ | - | %maisonette% |
| Townhouses | ✅ | ✅ | ⭐⭐⭐⭐⭐ | 8.3%⭐ | %townhouse% |
| Villas | ✅ | ✅ | ⭐⭐⭐⭐ | - | %villa% |
| Container Houses | ✅ | ❌ | ⭐⭐⭐⭐⭐ | - | %container% |
| Serviced Apartments | ❌ | ✅ | ⭐⭐⭐⭐ | - | %serviced% |
| Commercial | ✅ | ✅ | ⭐⭐⭐⭐ | 12.0% | %commercial% |
| Office Space | ❌ | ✅ | ⭐⭐⭐⭐ | 12.0% | %office% |
| Shops | ✅ | ✅ | ⭐⭐⭐⭐ | - | %shop% |
| Warehouses | ✅ | ✅ | ⭐⭐⭐ | - | %warehouse% |
| Land | ✅ | ❌ | ⭐⭐⭐⭐⭐ | - | %land% |

---

**Last Updated:** 2025-01-06
**Source Files:**
- `src/lib/property-types.ts` - Property type definitions
- `property_listings_schema.sql` - Database schema
- `src/app/sitemap.ts` - All routes
- `supabase/migrations/create_locations_table.sql` - Location structure
