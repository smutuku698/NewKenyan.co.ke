import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generatePropertyDescription } from '@/utils/seo';

export async function POST(request: NextRequest) {
  try {
    // Create admin Supabase client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Categorize images
    const officeImages = [
      '/propert images/co working space.webp',
      '/propert images/co working space (2).webp',
      '/propert images/co-working space.webp',
      '/propert images/coworking space.webp',
      '/propert images/dark themed office space.webp',
      '/propert images/minimalistic office space.webp',
      '/propert images/minimalistic office space (2).webp',
      '/propert images/office space.webp',
      '/propert images/office space (2).webp',
      '/propert images/office-interior.webp',
      '/propert images/vibe working space.webp'
    ];

    const residentialImages = [
      '/propert images/bedroom with city view.webp',
      '/propert images/cozy bedroom.webp',
      '/propert images/cozy bedroom with bath tab.webp',
      '/propert images/cozy bedroom with bathtab.webp',
      '/propert images/elegant bedroom.webp',
      '/propert images/modern bedroom.webp',
      '/propert images/modern bedroom (2).webp',
      '/propert images/modrn bedroom.webp',
      '/propert images/elegant sitting room.webp',
      '/propert images/elegant cozy living space.webp',
      '/propert images/milky white living space.webp',
      '/propert images/modern sitting room with afrian art.webp',
      '/propert images/modern sitting room with decor.webp',
      '/propert images/new sitting room.webp',
      '/propert images/nice sitting area.webp',
      '/propert images/nice sitting room.webp',
      '/propert images/nice sitting room with space.webp',
      '/propert images/pure white living space.webp',
      '/propert images/pure white living sitting room space.webp',
      '/propert images/sitting room.webp',
      '/propert images/spaceious sitting room in kileleshwa.webp',
      '/propert images/specious living space.webp',
      '/propert images/specious sitting room.webp',
      '/propert images/specious sitting room (2).webp',
      '/propert images/wood furnished living room.webp',
      '/propert images/open spceious sitting room.webp',
      '/propert images/dining room.webp',
      '/propert images/dinning room.webp',
      '/propert images/open kitchen.webp',
      '/propert images/open kitchen (2).webp',
      '/propert images/open kitchen room.webp',
      '/propert images/open kitchen sitting room.webp',
      '/propert images/modrn open kitchen sitting room.webp',
      '/propert images/modern kitchen with wood furnishing.webp',
      '/propert images/cozy bathroom place.webp',
      '/propert images/lush bathroom.webp',
      '/propert images/modern bathroom.webp',
      '/propert images/modern bathroom with tab.webp',
      '/propert images/modern wooden furnished bathroom.webp',
      '/propert images/house with pool.webp',
      '/propert images/hosue with pool.webp',
      '/propert images/house exterior with pool - kileleshwa.webp',
      '/propert images/luxury house with pool - karen.webp',
      '/propert images/luxury house exterior.webp',
      '/propert images/nice contemporary house with nice pouch area.webp',
      '/propert images/house with porch area outside.webp',
      '/propert images/house with open walkway.webp',
      '/propert images/house with open tile walkway.webp',
      '/propert images/house with tile walk way.webp',
      '/propert images/house with tile walk way (2).webp',
      '/propert images/hosue with open walk way.webp',
      '/propert images/hosue with tile walk way.webp',
      '/propert images/hosuse with open walkway.webp',
      '/propert images/house with opon walkway.webp',
      '/propert images/nice-interior-image-of-house-on-sale-newkenyan.com.webp',
      '/propert images/nice-interior-image-of-house-on-sale-newkenyan.com (1).webp',
      '/propert images/DGUZZJMqiaF5i5Gi-gVXK.webp',
      '/propert images/FzZR1VkJlNMOxnJT1rAqd.webp'
    ];

    // Property data with regions
    const properties = [
      // COMMERCIAL PROPERTIES
      {
        propertyTitle: "Modern Co-working Space in Westlands",
        propertyType: "Office",
        description: "Contemporary co-working space in prime Westlands location. Features hot desks, private offices, meeting rooms, and high-speed internet. Perfect for startups, freelancers, and remote teams.",
        price: 15000,
        priceType: "rent",
        bedrooms: 0,
        bathrooms: 2,
        squareFeet: 2000,
        address: "Westlands Road, Business Hub",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345017",
        contactEmail: "coworking@newkenyan.co.ke",
        whatsappNumber: "+254712345017",
        amenities: ["wifi", "security", "parking", "air conditioning", "elevator"],
        isFurnished: true,
        petsAllowed: false,
        images: officeImages.slice(0, 3),
        isCommercial: true
      },
      {
        propertyTitle: "Executive Office Space in CBD",
        propertyType: "Office",
        description: "Premium executive office space in Nairobi CBD. Fully furnished with modern amenities, reception area, and conference facilities. Ideal for established businesses and corporate offices.",
        price: 25000,
        priceType: "rent",
        bedrooms: 0,
        bathrooms: 3,
        squareFeet: 1500,
        address: "Kimathi Street, Executive Plaza",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345018",
        contactEmail: "office@newkenyan.co.ke",
        whatsappNumber: "+254712345018",
        amenities: ["wifi", "security", "parking", "air conditioning", "elevator", "backup generator"],
        isFurnished: true,
        petsAllowed: false,
        images: officeImages.slice(3, 6),
        isCommercial: true
      },
      {
        propertyTitle: "Creative Workspace in Karen",
        propertyType: "Office",
        description: "Unique creative workspace in serene Karen environment. Features open plan areas, break-out spaces, and natural lighting. Perfect for creative agencies, design studios, and tech companies.",
        price: 18000,
        priceType: "rent",
        bedrooms: 0,
        bathrooms: 2,
        squareFeet: 1200,
        address: "Karen Road, Creative Complex",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345019",
        contactEmail: "creative@newkenyan.co.ke",
        whatsappNumber: "+254712345019",
        amenities: ["wifi", "security", "parking", "garden", "backup generator"],
        isFurnished: true,
        petsAllowed: false,
        images: officeImages.slice(6, 9),
        isCommercial: true
      },

      // KIAMBU PROPERTIES
      {
        propertyTitle: "Modern 3BR Family House in Kiambu",
        propertyType: "House",
        description: "Beautiful 3-bedroom family home in Kiambu with spacious compound and modern finishes. Features include a large kitchen, living room, and secure parking. Perfect for families looking for suburban living with easy access to Nairobi.",
        price: 85000,
        priceType: "rent",
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1400,
        address: "Kiambu Road, Green Valley Estate",
        city: "Kiambu",
        county: "Kiambu",
        contactPhone: "+254712345001",
        contactEmail: "kiambu@newkenyan.co.ke",
        whatsappNumber: "+254712345001",
        amenities: ["parking", "security", "garden", "backup generator"],
        isFurnished: false,
        petsAllowed: true,
        images: residentialImages.slice(0, 3),
        isCommercial: false
      },
      {
        propertyTitle: "Spacious 4BR Villa in Kiambu Town",
        propertyType: "Villa",
        description: "Luxurious 4-bedroom villa situated in quiet Kiambu neighborhood. Features include master ensuite, modern kitchen, spacious living areas, and beautiful garden. Close to schools and shopping centers.",
        price: 1200000,
        priceType: "sale",
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2000,
        address: "Kiambu Town, Villa Gardens",
        city: "Kiambu",
        county: "Kiambu",
        contactPhone: "+254712345002",
        contactEmail: "kiambu@newkenyan.co.ke",
        whatsappNumber: "+254712345002",
        amenities: ["garden", "parking", "security", "backup generator", "storage"],
        isFurnished: false,
        petsAllowed: true,
        images: residentialImages.slice(3, 6),
        isCommercial: false
      },

      // WESTLANDS PROPERTIES
      {
        propertyTitle: "Luxury 2BR Apartment in Westlands",
        propertyType: "Apartment",
        description: "Premium 2-bedroom apartment in the heart of Westlands. Features modern amenities, city views, and close proximity to shopping malls, restaurants, and business centers. Perfect for young professionals.",
        price: 95000,
        priceType: "rent",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1000,
        address: "Westlands Square, Block A",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345003",
        contactEmail: "westlands@newkenyan.co.ke",
        whatsappNumber: "+254712345003",
        amenities: ["parking", "security", "gym", "pool", "elevator"],
        isFurnished: true,
        petsAllowed: false,
        images: residentialImages.slice(6, 9),
        isCommercial: false
      },
      {
        propertyTitle: "Executive 3BR Penthouse in Westlands",
        propertyType: "Penthouse",
        description: "Stunning 3-bedroom penthouse with panoramic city views. Features include a private balcony, modern kitchen, and premium finishes throughout. Located in prestigious Westlands area.",
        price: 3500000,
        priceType: "sale",
        bedrooms: 3,
        bathrooms: 3,
        squareFeet: 1800,
        address: "Westlands Road, Sky Tower",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345004",
        contactEmail: "westlands@newkenyan.co.ke",
        whatsappNumber: "+254712345004",
        amenities: ["parking", "security", "gym", "pool", "balcony", "elevator"],
        isFurnished: true,
        petsAllowed: false,
        images: residentialImages.slice(9, 12),
        isCommercial: false
      },

      // KAREN PROPERTIES
      {
        propertyTitle: "Elegant 4BR House in Karen",
        propertyType: "House",
        description: "Beautiful 4-bedroom house in prestigious Karen suburb. Features include spacious rooms, modern kitchen, large garden, and secure compound. Close to international schools and Karen shopping center.",
        price: 180000,
        priceType: "rent",
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        address: "Karen Hardy Estate, House 24",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345005",
        contactEmail: "karen@newkenyan.co.ke",
        whatsappNumber: "+254712345005",
        amenities: ["garden", "parking", "security", "backup generator", "servant quarter"],
        isFurnished: false,
        petsAllowed: true,
        images: [
          residentialImages[42], // luxury house with pool - karen
          residentialImages[12], // elegant sitting room
          residentialImages[30] // dining room
        ],
        isCommercial: false
      },
      {
        propertyTitle: "Luxury 5BR Mansion in Karen",
        propertyType: "House",
        description: "Magnificent 5-bedroom mansion in Karen with swimming pool and manicured gardens. Perfect for large families or executives. Features include multiple living areas, study room, and staff quarters.",
        price: 5800000,
        priceType: "sale",
        bedrooms: 5,
        bathrooms: 5,
        squareFeet: 3500,
        address: "Karen Blixen Road, Mansion Estate",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345006",
        contactEmail: "karen@newkenyan.co.ke",
        whatsappNumber: "+254712345006",
        amenities: ["pool", "garden", "parking", "security", "servant quarter", "backup generator"],
        isFurnished: false,
        petsAllowed: true,
        images: [
          residentialImages[43], // luxury house exterior
          residentialImages[40], // house with pool
          residentialImages[41] // house exterior with pool - kileleshwa
        ],
        isCommercial: false
      },

      // RUNDA PROPERTIES
      {
        propertyTitle: "Contemporary 3BR Townhouse in Runda",
        propertyType: "Townhouse",
        description: "Modern 3-bedroom townhouse in exclusive Runda estate. Features contemporary design, private garden, and top-notch security. Perfect for families seeking luxury living.",
        price: 150000,
        priceType: "rent",
        bedrooms: 3,
        bathrooms: 3,
        squareFeet: 1600,
        address: "Runda Estate, Townhouse 12",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345007",
        contactEmail: "runda@newkenyan.co.ke",
        whatsappNumber: "+254712345007",
        amenities: ["garden", "parking", "security", "clubhouse", "backup generator"],
        isFurnished: false,
        petsAllowed: true,
        images: residentialImages.slice(15, 18),
        isCommercial: false
      },
      {
        propertyTitle: "Luxury 4BR Villa in Runda",
        propertyType: "Villa",
        description: "Exquisite 4-bedroom villa in prime Runda location. Features include spacious living areas, modern kitchen, swimming pool, and beautiful landscaped gardens. 24/7 security provided.",
        price: 4200000,
        priceType: "sale",
        bedrooms: 4,
        bathrooms: 4,
        squareFeet: 2800,
        address: "Runda Mhasibu Estate, Villa 8",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345008",
        contactEmail: "runda@newkenyan.co.ke",
        whatsappNumber: "+254712345008",
        amenities: ["pool", "garden", "parking", "security", "clubhouse", "backup generator"],
        isFurnished: false,
        petsAllowed: true,
        images: residentialImages.slice(18, 21),
        isCommercial: false
      },

      // TATU CITY PROPERTIES
      {
        propertyTitle: "Modern 2BR Apartment in Tatu City",
        propertyType: "Apartment",
        description: "Brand new 2-bedroom apartment in the innovative Tatu City development. Features smart home technology, modern amenities, and access to shopping, schools, and recreational facilities.",
        price: 75000,
        priceType: "rent",
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 900,
        address: "Tatu City, Riviera Apartments",
        city: "Kiambu",
        county: "Kiambu",
        contactPhone: "+254712345009",
        contactEmail: "tatucity@newkenyan.co.ke",
        whatsappNumber: "+254712345009",
        amenities: ["parking", "security", "gym", "pool", "wifi", "backup generator"],
        isFurnished: true,
        petsAllowed: false,
        images: residentialImages.slice(21, 24),
        isCommercial: false
      },
      {
        propertyTitle: "Smart 3BR Townhouse in Tatu City",
        propertyType: "Townhouse",
        description: "Innovative 3-bedroom townhouse in Tatu City with smart home features. Includes private garden, modern kitchen, and access to world-class amenities including schools and shopping centers.",
        price: 2200000,
        priceType: "sale",
        bedrooms: 3,
        bathrooms: 3,
        squareFeet: 1500,
        address: "Tatu City, Eden Square",
        city: "Kiambu",
        county: "Kiambu",
        contactPhone: "+254712345010",
        contactEmail: "tatucity@newkenyan.co.ke",
        whatsappNumber: "+254712345010",
        amenities: ["garden", "parking", "security", "wifi", "backup generator", "clubhouse"],
        isFurnished: false,
        petsAllowed: true,
        images: residentialImages.slice(24, 27),
        isCommercial: false
      },

      // MOMBASA PROPERTIES
      {
        propertyTitle: "Beachfront 3BR Apartment in Mombasa",
        propertyType: "Apartment",
        description: "Stunning 3-bedroom beachfront apartment with ocean views. Features include spacious balcony, modern kitchen, and direct beach access. Perfect for vacation rental or permanent residence.",
        price: 120000,
        priceType: "rent",
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1300,
        address: "Nyali Beach, Ocean View Apartments",
        city: "Mombasa",
        county: "Mombasa",
        contactPhone: "+254712345011",
        contactEmail: "mombasa@newkenyan.co.ke",
        whatsappNumber: "+254712345011",
        amenities: ["parking", "security", "pool", "balcony", "air conditioning"],
        isFurnished: true,
        petsAllowed: false,
        images: residentialImages.slice(27, 30),
        isCommercial: false
      },
      {
        propertyTitle: "Luxury Beach Villa in Mombasa",
        propertyType: "Villa",
        description: "Magnificent 4-bedroom beach villa with private pool and direct ocean access. Features include spacious living areas, modern amenities, and tropical gardens. Perfect for luxury coastal living.",
        price: 6500000,
        priceType: "sale",
        bedrooms: 4,
        bathrooms: 4,
        squareFeet: 3000,
        address: "Diani Beach Road, Villa Paradise",
        city: "Mombasa",
        county: "Mombasa",
        contactPhone: "+254712345012",
        contactEmail: "mombasa@newkenyan.co.ke",
        whatsappNumber: "+254712345012",
        amenities: ["pool", "garden", "parking", "security", "air conditioning", "balcony"],
        isFurnished: true,
        petsAllowed: true,
        images: residentialImages.slice(30, 33),
        isCommercial: false
      },

      // ADDITIONAL PROPERTIES
      {
        propertyTitle: "Affordable 2BR Apartment in Kiambu",
        propertyType: "Apartment",
        description: "Comfortable 2-bedroom apartment in Kiambu town center. Great for young families or professionals. Close to public transport, schools, and shopping areas.",
        price: 55000,
        priceType: "rent",
        bedrooms: 2,
        bathrooms: 1,
        squareFeet: 800,
        address: "Kiambu Town, Central Apartments",
        city: "Kiambu",
        county: "Kiambu",
        contactPhone: "+254712345013",
        contactEmail: "kiambu@newkenyan.co.ke",
        whatsappNumber: "+254712345013",
        amenities: ["parking", "security"],
        isFurnished: false,
        petsAllowed: true,
        images: residentialImages.slice(33, 36),
        isCommercial: false
      },
      {
        propertyTitle: "Studio Apartment in Westlands",
        propertyType: "Studio",
        description: "Compact studio apartment perfect for young professionals working in Westlands. Features modern amenities and great location near offices and entertainment.",
        price: 50000,
        priceType: "rent",
        bedrooms: 1,
        bathrooms: 1,
        squareFeet: 500,
        address: "Westlands, Studio Complex",
        city: "Nairobi",
        county: "Nairobi",
        contactPhone: "+254712345014",
        contactEmail: "westlands@newkenyan.co.ke",
        whatsappNumber: "+254712345014",
        amenities: ["security", "wifi", "elevator"],
        isFurnished: true,
        petsAllowed: false,
        images: residentialImages.slice(36, 39),
        isCommercial: false
      }
    ];

    let createdCount = 0;
    const results = [];

    // Insert all properties
    for (const property of properties) {
      try {
        // Generate description using the SEO utility
        const autoDescription = generatePropertyDescription(
          property.propertyTitle,
          property.propertyType,
          property.city,
          property.bedrooms,
          property.bathrooms,
          property.amenities,
          property.priceType
        );

        const { error } = await supabaseAdmin
          .from('property_listings')
          .insert({
            user_id: 'demo-user-001',
            property_title: property.propertyTitle,
            property_type: property.propertyType,
            description: autoDescription, // Use auto-generated description
            price: property.price,
            price_type: property.priceType,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            square_feet: property.squareFeet,
            address: property.address,
            city: property.city,
            county: property.county,
            contact_phone: property.contactPhone,
            contact_email: property.contactEmail,
            whatsapp_number: property.whatsappNumber,
            amenities: property.amenities,
            images: property.images,
            available_from: new Date().toISOString(),
            is_furnished: property.isFurnished,
            pets_allowed: property.petsAllowed,
            is_approved: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (error) {
          results.push({ success: false, property: property.propertyTitle, error: error.message });
        } else {
          results.push({ success: true, property: property.propertyTitle });
          createdCount++;
        }
      } catch (error) {
        results.push({ success: false, property: property.propertyTitle, error: 'Unknown error' });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdCount} properties out of ${properties.length}`,
      createdCount,
      totalProperties: properties.length,
      results
    });

  } catch (error) {
    console.error('Property population error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to populate properties',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}