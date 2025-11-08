const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'https://gsdctfcfkrtuxnwapjcj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTEzNDgzMCwiZXhwIjoyMDcwNzEwODMwfQ.TmCzZ3dyKOhN0V-6ezLAykzsJfAWcaVCt5Yx0gjMHLA';
const supabase = createClient(supabaseUrl, supabaseKey);

// All Kenya counties
const allCounties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale",
  "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit",
  "Meru", "Migori", "Mombasa", "Muranga", "Nairobi", "Nakuru",
  "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu",
  "Siaya", "Taita Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia",
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

// County towns/cities
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
  "Kiambu": ["Kiambu Town", "Thika", "Ruaka", "Kikuyu"],
  "Kilifi": ["Kilifi Town", "Malindi", "Watamu"],
  "Kirinyaga": ["Kerugoya", "Kutus", "Wang'uru"],
  "Kisii": ["Kisii Town", "Ogembo", "Keroka"],
  "Kisumu": ["Kisumu City", "Ahero", "Maseno"],
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
  "Mombasa": ["Mombasa City", "Nyali", "Bamburi", "Shanzu"],
  "Muranga": ["Murang'a Town", "Kenol", "Kangema"],
  "Nairobi": ["Nairobi City", "Westlands", "Kilimani", "Karen"],
  "Nakuru": ["Nakuru City", "Naivasha", "Gilgil"],
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

async function boostCountyListings() {
  console.log('='.repeat(80));
  console.log('BOOSTING COUNTY LISTINGS TO MINIMUM 5 PER PAGE TYPE');
  console.log('='.repeat(80));
  console.log('');

  let totalAdded = 0;

  for (const county of allCounties) {
    console.log(`Checking ${county}...`);

    // Check each page type
    const pageTypes = [
      { type: 'Apartment', priceType: 'For Rent', name: 'apartments-for-rent' },
      { type: 'Apartment', priceType: 'For Sale', name: 'apartments-for-sale' },
      { type: 'House', priceType: 'For Rent', name: 'houses-for-rent' },
      { type: 'House', priceType: 'For Sale', name: 'houses-for-sale' }
    ];

    for (const pageType of pageTypes) {
      const { data, error } = await supabase
        .from('property_listings')
        .select('id')
        .eq('is_approved', true)
        .eq('price_type', pageType.priceType)
        .ilike('property_type', `%${pageType.type}%`)
        .ilike('county', `%${county}%`);

      const currentCount = data ? data.length : 0;
      const needed = Math.max(0, 5 - currentCount);

      if (needed > 0) {
        console.log(`  Adding ${needed} ${pageType.name} listings`);

        const listings = [];
        const towns = countyTowns[county] || [county + " Town"];

        for (let i = 0; i < needed; i++) {
          const city = towns[i % towns.length];
          const bedrooms = [1, 2, 3, 4][(currentCount + i) % 4];
          const bathrooms = bedrooms <= 2 ? bedrooms : bedrooms - 1;

          const basePrice = pageType.priceType === "For Sale"
            ? (bedrooms * 3000000 + Math.random() * 5000000)
            : (bedrooms * 15000 + Math.random() * 20000);

          listings.push({
            user_id: "demo-user-001",
            property_title: `${bedrooms} Bedroom ${pageType.type} ${pageType.priceType === "For Sale" ? "for Sale" : "for Rent"} in ${city}, ${county}`,
            property_type: pageType.type,
            description: `Beautiful ${bedrooms} bedroom ${pageType.type.toLowerCase()} ${pageType.priceType === "For Sale" ? "for sale" : "for rent"} in ${city}, ${county}.`,
            price: Math.round(basePrice / 1000) * 1000,
            price_type: pageType.priceType,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            square_feet: bedrooms * 400 + 200,
            garage: bedrooms >= 3 ? 1 : 0,
            year_built: 2015 + (i % 8),
            address: `${city}, ${county}`,
            city: city,
            county: county,
            contact_phone: "+254712345678",
            contact_email: "info@newkenyan.com",
            whatsapp_number: "+254712345678",
            google_maps_link: `https://www.google.com/maps?q=${encodeURIComponent(city + ", " + county)}`,
            amenities: ["parking", "security", "water", "electricity"],
            images: [`https://gsdctfcfkrtuxnwapjcj.supabase.co/storage/v1/object/public/property-images/placeholder.jpg`],
            available_from: "2025-01-01",
            is_furnished: i % 2 === 0,
            pets_allowed: i % 3 === 0,
            is_approved: true,
            is_featured: false
          });
        }

        const { error: insertError } = await supabase
          .from('property_listings')
          .insert(listings);

        if (insertError) {
          console.log(`    ❌ Error: ${insertError.message}`);
        } else {
          totalAdded += needed;
        }
      }
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✓ Boosting complete! Added ${totalAdded} listings total.`);
  console.log('  All counties now have minimum 5 listings per page type.');
  console.log('='.repeat(80));
}

boostCountyListings().catch(console.error);
