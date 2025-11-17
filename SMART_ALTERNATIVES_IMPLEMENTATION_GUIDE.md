# Smart Alternatives Implementation Guide

## Overview
This guide documents the enhanced smart alternatives logic implementation for property listing pages. The logic provides intelligent alternative property suggestions when user filters return no results.

## Completed Files
1. ✅ `bedsitters-for-rent/[location]/page.tsx` - COMPLETE
2. ✅ `bungalows-for-rent/[location]/page.tsx` - COMPLETE

## Remaining Files (27 files)
The following files need the same updates applied with property-specific configurations:

### Property-Specific Type Files (Rent)
3. `bungalows-for-sale/[location]/page.tsx` - Bungalows, sale, `%bungalow%`
4. `maisonettes-for-rent/[location]/page.tsx` - Maisonettes, rent, `%maisonette%`
5. `maisonettes-for-sale/[location]/page.tsx` - Maisonettes, sale, `%maisonette%`
6. `villas-for-rent/[location]/page.tsx` - Villas, rent, `%villa%`
7. `villas-for-sale/[location]/page.tsx` - Villas, sale, `%villa%`
8. `townhouses-for-rent/[location]/page.tsx` - Townhouses, rent, `%townhouse%`
9. `townhouses-for-sale/[location]/page.tsx` - Townhouses, sale, `%townhouse%`
10. `studio-apartments-for-rent/[location]/page.tsx` - Studios, rent, `%studio%`
11. `studio-apartments-for-sale/[location]/page.tsx` - Studios, sale, `%studio%`

### Bedroom-Specific Files
12. `2-bedroom-houses-for-rent/[location]/page.tsx` - 2-Bedroom Houses, rent, bedroom=2
13. `2-bedroom-houses-for-sale/[location]/page.tsx` - 2-Bedroom Houses, sale, bedroom=2
14. `3-bedroom-houses-for-rent/[location]/page.tsx` - 3-Bedroom Houses, rent, bedroom=3
15. `3-bedroom-houses-for-sale/[location]/page.tsx` - 3-Bedroom Houses, sale, bedroom=3
16. `4-bedroom-houses-for-rent/[location]/page.tsx` - 4-Bedroom Houses, rent, bedroom=4
17. `4-bedroom-houses-for-sale/[location]/page.tsx` - 4-Bedroom Houses, sale, bedroom=4
18. `5-bedroom-houses-for-rent/[location]/page.tsx` - 5-Bedroom Houses, rent, bedroom=5
19. `5-bedroom-houses-for-sale/[location]/page.tsx` - 5-Bedroom Houses, sale, bedroom=5

### Commercial Property Files
20. `commercial-properties-for-rent/[location]/page.tsx` - Commercial Properties, rent, `%commercial%`
21. `commercial-properties-for-sale/[location]/page.tsx` - Commercial Properties, sale, `%commercial%`
22. `office-space-for-rent/[location]/page.tsx` - Office Spaces, rent, `%office%`
23. `shops-for-rent/[location]/page.tsx` - Shops, rent, `%shop%`
24. `shops-for-sale/[location]/page.tsx` - Shops, sale, `%shop%`
25. `warehouses-for-rent/[location]/page.tsx` - Warehouses, rent, `%warehouse%`
26. `warehouses-for-sale/[location]/page.tsx` - Warehouses, sale, `%warehouse%`

### Other Property Files
27. `serviced-apartments-for-rent/[location]/page.tsx` - Serviced Apartments, rent, `%serviced%`
28. `container-houses-for-sale/[location]/page.tsx` - Container Houses, sale, `%container%`
29. `land-for-sale/[location]/page.tsx` - Land, sale, `%land%`

## Implementation Pattern

For each file, apply the following 6 changes:

### Change 1: Update PageProps Interface
Add `searchParams` if not present:

```typescript
interface PageProps {
  params: { location: string };
  searchParams: { [key: string]: string | string[] | undefined };  // ADD THIS LINE
}
```

### Change 2: Update getProperties Function
Add searchParams parameter and filters:

```typescript
async function getProperties(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined }  // ADD THIS PARAMETER
): Promise<PropertyListing[]> {
  // ... existing code ...

  // Build location filters with proper AND logic
  if (location.type === 'county') {
    const countyName = location.name.replace(/ County$/i, '');
    query = query.ilike('county', `%${countyName}%`);

    if (searchParams?.city && typeof searchParams.city === 'string') {
      query = query.or(`city.ilike.%${searchParams.city}%,address.ilike.%${searchParams.city}%`);
    }
  } else if (location.type === 'neighborhood') {
    const countyName = location.county.replace(/ County$/i, '');
    query = query
      .ilike('county', `%${countyName}%`)
      .or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);

    if (searchParams?.city && typeof searchParams.city === 'string' &&
        searchParams.city.toLowerCase() !== location.name.toLowerCase()) {
      query = query.or(`city.ilike.%${searchParams.city}%,address.ilike.%${searchParams.city}%`);
    }
  } else if (location.type === 'estate') {
    const countyName = location.county.replace(/ County$/i, '');
    query = query
      .ilike('county', `%${countyName}%`)
      .ilike('address', `%${location.name}%`);
  }

  // Apply other query parameter filters
  if (searchParams) {
    if (searchParams.bedrooms && typeof searchParams.bedrooms === 'string') {
      const bedrooms = parseInt(searchParams.bedrooms);
      if (!isNaN(bedrooms)) {
        query = query.eq('bedrooms', bedrooms);
      }
    }
    if (searchParams.min_price && typeof searchParams.min_price === 'string') {
      const minPrice = parseInt(searchParams.min_price);
      if (!isNaN(minPrice)) {
        query = query.gte('price', minPrice);
      }
    }
    if (searchParams.max_price && typeof searchParams.max_price === 'string') {
      const maxPrice = parseInt(searchParams.max_price);
      if (!isNaN(maxPrice)) {
        query = query.lte('price', maxPrice);
      }
    }
    if (searchParams.bathrooms && typeof searchParams.bathrooms === 'string') {
      const bathrooms = parseInt(searchParams.bathrooms);
      if (!isNaN(bathrooms)) {
        query = query.gte('bathrooms', bathrooms);
      }
    }
  }

  query = query
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100);  // CHANGE from 12 to 100

  // ... rest of function ...
}
```

### Change 3: Add getSmartAlternatives Function
Insert after `calculateStats` function and before `getAlternativeProperties`:

```typescript
// Get smart alternative properties based on failed filters
async function getSmartAlternatives(
  location: Location,
  searchParams?: { [key: string]: string | string[] | undefined },
  limit: number = 12
): Promise<{
  sameCityDifferentBedrooms: PropertyListing[],
  sameBedroomsDifferentCity: PropertyListing[],
  differentPropertyTypes: PropertyListing[]
}> {
  const countyName = location.county.replace(/ County$/i, '');
  const cityFilter = searchParams?.city as string | undefined;
  const bedroomsFilter = searchParams?.bedrooms ? parseInt(searchParams.bedrooms as string) : undefined;
  const propertyTypeFilter = searchParams?.property_type as string | undefined;

  let sameCityDifferentBedrooms: PropertyListing[] = [];
  let sameBedroomsDifferentCity: PropertyListing[] = [];
  let differentPropertyTypes: PropertyListing[] = [];

  // Query 1 & 2: City and bedroom alternatives
  if (cityFilter && bedroomsFilter && !isNaN(bedroomsFilter)) {
    // Query 1: Same city, different bedrooms
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'TRANSACTION_TYPE')  // REPLACE with 'rent' or 'sale'
      .ilike('property_type', 'DB_QUERY')    // REPLACE with property type query
      .ilike('county', `%${countyName}%`)
      .neq('bedrooms', bedroomsFilter)
      .not('bedrooms', 'is', null);

    if (location.type === 'county') {
      query1 = query1.or(`city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    } else if (location.type === 'neighborhood') {
      query1 = query1.or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%,city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    }

    query1 = query1
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data1 } = await query1;
    sameCityDifferentBedrooms = data1 || [];

    // Query 2: Same bedrooms, different city
    let query2 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'TRANSACTION_TYPE')  // REPLACE
      .ilike('property_type', 'DB_QUERY')    // REPLACE
      .ilike('county', `%${countyName}%`)
      .eq('bedrooms', bedroomsFilter);

    query2 = query2
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data2 } = await query2;
    sameBedroomsDifferentCity = data2 || [];
  } else if (bedroomsFilter && !isNaN(bedroomsFilter)) {
    // Only bedrooms filter
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'TRANSACTION_TYPE')  // REPLACE
      .ilike('property_type', 'DB_QUERY')    // REPLACE
      .ilike('county', `%${countyName}%`)
      .neq('bedrooms', bedroomsFilter)
      .not('bedrooms', 'is', null);

    if (location.type === 'neighborhood') {
      query1 = query1.or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    }

    query1 = query1
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data1 } = await query1;
    sameCityDifferentBedrooms = data1 || [];
  } else if (cityFilter) {
    // Only city filter
    let query1 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'TRANSACTION_TYPE')  // REPLACE
      .ilike('property_type', 'DB_QUERY')    // REPLACE
      .ilike('county', `%${countyName}%`);

    if (location.type === 'county') {
      query1 = query1.or(`city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    }

    query1 = query1
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data1 } = await query1;
    sameCityDifferentBedrooms = data1 || [];
  }

  // Query 3: Different property types
  if (cityFilter || location.type !== 'county') {
    let query3 = supabase
      .from('property_listings')
      .select('*')
      .eq('is_approved', true)
      .eq('price_type', 'TRANSACTION_TYPE')     // REPLACE
      .not('property_type', 'ilike', 'DB_QUERY') // REPLACE with property type filter
      .ilike('county', `%${countyName}%`);

    if (cityFilter && location.type === 'county') {
      query3 = query3.or(`city.ilike.%${cityFilter}%,address.ilike.%${cityFilter}%`);
    } else if (location.type === 'neighborhood') {
      query3 = query3.or(`city.ilike.%${location.name}%,address.ilike.%${location.name}%`);
    }

    if (bedroomsFilter && !isNaN(bedroomsFilter)) {
      query3 = query3.eq('bedrooms', bedroomsFilter);
    }

    query3 = query3
      .order('is_featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    const { data: data3 } = await query3;
    differentPropertyTypes = data3 || [];
  }

  return { sameCityDifferentBedrooms, sameBedroomsDifferentCity, differentPropertyTypes };
}
```

### Change 4: Update generateMetadata
Add searchParams parameter:

```typescript
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  // ... existing code ...
  const properties = await getProperties(location, searchParams);  // ADD searchParams
  // ... rest of function ...
}
```

### Change 5: Update Page Component
Add smart alternatives logic:

```typescript
export default async function PropertyPage({ params, searchParams }: PageProps) {  // ADD searchParams
  // ... existing code ...

  const properties = await getProperties(location, searchParams);  // ADD searchParams
  const stats = calculateStats(properties);
  const relatedLocations = await getRelatedLocations(location);

  // ADD THESE LINES:
  const hasFilters = searchParams?.city || searchParams?.bedrooms || searchParams?.property_type;
  const smartAlternatives = (properties.length === 0 && hasFilters)
    ? await getSmartAlternatives(location, searchParams, 12)
    : { sameCityDifferentBedrooms: [], sameBedroomsDifferentCity: [], differentPropertyTypes: [] };

  // ... rest of function ...
}
```

### Change 6: Update No Results JSX Section
Replace the entire no results section (after `properties.length > 0 ? ... ) : (`) with the smart alternatives JSX.

See completed files for full JSX template. Key sections:
1. Updated "no results" message with filter details
2. Smart Alternative 1: Same city/location, different bedrooms
3. Smart Alternative 2: Same bedrooms, different cities
4. Smart Alternative 3: Different property types
5. Fallback: General alternatives if no smart alternatives found

## Property-Specific Configurations

### Property Type Filters (for Query 3 - Different Property Types)

| Property Type | Filter to Use | Example Alternative Text |
|--------------|---------------|-------------------------|
| Bedsitters | `.not('property_type', 'ilike', '%bedsitter%')` | "Apartments, Studios, Villas, etc." |
| Bungalows | `.not('property_type', 'ilike', '%bungalow%')` | "Villas, Maisonettes, Apartments, etc." |
| Maisonettes | `.not('property_type', 'ilike', '%maisonette%')` | "Bungalows, Villas, Apartments, etc." |
| Villas | `.not('property_type', 'ilike', '%villa%')` | "Bungalows, Maisonettes, Apartments, etc." |
| Townhouses | `.not('property_type', 'ilike', '%townhouse%')` | "Villas, Maisonettes, Apartments, etc." |
| Studios | `.not('property_type', 'ilike', '%studio%')` | "Apartments, Bedsitters, Villas, etc." |
| Commercial | `.not('property_type', 'ilike', '%commercial%')` | "Office Spaces, Shops, Warehouses, etc." |
| Office Space | `.not('property_type', 'ilike', '%office%')` | "Commercial Properties, Shops, etc." |
| Shops | `.not('property_type', 'ilike', '%shop%')` | "Commercial Properties, Office Spaces, etc." |
| Warehouses | `.not('property_type', 'ilike', '%warehouse%')` | "Commercial Properties, Shops, etc." |
| Serviced Apartments | `.not('property_type', 'ilike', '%serviced%')` | "Apartments, Studios, etc." |
| Container Houses | `.not('property_type', 'ilike', '%container%')` | "Houses, Bungalows, etc." |
| Land | `.not('property_type', 'ilike', '%land%')` | "Houses, Bungalows, etc." |

### Label Configurations

| Property Type | Singular | Plural | For Rent/Sale |
|--------------|----------|--------|---------------|
| Bedsitters | bedsitter | bedsitters | for Rent / for Sale |
| Bungalows | bungalow | bungalows | for Rent / for Sale |
| Maisonettes | maisonette | maisonettes | for Rent / for Sale |
| Villas | villa | villas | for Rent / for Sale |
| Townhouses | townhouse | townhouses | for Rent / for Sale |
| Studios | studio | studios | for Rent / for Sale |
| Commercial Properties | commercial property | commercial properties | for Rent / for Sale |
| Office Spaces | office space | office spaces | for Rent |
| Shops | shop | shops | for Rent / for Sale |
| Warehouses | warehouse | warehouses | for Rent / for Sale |
| Serviced Apartments | serviced apartment | serviced apartments | for Rent |
| Container Houses | container house | container houses | for Sale |
| Land | land | land | for Sale |

## Testing Checklist

For each file after implementation:
- [ ] File compiles without TypeScript errors
- [ ] Smart Alternative 1 shows when filters applied with no results
- [ ] Smart Alternative 2 shows appropriate alternatives
- [ ] Smart Alternative 3 shows different property types
- [ ] Fallback section shows when no smart alternatives available
- [ ] Property type labels are correct (singular/plural)
- [ ] Transaction type correct (for Rent vs for Sale)
- [ ] Property type filter in Query 3 excludes current property type

## Implementation Status

### Completed (2/29)
- ✅ bedsitters-for-rent
- ✅ bungalows-for-rent

### In Progress (0/29)

### Remaining (27/29)
- All other files listed above

## Notes
- The pattern is identical across all files
- Only differences are property type labels, filters, and transaction types
- Bedroom-specific files (2, 3, 4, 5-bedroom) don't use property type filters in the same way
- All rent pages use `price_type: 'rent'`
- All sale pages use `price_type: 'sale'`
