const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

// Counties that need listings
const countiesNeedingListings = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kilifi", "Kirinyaga", "Kisii", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Muranga",
  "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu",
  "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia",
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

// County towns/cities for realistic addresses
const countyTowns = {
  "Baringo": ["Kabarnet", "Eldama Ravine", "Marigat"],
  "Bomet": ["Bomet Town", "Longisa", "Sotik"],
  "Bungoma": ["Bungoma Town", "Webuye", "Kimilili"],
  "Busia": ["Busia Town", "Malaba", "Bumala"],
  "Elgeyo-Marakwet": ["Iten", "Kapsowar", "Tambach"],
  "Embu": ["Embu Town", "Runyenjes", "Siakago"],
  "Garissa": ["Garissa Town", "Dadaab", "Hulugho"],
  "Homa Bay": ["Homa Bay Town", "Mbita", "Ndhiwa"],
  "Isiolo": ["Isiolo Town", "Merti", "Garbatulla"],
  "Kajiado": ["Kajiado Town", "Ngong", "Kitengela", "Ongata Rongai"],
  "Kakamega": ["Kakamega Town", "Mumias", "Butere"],
  "Kericho": ["Kericho Town", "Litein", "Londiani"],
  "Kilifi": ["Kilifi Town", "Malindi", "Watamu"],
  "Kirinyaga": ["Kerugoya", "Kutus", "Wang'uru"],
  "Kisii": ["Kisii Town", "Ogembo", "Keroka"],
  "Kitui": ["Kitui Town", "Mwingi", "Mutomo"],
  "Kwale": ["Kwale Town", "Ukunda", "Kinango"],
  "Laikipia": ["Nanyuki", "Nyahururu", "Rumuruti"],
  "Lamu": ["Lamu Town", "Mpeketoni", "Hindi"],
  "Machakos": ["Machakos Town", "Athi River", "Kangundo"],
  "Makueni": ["Wote", "Makueni", "Mtito Andei"],
  "Mandera": ["Mandera Town", "El Wak", "Rhamu"],
  "Marsabit": ["Marsabit Town", "Moyale", "Sololo"],
  "Meru": ["Meru Town", "Maua", "Nkubu"],
  "Migori": ["Migori Town", "Rongo", "Awendo"],
  "Muranga": ["Murang'a Town", "Kenol", "Kangema"],
  "Nandi": ["Kapsabet", "Nandi Hills", "Mosoriot"],
  "Narok": ["Narok Town", "Kilgoris", "Suswa"],
  "Nyamira": ["Nyamira Town", "Keroka", "Nyansiongo"],
  "Nyandarua": ["Ol Kalou", "Nyahururu", "Engineer"],
  "Nyeri": ["Nyeri Town", "Karatina", "Othaya"],
  "Samburu": ["Maralal", "Baragoi", "Wamba"],
  "Siaya": ["Siaya Town", "Bondo", "Ugunja"],
  "Taita Taveta": ["Voi", "Wundanyi", "Taveta"],
  "Tana River": ["Hola", "Garsen", "Bura"],
  "Tharaka-Nithi": ["Chuka", "Kathwana", "Marimanti"],
  "Trans Nzoia": ["Kitale", "Endebess", "Kiminini"],
  "Turkana": ["Lodwar", "Kakuma", "Lokichoggio"],
  "Uasin Gishu": ["Eldoret", "Turbo", "Burnt Forest"],
  "Vihiga": ["Vihiga Town", "Mbale", "Hamisi"],
  "Wajir": ["Wajir Town", "Habaswein", "Griftu"],
  "West Pokot": ["Kapenguria", "Makutano", "Chepareria"]
};

const propertyTypes = ["Apartment", "House", "Maisonette", "Townhouse", "Villa", "Bungalow"];
const priceTypes = ["For Sale", "For Rent"];
const amenities = ["parking", "security", "water", "electricity", "garden", "balcony", "gym", "swimming pool"];

function generateSeedListing(county, propertyType, priceType, index) {
  const towns = countyTowns[county] || [county + " Town"];
  const city = towns[index % towns.length];
  const bedrooms = [1, 2, 3, 4][index % 4];
  const bathrooms = bedrooms <= 2 ? bedrooms : bedrooms - 1;

  const basePrice = priceType === "For Sale"
    ? (bedrooms * 3000000 + Math.random() * 5000000)
    : (bedrooms * 15000 + Math.random() * 20000);

  const price = Math.round(basePrice / 1000) * 1000;

  const amenityCount = 3 + (index % 3);
  const selectedAmenities = amenities.slice(0, amenityCount);

  return {
    user_id: "demo-user-001",
    property_title: `${bedrooms} Bedroom ${propertyType} ${priceType === "For Sale" ? "for Sale" : "for Rent"} in ${city}, ${county}`,
    property_type: propertyType,
    description: `Beautiful ${bedrooms} bedroom ${propertyType.toLowerCase()} ${priceType === "For Sale" ? "for sale" : "for rent"} in ${city}, ${county}. ${
      priceType === "For Sale"
        ? "Perfect for families looking for a permanent home in a prime location."
        : "Ideal for families or professionals seeking comfortable living."
    } Features include ${selectedAmenities.join(", ")}.`,
    price: price,
    price_type: priceType,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    square_feet: bedrooms * 400 + 200,
    garage: bedrooms >= 3 ? 1 : 0,
    year_built: 2015 + (index % 8),
    address: `${city}, ${county}`,
    city: city,
    county: county,
    contact_phone: "+254712345678",
    contact_email: "info@newkenyan.com",
    whatsapp_number: "+254712345678",
    google_maps_link: `https://www.google.com/maps?q=${encodeURIComponent(city + ", " + county)}`,
    amenities: selectedAmenities,
    images: [`https://gsdctfcfkrtuxnwapjcj.supabase.co/storage/v1/object/public/property-images/${county.toLowerCase().replace(/\s+/g, '-')}-${propertyType.toLowerCase()}-${index + 1}.jpg`],
    available_from: "2025-01-01",
    is_furnished: index % 2 === 0,
    pets_allowed: index % 3 === 0,
    is_approved: true,
    is_featured: false
  };
}

async function seedCountyListings() {
  console.log('='.repeat(80));
  console.log('SEEDING COUNTY LISTINGS');
  console.log('='.repeat(80));
  console.log('');

  let totalInserted = 0;
  const errors = [];

  for (const county of countiesNeedingListings) {
    console.log(`Processing ${county}...`);

    const listings = [];

    // Create 2 apartments for rent
    listings.push(generateSeedListing(county, "Apartment", "For Rent", 0));
    listings.push(generateSeedListing(county, "Apartment", "For Rent", 1));

    // Create 2 apartments for sale
    listings.push(generateSeedListing(county, "Apartment", "For Sale", 2));
    listings.push(generateSeedListing(county, "Apartment", "For Sale", 3));

    // Create 1 house for rent
    listings.push(generateSeedListing(county, "House", "For Rent", 4));

    // Create 1 house for sale
    listings.push(generateSeedListing(county, "House", "For Sale", 5));

    // Create 2 additional varied properties
    listings.push(generateSeedListing(county, "Maisonette", "For Sale", 6));
    listings.push(generateSeedListing(county, "Townhouse", "For Rent", 7));

    // Insert in batches
    const { data, error } = await supabase
      .from('property_listings')
      .insert(listings);

    if (error) {
      console.log(`  ❌ Error: ${error.message}`);
      errors.push({ county, error: error.message });
    } else {
      console.log(`  ✓ Added 8 listings to ${county}`);
      totalInserted += 8;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY:');
  console.log(`  Total counties processed: ${countiesNeedingListings.length}`);
  console.log(`  Total listings inserted: ${totalInserted}`);
  console.log(`  Errors: ${errors.length}`);

  if (errors.length > 0) {
    console.log('\nErrors encountered:');
    errors.forEach(e => {
      console.log(`  ${e.county}: ${e.error}`);
    });
  }

  console.log('='.repeat(80));
  console.log('\n✓ Seeding complete! All county pages should now have listings.');
}

seedCountyListings().catch(console.error);
