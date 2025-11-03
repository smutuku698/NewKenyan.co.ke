/**
 * Comprehensive City Pillar Content with E-E-A-T Optimization
 *
 * This module provides in-depth, localized content for major Kenyan cities
 * with authoritative references and expert insights for Google E-E-A-T signals.
 */

import { Location, PropertyStats } from './location-seo';

export interface CityPillarContent {
  cityName: string;
  overview: string;
  marketInsights: {
    title: string;
    content: string;
    statistics: { label: string; value: string; source?: string }[];
    trends: string[];
  };
  neighborhoods: {
    title: string;
    areas: {
      name: string;
      description: string;
      priceRange: string;
      amenities: string[];
      bestFor: string[];
    }[];
  };
  infrastructure: {
    title: string;
    transportation: string[];
    education: string[];
    healthcare: string[];
    shopping: string[];
  };
  investment: {
    title: string;
    content: string;
    opportunities: string[];
    considerations: string[];
  };
  authoritative_sources: {
    label: string;
    url: string;
    description: string;
  }[];
}

/**
 * Comprehensive Nairobi Content
 */
export const NAIROBI_PILLAR_CONTENT: CityPillarContent = {
  cityName: 'Nairobi',
  overview: `Nairobi, Kenya's vibrant capital city and largest urban center, is the economic and political hub of East Africa. With a population of over 4.4 million people, Nairobi offers diverse real estate opportunities ranging from affordable housing in suburban areas to luxury properties in exclusive neighborhoods. The city's strategic location, world-class infrastructure, and growing economy make it a prime destination for property investment in Africa.`,

  marketInsights: {
    title: 'Nairobi Real Estate Market Insights',
    content: `The Nairobi property market has shown resilient growth despite global economic challenges. According to the Kenya Bankers Association Housing Price Index, property values in prime areas have appreciated by an average of 5-8% annually over the past decade. The rental market remains robust, with average rental yields of 6-9% in residential properties, making Nairobi one of Africa's most attractive markets for real estate investment.`,
    statistics: [
      {
        label: 'Average Property Appreciation',
        value: '5-8% annually',
        source: 'Kenya Bankers Association Housing Price Index'
      },
      {
        label: 'Rental Yield (Residential)',
        value: '6-9%',
        source: 'Hass Consult Property Index'
      },
      {
        label: 'Population Growth Rate',
        value: '4.1% annually',
        source: 'Kenya National Bureau of Statistics'
      },
      {
        label: 'Average House Price (Nairobi)',
        value: 'KES 8.5M - 15M',
        source: 'Knight Frank Kenya Market Report'
      }
    ],
    trends: [
      'Increasing demand for gated communities in satellite towns like Ruiru, Syokimau, and Kitengela',
      'Growing preference for mixed-use developments combining residential, commercial, and retail spaces',
      'Rising interest in affordable housing projects driven by government initiatives',
      'Suburban areas experiencing faster price growth than traditional prime locations',
      'Digital property transactions and virtual tours becoming mainstream post-pandemic'
    ]
  },

  neighborhoods: {
    title: 'Popular Nairobi Neighborhoods',
    areas: [
      {
        name: 'Karen',
        description: 'An exclusive leafy suburb known for large plots, spacious homes, and proximity to nature. Home to the Karen Blixen Museum and Giraffe Centre.',
        priceRange: 'KES 25M - 150M+',
        amenities: ['International schools', '24/7 security', 'Shopping malls', 'Golf courses', 'Nairobi National Park proximity'],
        bestFor: ['Luxury living', 'Families', 'Expatriates', 'Large properties']
      },
      {
        name: 'Westlands',
        description: 'Vibrant commercial and residential hub with modern apartments, shopping centers, restaurants, and nightlife. Popular among young professionals.',
        priceRange: 'KES 8M - 35M',
        amenities: ['Sarit Centre', 'Westgate Mall', 'Restaurants & cafes', 'Hospitals', 'Easy CBD access'],
        bestFor: ['Young professionals', 'Investment properties', 'Urban lifestyle']
      },
      {
        name: 'Kilimani',
        description: 'Centrally located neighborhood with high-rise apartments, excellent rental potential, and proximity to major business districts.',
        priceRange: 'KES 7M - 25M',
        amenities: ['Yaya Centre', 'The Junction Mall', 'Hospitals', 'Schools', 'Vibrant nightlife'],
        bestFor: ['Rental investment', 'Young families', 'Commuters']
      },
      {
        name: 'Runda',
        description: 'Upscale gated community offering maximum security, large compounds, and modern amenities. Popular with diplomats and executives.',
        priceRange: 'KES 30M - 200M+',
        amenities: ['Two Rivers Mall', 'International schools', 'Golf courses', 'Spa & wellness centers', 'Gigiri diplomatic area'],
        bestFor: ['High-net-worth individuals', 'Expatriates', 'Large families']
      },
      {
        name: 'Lavington',
        description: 'Established residential area with mix of apartments and standalone houses. Quiet, secure, and close to the CBD.',
        priceRange: 'KES 12M - 45M',
        amenities: ['Valley Arcade', 'Top schools', 'Healthcare facilities', 'Religious institutions', 'Karura Forest'],
        bestFor: ['Families', 'Professionals', 'Stable investment']
      },
      {
        name: 'Kileleshwa',
        description: 'Serene middle-to-upper class neighborhood with tree-lined streets, low-rise apartments, and townhouses.',
        priceRange: 'KES 10M - 30M',
        amenities: ['Shopping centers', 'Schools', 'Hospitals', 'Parks', 'Good road network'],
        bestFor: ['Families', 'First-time buyers', 'Rental income']
      },
      {
        name: 'Syokimau',
        description: 'Fast-growing satellite town along Mombasa Road with affordable housing and SGR connectivity. Popular for modern apartments.',
        priceRange: 'KES 3.5M - 12M',
        amenities: ['SGR terminus', 'Shopping centers', 'Schools', 'Gated communities', 'Airport proximity'],
        bestFor: ['Affordable housing', 'First-time buyers', 'Commuters']
      },
      {
        name: 'Ruiru',
        description: 'Rapidly developing town north of Nairobi offering affordable housing options and infrastructure growth. Mix of apartments and bungalows.',
        priceRange: 'KES 2.5M - 10M',
        amenities: ['Thika Road superhighway', 'Malls', 'Schools', 'Hospitals', 'Transport links'],
        bestFor: ['Affordable homeownership', 'Young families', 'Investment growth']
      },
      {
        name: 'Parklands',
        description: 'Cosmopolitan neighborhood with diverse community, excellent amenities, and good rental demand. Mix of residential and commercial.',
        priceRange: 'KES 9M - 28M',
        amenities: ['Oshwal Centre', 'Hospitals', 'Schools', 'Restaurants', 'Community centers'],
        bestFor: ['Rental investment', 'Diverse community', 'Central location']
      },
      {
        name: 'South B & South C',
        description: 'Established middle-class estates with good infrastructure, schools, and amenities. Popular among families and working professionals.',
        priceRange: 'KES 6M - 18M',
        amenities: ['T-Mall', 'Schools', 'Hospitals', 'Sports clubs', 'Easy airport access'],
        bestFor: ['Families', 'Stable neighborhoods', 'Good schools']
      }
    ]
  },

  infrastructure: {
    title: 'Infrastructure & Amenities',
    transportation: [
      'Jomo Kenyatta International Airport (JKIA) - Africa\'s 7th busiest airport',
      'Standard Gauge Railway (SGR) connecting Nairobi to Mombasa',
      'Thika Road Superhighway - 8-lane modern expressway',
      'Nairobi Expressway - elevated toll road connecting airport to Westlands',
      'Extensive matatu (minibus) network covering all neighborhoods',
      'Bus Rapid Transit (BRT) system under development',
      'Uber, Bolt, and Little Cab ride-hailing services'
    ],
    education: [
      'International School of Kenya (ISK) - Premier international curriculum',
      'Brookhouse School - IB World School',
      'St. Mary\'s School - Top national school',
      'University of Nairobi - Leading public university',
      'Strathmore University - Highly ranked business school',
      'Aga Khan Hospital Medical College',
      'Numerous county and private schools across all neighborhoods'
    ],
    healthcare: [
      'Aga Khan University Hospital - Leading private hospital',
      'Nairobi Hospital - Comprehensive medical services',
      'MP Shah Hospital - Specialist care center',
      'Kenyatta National Hospital - Largest public hospital in East Africa',
      'Gertrude\'s Children\'s Hospital - Pediatric specialist',
      'Avenue Healthcare - Network of modern clinics',
      'Numerous pharmacies and health centers in every neighborhood'
    ],
    shopping: [
      'The Hub Karen - Luxury shopping and dining',
      'Two Rivers Mall - Largest mall in Sub-Saharan Africa',
      'Westgate Mall - Upscale shopping center',
      'Sarit Centre - Established retail destination',
      'The Junction Mall - Popular shopping and entertainment',
      'Village Market - Unique open-air mall',
      'Garden City Mall - Modern mixed-use development',
      'Yaya Centre - Convenient neighborhood mall'
    ]
  },

  investment: {
    title: 'Investment Opportunities in Nairobi',
    content: `Nairobi remains Kenya's premier real estate investment destination, offering diverse opportunities across residential, commercial, and mixed-use developments. The city's growing population, expanding middle class, and infrastructure development continue to drive property demand. Government initiatives like the Affordable Housing Program have created new investment avenues, while satellite towns offer high-growth potential at lower entry points.`,
    opportunities: [
      'Buy-to-let apartments in middle-income areas like Kilimani, Kileleshwa offering 7-9% rental yields',
      'Land banking in developing corridors along Thika Road, Eastern Bypass, and Southern Bypass',
      'Student accommodation near universities (University of Nairobi, Kenyatta University, USIU)',
      'Affordable housing projects qualifying for government incentives and tax relief',
      'Commercial properties in emerging business districts like Westlands and Upper Hill',
      'Serviced apartments for corporate and expatriate tenants in Westlands, Kilimani',
      'Satellite town developments in Ruiru, Syokimau, Kitengela with 10-15% annual appreciation'
    ],
    considerations: [
      'Conduct thorough due diligence on land titles through official search at Ardhi House',
      'Factor in infrastructure development plans that may affect property values',
      'Consider rental demand trends in specific neighborhoods before investing',
      'Account for service charges and maintenance costs in gated communities',
      'Review county regulations and building approvals before purchase',
      'Engage licensed real estate agents and advocates for transactions',
      'Assess security levels and estate management quality'
    ]
  },

  authoritative_sources: [
    {
      label: 'Kenya National Bureau of Statistics (KNBS)',
      url: 'https://www.knbs.or.ke',
      description: 'Official population, economic, and housing statistics for Kenya'
    },
    {
      label: 'Hass Consult Property Index',
      url: 'https://www.hassconsult.co.ke',
      description: 'Quarterly property price and rental indices for Nairobi and major Kenyan cities'
    },
    {
      label: 'Knight Frank Kenya',
      url: 'https://www.knightfrank.co.ke',
      description: 'Professional property market reports and research for Kenya real estate'
    },
    {
      label: 'Central Bank of Kenya',
      url: 'https://www.centralbank.go.ke',
      description: 'Interest rates, inflation data, and economic indicators affecting property market'
    },
    {
      label: 'Nairobi City County Government',
      url: 'https://nairobi.go.ke',
      description: 'Official city planning, development approvals, and county regulations'
    },
    {
      label: 'Kenya Bankers Association',
      url: 'https://www.kba.co.ke',
      description: 'Housing price index and mortgage market data'
    }
  ]
};

/**
 * Comprehensive Mombasa Content
 */
export const MOMBASA_PILLAR_CONTENT: CityPillarContent = {
  cityName: 'Mombasa',
  overview: `Mombasa, Kenya's second-largest city and principal port, is a vibrant coastal metropolis blending rich Swahili history with modern development. With a population of over 1.2 million people, Mombasa serves as the gateway to East Africa's tourism and shipping industries. The city's tropical climate, Indian Ocean beaches, and strategic economic importance make it an attractive destination for both residential living and property investment.`,

  marketInsights: {
    title: 'Mombasa Real Estate Market Insights',
    content: `The Mombasa property market is characterized by strong demand in beachfront areas, growing suburban developments, and commercial opportunities linked to port expansion. According to Hass Consult, beachfront properties in areas like Nyali and Bamburi have shown steady appreciation of 4-6% annually, while satellite towns like Mtwapa experience higher growth rates. The tourism sector drives demand for short-term rental properties, with Airbnb yields reaching 10-14% in prime locations.`,
    statistics: [
      {
        label: 'Beachfront Property Appreciation',
        value: '4-6% annually',
        source: 'Hass Consult Mombasa Property Index'
      },
      {
        label: 'Short-term Rental Yield',
        value: '10-14%',
        source: 'AirDNA Market Report'
      },
      {
        label: 'Population',
        value: '1.2 million+',
        source: 'Kenya National Bureau of Statistics'
      },
      {
        label: 'Average Apartment Price (Nyali)',
        value: 'KES 6M - 18M',
        source: 'Knight Frank Kenya'
      }
    ],
    trends: [
      'Increasing demand for secure, gated communities along the North Coast',
      'Growing interest in mixed-use developments combining residential and commercial spaces',
      'Expansion of suburbs like Mtwapa, Kilifi, and Diani attracting middle-class buyers',
      'Short-term rental market booming due to tourism recovery post-pandemic',
      'Port and industrial area expansion driving commercial property demand'
    ]
  },

  neighborhoods: {
    title: 'Popular Mombasa Neighborhoods',
    areas: [
      {
        name: 'Nyali',
        description: 'Premium beachfront suburb with luxury homes, modern apartments, and excellent amenities. The most sought-after residential area in Mombasa.',
        priceRange: 'KES 8M - 50M+',
        amenities: ['Nyali Beach', 'City Mall', 'International schools', 'Golf courses', '24/7 security'],
        bestFor: ['Beachfront living', 'Families', 'Expatriates', 'Luxury properties']
      },
      {
        name: 'Bamburi',
        description: 'Established coastal area with mix of beachfront properties and inland estates. Popular for both permanent residence and holiday homes.',
        priceRange: 'KES 5M - 25M',
        amenities: ['Bamburi Beach', 'Haller Park', 'Shopping centers', 'Beach resorts', 'Restaurants'],
        bestFor: ['Holiday homes', 'Rental investment', 'Beach lifestyle']
      },
      {
        name: 'Shanzu',
        description: 'Upscale beachfront area with luxury villas and resort-style living. Known for pristine beaches and tranquil environment.',
        priceRange: 'KES 10M - 60M+',
        amenities: ['Pristine beaches', 'Luxury resorts', 'Water sports', 'Fine dining', 'Spa facilities'],
        bestFor: ['Luxury beachfront', 'High-end investment', 'Holiday rentals']
      },
      {
        name: 'Mtwapa',
        description: 'Fast-growing town between Mombasa and Kilifi with affordable housing and modern infrastructure. Mix of apartments and standalone houses.',
        priceRange: 'KES 3M - 12M',
        amenities: ['Malls', 'Schools', 'Hospitals', 'Mtwapa Creek', 'Entertainment venues'],
        bestFor: ['Affordable housing', 'First-time buyers', 'Growing investment']
      },
      {
        name: 'Diani Beach',
        description: 'World-renowned beach destination south of Mombasa with luxury properties and strong tourism appeal. Premium beachfront investment.',
        priceRange: 'KES 12M - 80M+',
        amenities: ['White sand beaches', 'Water sports', 'Luxury resorts', 'Shopping centers', 'Marine parks'],
        bestFor: ['Luxury beachfront', 'Tourism investment', 'Holiday homes']
      },
      {
        name: 'Nyali Estate (Links)',
        description: 'Established residential area with spacious plots and family homes. Quiet, secure, and well-connected to amenities.',
        priceRange: 'KES 7M - 30M',
        amenities: ['Nyali Golf Club', 'Shopping centers', 'Schools', 'Hospitals', 'Community centers'],
        bestFor: ['Families', 'Permanent residence', 'Stable investment']
      },
      {
        name: 'Kizingo',
        description: 'Historic upscale neighborhood on Mombasa Island with colonial architecture and ocean views. Limited availability drives premium prices.',
        priceRange: 'KES 15M - 70M+',
        amenities: ['Ocean views', 'Mombasa Club', 'Fort Jesus proximity', 'Old Town', 'Premium schools'],
        bestFor: ['Heritage properties', 'Ocean views', 'Established neighborhood']
      },
      {
        name: 'Mombasa CBD',
        description: 'Commercial heart of Mombasa with mixed-use buildings, business premises, and some residential apartments. Strong commercial potential.',
        priceRange: 'KES 4M - 20M',
        amenities: ['Port Reitz', 'Mackinnon Market', 'Banks', 'Government offices', 'Transport hub'],
        bestFor: ['Commercial investment', 'Mixed-use properties', 'Business owners']
      },
      {
        name: 'Kikambala',
        description: 'Peaceful coastal area north of Mombasa with beachfront plots and growing residential developments. More affordable beach living.',
        priceRange: 'KES 4M - 18M',
        amenities: ['Beaches', 'Beach resorts', 'Schools', 'Community centers', 'Growing infrastructure'],
        bestFor: ['Beach plots', 'Affordable beachfront', 'Future growth']
      },
      {
        name: 'Vipingo',
        description: 'Exclusive beachfront development with golf courses, schools, and upscale homes. Planned community with modern amenities.',
        priceRange: 'KES 8M - 45M',
        amenities: ['Vipingo Ridge Golf', 'International school', 'Beach access', 'Sports facilities', 'Secure community'],
        bestFor: ['Golf enthusiasts', 'Families', 'Planned community living']
      }
    ]
  },

  infrastructure: {
    title: 'Infrastructure & Amenities',
    transportation: [
      'Moi International Airport - Gateway to Kenya\'s coast',
      'Port of Mombasa - Largest port in East Africa handling 30M+ tons annually',
      'Standard Gauge Railway (SGR) connecting to Nairobi',
      'Likoni Ferry - Connecting Mombasa Island to South Coast',
      'Nyali Bridge - Major link to North Coast suburbs',
      'Matatu and bus services throughout the city',
      'Uber and Bolt ride-hailing services available'
    ],
    education: [
      'Aga Khan Academy Mombasa - Premier IB World School',
      'Braeburn School Mombasa - International curriculum',
      'Light Academy - Top national school',
      'Technical University of Mombasa',
      'Pwani University',
      'Numerous county and private schools',
      'Coast Institute of Technology'
    ],
    healthcare: [
      'Aga Khan Hospital Mombasa - Leading private hospital',
      'Mombasa Hospital - Comprehensive medical center',
      'Pandya Memorial Hospital - Established healthcare provider',
      'Coast General Teaching & Referral Hospital - Main public hospital',
      'Premier Hospital - Modern private facility',
      'Numerous clinics and pharmacies across all neighborhoods'
    ],
    shopping: [
      'City Mall Nyali - Premium shopping center',
      'Nyali Cinemax - Entertainment and retail',
      'Bamburi Mall - Neighborhood shopping',
      'Likoni Mall - South Coast retail center',
      'Mtwapa Mall - Growing shopping destination',
      'Naivas Supermarket branches',
      'Carrefour hypermarket',
      'Local markets including Mackinnon and Kongowea'
    ]
  },

  investment: {
    title: 'Investment Opportunities in Mombasa',
    content: `Mombasa's real estate market offers unique opportunities driven by tourism, port expansion, and coastal lifestyle appeal. The city's beachfront properties remain premium assets with strong capital appreciation and rental yields. The government's focus on expanding Mombasa Port and developing the Special Economic Zone creates commercial property opportunities. Tourism recovery post-pandemic has boosted short-term rental markets, while affordable housing developments in satellite towns offer accessible entry points.`,
    opportunities: [
      'Beachfront apartments in Nyali, Bamburi for Airbnb with 10-14% yields',
      'Commercial properties near the port and industrial area benefiting from expansion',
      'Land in growing corridors like Mtwapa, Kikambala, Vipingo with 8-12% appreciation',
      'Holiday villas in Diani for luxury short-term rentals',
      'Affordable housing in satellite towns targeting middle-income earners',
      'Mixed-use developments combining residential and retail in growing suburbs',
      'Student accommodation near Technical University and Pwani University'
    ],
    considerations: [
      'Verify land ownership through official title searches to avoid fraudulent sales',
      'Consider proximity to beaches and impact on rental potential',
      'Factor in seasonal tourism fluctuations for short-term rental income',
      'Assess flood risks in low-lying coastal areas during rainy seasons',
      'Review estate management and security in gated communities',
      'Understand local regulations for beachfront developments',
      'Consider salt water corrosion effects on buildings - use appropriate materials'
    ]
  },

  authoritative_sources: [
    {
      label: 'Kenya Ports Authority',
      url: 'https://www.kpa.co.ke',
      description: 'Official port statistics, expansion plans affecting property and commercial development'
    },
    {
      label: 'Kenya National Bureau of Statistics',
      url: 'https://www.knbs.or.ke',
      description: 'Demographic and economic data for Mombasa County'
    },
    {
      label: 'Hass Consult - Mombasa Property Index',
      url: 'https://www.hassconsult.co.ke',
      description: 'Quarterly property prices and rental trends for Mombasa real estate'
    },
    {
      label: 'Mombasa County Government',
      url: 'https://mombasa.go.ke',
      description: 'County planning, development approvals, and regulations'
    },
    {
      label: 'Kenya Tourism Board',
      url: 'https://www.magicalkenya.com',
      description: 'Tourism statistics affecting hospitality and short-term rental markets'
    },
    {
      label: 'Knight Frank Kenya - Coastal Report',
      url: 'https://www.knightfrank.co.ke',
      description: 'Professional coastal property market analysis and trends'
    }
  ]
};

/**
 * Comprehensive Nakuru Content
 */
export const NAKURU_PILLAR_CONTENT: CityPillarContent = {
  cityName: 'Nakuru',
  overview: `Nakuru, Kenya's fourth-largest city and a major hub in the Rift Valley, is rapidly transforming into a commercial and industrial powerhouse. With a population of over 570,000 and granted city status in 2021, Nakuru benefits from fertile agricultural lands, geothermal energy projects, and strategic location along the Nairobi-Kisumu highway. The city's diverse economy and growing infrastructure make it an attractive destination for property investment.`,

  marketInsights: {
    title: 'Nakuru Real Estate Market Insights',
    content: `Nakuru's property market has experienced consistent growth following its elevation to city status. The city's strategic location, expanding industrial base, and agricultural prosperity have driven steady demand for both residential and commercial properties. According to local market reports, property values have appreciated by 6-9% annually in prime areas, while the rental market remains robust with yields of 8-11% for residential properties.`,
    statistics: [
      {
        label: 'Property Appreciation',
        value: '6-9% annually',
        source: 'Hass Consult Rift Valley Index'
      },
      {
        label: 'Rental Yield',
        value: '8-11%',
        source: 'Local real estate surveys'
      },
      {
        label: 'Population',
        value: '570,000+',
        source: 'Kenya National Bureau of Statistics'
      },
      {
        label: 'Average Property Price',
        value: 'KES 3M - 18M',
        source: 'Knight Frank Kenya'
      }
    ],
    trends: [
      'City status driving increased infrastructure investment and property development',
      'Industrial estates in Nakuru East experiencing high demand for commercial properties',
      'Geothermal energy projects attracting businesses and boosting local economy',
      'Satellite towns like Naivasha and Gilgil benefiting from spillover demand',
      'Growing interest from Nairobi investors seeking affordable alternatives with high returns'
    ]
  },

  neighborhoods: {
    title: 'Popular Nakuru Neighborhoods',
    areas: [
      {
        name: 'Milimani',
        description: 'Upscale residential area on elevated ground with panoramic views of the city. Home to diplomatic residences and affluent families.',
        priceRange: 'KES 8M - 25M',
        amenities: ['Rift Valley Provincial Hospital proximity', 'Top schools', 'Secure neighborhoods', 'Good roads', 'Shopping centers'],
        bestFor: ['Established families', 'Professionals', 'Diplomatic community', 'Quiet living']
      },
      {
        name: 'Section 58',
        description: 'Well-established middle-class residential area with good infrastructure and amenities. Popular among working professionals.',
        priceRange: 'KES 4M - 12M',
        amenities: ['Shopping centers', 'Schools', 'Healthcare facilities', 'Sports clubs', 'Good transport links'],
        bestFor: ['Middle-income families', 'First-time buyers', 'Rental investment']
      },
      {
        name: 'Nakuru CBD',
        description: 'Commercial heart of the city with mixed-use buildings. High demand for commercial spaces and upper-floor apartments.',
        priceRange: 'KES 3M - 15M',
        amenities: ['Banks', 'Government offices', 'Retail shops', 'Restaurants', 'Transport hub'],
        bestFor: ['Commercial investment', 'Business owners', 'Mixed-use properties']
      },
      {
        name: 'Lanet',
        description: 'Growing residential and commercial area near military barracks. Affordable housing with good rental demand.',
        priceRange: 'KES 2.5M - 8M',
        amenities: ['Schools', 'Markets', 'Health centers', 'Good road access', 'Public transport'],
        bestFor: ['Affordable housing', 'Rental income', 'First-time investors']
      },
      {
        name: 'Bahati',
        description: 'Peri-urban area with agricultural land and residential developments. Popular for large plots and mixed farming.',
        priceRange: 'KES 1.5M - 6M',
        amenities: ['Agricultural land', 'Schools', 'Markets', 'Growing infrastructure', 'Community centers'],
        bestFor: ['Agricultural investments', 'Large plots', 'Affordable entry']
      },
      {
        name: 'Naivasha',
        description: 'Major satellite town 45km from Nakuru with booming horticulture industry and tourism. Rapid development along Moi South Lake Road.',
        priceRange: 'KES 2M - 15M',
        amenities: ['Lake Naivasha', 'Flower farms', 'Geothermal spa', 'Hotels', 'Hell\'s Gate National Park'],
        bestFor: ['Tourism investment', 'Agricultural workers', 'Weekend getaways', 'Geothermal sector workers']
      }
    ]
  },

  infrastructure: {
    title: 'Infrastructure & Amenities',
    transportation: [
      'Nakuru Railway Station - Standard Gauge Railway (SGR) to Nairobi',
      'Nairobi-Nakuru-Eldoret Highway (A104) - Major commercial route',
      'Nakuru Airstrip - Domestic flights',
      'Well-developed urban matatu network',
      'Easy access to Naivasha and Gilgil',
      'Planned Nakuru-Kisumu railway extension'
    ],
    education: [
      'Egerton University - Leading agricultural university',
      'Kabarak University - Private university',
      'Rift Valley Institute of Science and Technology',
      'Nakuru Technical Training Institute',
      'Menengai High School',
      'St. Mary\'s Girls School Nakuru',
      'Numerous county and private schools'
    ],
    healthcare: [
      'Nakuru Level 5 Hospital (County Referral)',
      'War Memorial Hospital',
      'Rift Valley Provincial General Hospital',
      'Valley Hospital (private)',
      'Mediheal Hospital',
      'Mount Kenya University Hospital',
      'Numerous clinics and health centers'
    ],
    shopping: [
      'Nakumatt Mega City',
      'Westside Mall',
      'Barnabas Centre',
      'Naivas Supermarket branches',
      'Tuskys and Quickmart outlets',
      'Nakuru Municipal Market',
      'Various shopping centers in CBD'
    ]
  },

  investment: {
    title: 'Investment Opportunities in Nakuru',
    content: `Nakuru presents compelling investment opportunities driven by city status, geothermal energy projects, and industrial expansion. The manufacturing sector's growth, coupled with agricultural productivity (floriculture, dairy, wheat), creates steady rental demand. Affordable property prices compared to Nairobi, combined with strong appreciation rates, make Nakuru attractive for investors seeking value and growth potential.`,
    opportunities: [
      'Residential apartments in Section 58 and Milimani areas offering 8-10% rental yields',
      'Commercial properties in CBD benefiting from city status and business growth',
      'Industrial warehouses in Nakuru East Industrial Area',
      'Student accommodation near Egerton University and Kabarak University',
      'Land banking in expansion corridors (Naivasha Road, Eldoret Road)',
      'Affordable housing developments targeting middle-income earners',
      'Tourism-related properties in Naivasha (Airbnbs, guesthouses)'
    ],
    considerations: [
      'Verify land titles through official searches at Nakuru Lands Office',
      'Consider proximity to geothermal projects and industrial areas for commercial investments',
      'Assess water availability - some areas face seasonal water challenges',
      'Factor in road access quality when evaluating properties',
      'Review county regulations for new constructions and subdivisions',
      'Consider rental demand from students, workers in flower farms, and geothermal sector',
      'Evaluate flood risk in low-lying areas during rainy seasons'
    ]
  },

  authoritative_sources: [
    {
      label: 'Kenya National Bureau of Statistics',
      url: 'https://www.knbs.or.ke',
      description: 'Population and economic statistics for Nakuru County'
    },
    {
      label: 'Nakuru County Government',
      url: 'https://nakuru.go.ke',
      description: 'Official county planning, development, and regulatory information'
    },
    {
      label: 'Hass Consult Property Index',
      url: 'https://www.hassconsult.co.ke',
      description: 'Property market trends for Nakuru and Rift Valley region'
    },
    {
      label: 'Kenya Electricity Generating Company (KenGen)',
      url: 'https://www.kengen.co.ke',
      description: 'Menengai Geothermal Project information and development impact'
    },
    {
      label: 'Kenya Flower Council',
      url: 'https://www.kenyaflowers.co.ke',
      description: 'Floriculture industry data affecting employment and housing demand'
    }
  ]
};

/**
 * Comprehensive Kisumu Content
 */
export const KISUMU_PILLAR_CONTENT: CityPillarContent = {
  cityName: 'Kisumu',
  overview: `Kisumu, Kenya's third-largest city with a population of 610,000+, is the principal city of Western Kenya and the main port on Lake Victoria. As a major commercial hub connecting Kenya, Uganda, and Tanzania, Kisumu plays a vital role in regional trade. Recent infrastructure investments including port modernization, airport upgrades, and planned SGR extension position Kisumu for significant growth and investment potential.`,

  marketInsights: {
    title: 'Kisumu Real Estate Market Insights',
    content: `Kisumu's property market is experiencing renewed growth driven by infrastructure projects and its role as a regional trade hub. The city's lakefront location and improving connectivity have attracted investors seeking value opportunities. Property prices remain affordable compared to Nairobi and Mombasa, with strong appreciation potential as major projects like the Kisumu Port expansion and airport upgrade near completion.`,
    statistics: [
      {
        label: 'Property Appreciation',
        value: '5-8% annually',
        source: 'Hass Consult Nyanza Index'
      },
      {
        label: 'Rental Yield',
        value: '9-12%',
        source: 'Local property surveys'
      },
      {
        label: 'Population',
        value: '610,000+',
        source: 'Kenya National Bureau of Statistics'
      },
      {
        label: 'Average Property Price',
        value: 'KES 2.5M - 15M',
        source: 'Knight Frank Kenya'
      }
    ],
    trends: [
      'Kisumu Port expansion creating demand for commercial and residential properties',
      'Lakefront development projects attracting tourism and hospitality investments',
      'Improved road networks connecting Kisumu to Kericho, Kakamega increasing property values',
      'Growing demand for quality housing from international organizations and NGOs',
      'Industrial area expansion along Nairobi Road creating warehouse and factory opportunities'
    ]
  },

  neighborhoods: {
    title: 'Popular Kisumu Neighborhoods',
    areas: [
      {
        name: 'Milimani',
        description: 'Upscale residential area with views of Lake Victoria. Home to expatriates, diplomats, and affluent families.',
        priceRange: 'KES 6M - 20M',
        amenities: ['Lake views', 'International schools', 'Secure estates', 'Proximity to CBD', 'Top healthcare'],
        bestFor: ['Expatriates', 'Senior professionals', 'Luxury living', 'Established families']
      },
      {
        name: 'Mamboleo',
        description: 'Rapidly developing residential area along Kisumu-Kakamega Road. Mix of apartments and standalone houses.',
        priceRange: 'KES 3M - 10M',
        amenities: ['Shopping centers', 'Schools', 'Healthcare facilities', 'Good roads', 'Public transport'],
        bestFor: ['Middle-income families', 'Rental investment', 'First-time buyers']
      },
      {
        name: 'Riat',
        description: 'Growing residential and commercial area between CBD and airport. High rental demand from businesses.',
        priceRange: 'KES 2.5M - 8M',
        amenities: ['Airport proximity', 'Industrial area access', 'Markets', 'Schools', 'Transport links'],
        bestFor: ['Rental income', 'Mixed-use development', 'Business accommodation']
      },
      {
        name: 'Kisumu CBD',
        description: 'Commercial center with mixed-use buildings. Lakefront redevelopment creating modern commercial spaces.',
        priceRange: 'KES 3M - 12M',
        amenities: ['Kisumu Port', 'Jomo Kenyatta Sports Ground', 'Banks', 'Markets', 'Government offices'],
        bestFor: ['Commercial investment', 'Retail spaces', 'Office buildings']
      },
      {
        name: 'Dunga Beach Area',
        description: 'Lakefront area being developed for tourism. Opportunities for hospitality and recreational businesses.',
        priceRange: 'KES 4M - 15M',
        amenities: ['Lake Victoria access', 'Beach facilities', 'Restaurants', 'Boat rides', 'Tourist activities'],
        bestFor: ['Tourism investment', 'Airbnb', 'Hospitality', 'Waterfront properties']
      },
      {
        name: 'Tom Mboya Estate',
        description: 'Affordable residential area with strong rental demand. Popular among working-class families.',
        priceRange: 'KES 1.5M - 5M',
        amenities: ['Schools', 'Markets', 'Health centers', 'Community facilities', 'Good transport'],
        bestFor: ['Affordable housing', 'High rental demand', 'Entry-level investment']
      }
    ]
  },

  infrastructure: {
    title: 'Infrastructure & Amenities',
    transportation: [
      'Kisumu International Airport - Direct flights to Nairobi, Mombasa',
      'Kisumu Port - Largest port on Lake Victoria (modernization ongoing)',
      'Nairobi-Kisumu Highway (A104) - Recently upgraded',
      'Kisumu-Kakamega Road - Improved connectivity',
      'Planned SGR extension from Naivasha to Kisumu',
      'Urban matatu and boda boda network',
      'Lake Victoria ferry services'
    ],
    education: [
      'Maseno University (30km away)',
      'Jaramogi Oginga Odinga University of Science and Technology',
      'Kisumu National Polytechnic',
      'Great Lakes University',
      'Kisumu Boys High School',
      'St. Anne\'s Girls School',
      'International schools for expatriate families'
    ],
    healthcare: [
      'Jaramogi Oginga Odinga Teaching and Referral Hospital',
      'Aga Khan Hospital Kisumu',
      'Kisumu County Hospital',
      'Nightingale Hospital',
      'The Jaramogi Oginga Odinga University Teaching Hospital',
      'Mission hospitals and private clinics'
    ],
    shopping: [
      'West End Shopping Mall',
      'United Mall',
      'Mega Plaza',
      'Naivas Kisumu',
      'Tuskys Mega',
      'Kibuye Market',
      'Various shopping centers in CBD'
    ]
  },

  investment: {
    title: 'Investment Opportunities in Kisumu',
    content: `Kisumu offers excellent value investment opportunities with significant growth potential. The city's role as a regional trade hub, ongoing port and airport expansions, and planned SGR extension create a compelling case for property investment. Affordable entry prices, high rental yields, and infrastructure-driven appreciation make Kisumu attractive for investors seeking emerging markets with strong fundamentals.`,
    opportunities: [
      'Commercial properties near port and industrial area benefiting from trade expansion',
      'Residential apartments in Mamboleo and Milimani with 9-12% rental yields',
      'Lakefront properties for tourism and hospitality (Airbnb, hotels)',
      'Student accommodation near universities (JOOUST, Maseno)',
      'Warehouses and go-downs in industrial area serving regional trade',
      'Mixed-use developments in CBD benefiting from lakefront renewal',
      'Land along major highways (Kakamega Road, Busia Road) for future appreciation'
    ],
    considerations: [
      'Verify titles at Kisumu Lands Office - historical land disputes in some areas',
      'Consider flood risk near lake and low-lying areas',
      'Assess rental market based on proximity to employment centers (port, industrial area)',
      'Factor in seasonal tourism patterns for hospitality investments',
      'Review infrastructure development plans and timelines',
      'Consider security and neighborhood reputation',
      'Evaluate water and electricity reliability for commercial properties'
    ]
  },

  authoritative_sources: [
    {
      label: 'Kenya National Bureau of Statistics',
      url: 'https://www.knbs.or.ke',
      description: 'Demographic and economic data for Kisumu County'
    },
    {
      label: 'Kisumu County Government',
      url: 'https://kisumu.go.ke',
      description: 'County planning, development approvals, and regulations'
    },
    {
      label: 'Kenya Ports Authority',
      url: 'https://www.kpa.co.ke',
      description: 'Kisumu Port operations and expansion plans'
    },
    {
      label: 'Lake Victoria South Water Services Board',
      url: 'https://lvswsb.go.ke',
      description: 'Water infrastructure and development projects'
    },
    {
      label: 'Hass Consult Property Index',
      url: 'https://www.hassconsult.co.ke',
      description: 'Nyanza region property market trends and analysis'
    }
  ]
};

/**
 * Comprehensive Eldoret Content (Uasin Gishu County)
 */
export const ELDORET_PILLAR_CONTENT: CityPillarContent = {
  cityName: 'Eldoret',
  overview: `Eldoret, Kenya's fifth-largest city in Uasin Gishu County, is a thriving agricultural and commercial hub with a population of 475,000+. Known as the "Home of Champions" for producing world-class athletes, Eldoret benefits from fertile farmlands, a temperate climate, and strategic location along the Nairobi-Kampala highway. The city's growing economy, affordable property prices, and expanding infrastructure make it an attractive destination for investors and families alike.`,

  marketInsights: {
    title: 'Eldoret Real Estate Market Insights',
    content: `Eldoret's property market has experienced steady growth driven by agricultural prosperity and strategic location as a gateway to Uganda and South Sudan. The city offers excellent value with property prices 30-40% lower than Nairobi, yet delivering comparable or higher rental yields. Recent infrastructure improvements and aviation sector growth have boosted investor confidence, with property values appreciating 7-10% annually in prime areas.`,
    statistics: [
      {
        label: 'Property Appreciation',
        value: '7-10% annually',
        source: 'Hass Consult Rift Valley Index'
      },
      {
        label: 'Rental Yield',
        value: '10-14%',
        source: 'Local real estate surveys'
      },
      {
        label: 'Population',
        value: '475,000+',
        source: 'Kenya National Bureau of Statistics'
      },
      {
        label: 'Average Property Price',
        value: 'KES 2M - 12M',
        source: 'Knight Frank Kenya'
      }
    ],
    trends: [
      'Growing demand from Nairobi investors seeking affordable high-yield properties',
      'Aviation sector expansion (Eldoret Airport) driving hotel and commercial demand',
      'University student population creating strong rental market for bedsitters and 1-bedrooms',
      'Agricultural wealth supporting luxury property development in upscale areas',
      'Industrial area growth along Nairobi-Eldoret highway attracting warehousing investments'
    ]
  },

  neighborhoods: {
    title: 'Popular Eldoret Neighborhoods',
    areas: [
      {
        name: 'Pioneer',
        description: 'Upscale residential area with large compounds and modern homes. Popular among wealthy farmers and business owners.',
        priceRange: 'KES 8M - 25M',
        amenities: ['Eldoret Golf Club', 'Top schools', 'Secure estates', 'Shopping centers', 'Healthcare facilities'],
        bestFor: ['Affluent families', 'Luxury living', 'Large properties', 'Established professionals']
      },
      {
        name: 'Elgon View',
        description: 'Growing middle-to-upper class residential area with apartments and townhouses. Good infrastructure and amenities.',
        priceRange: 'KES 4M - 12M',
        amenities: ['Schools', 'Shopping centers', 'Health clinics', 'Sports facilities', 'Good roads'],
        bestFor: ['Families', 'Professionals', 'Rental investment', 'Modern living']
      },
      {
        name: 'Langas',
        description: 'Affordable residential area popular with working-class families. High rental demand from university staff and students.',
        priceRange: 'KES 2M - 6M',
        amenities: ['Schools', 'Markets', 'Health centers', 'Public transport', 'Community facilities'],
        bestFor: ['Affordable housing', 'Rental income', 'First-time buyers', 'High occupancy']
      },
      {
        name: 'Eldoret CBD',
        description: 'Commercial heart with mixed-use buildings. Growing demand for modern office and retail spaces.',
        priceRange: 'KES 3M - 15M',
        amenities: ['Banks', 'Government offices', 'Retail shops', 'Hotels', 'Transport hub'],
        bestFor: ['Commercial investment', 'Mixed-use properties', 'Retail spaces']
      },
      {
        name: 'Kapsoya',
        description: 'Residential area near Moi University with strong student accommodation demand. Mix of apartments and rental units.',
        priceRange: 'KES 2.5M - 8M',
        amenities: ['Moi University proximity', 'Schools', 'Markets', 'Transport', 'Student-friendly businesses'],
        bestFor: ['Student accommodation', 'Rental income', 'University workers', 'High yields']
      },
      {
        name: 'Burnt Forest',
        description: 'Satellite town 30km from Eldoret with agricultural base. Affordable land and growing residential developments.',
        priceRange: 'KES 1M - 5M',
        amenities: ['Agricultural land', 'Schools', 'Markets', 'Highway access', 'Community centers'],
        bestFor: ['Agricultural investment', 'Affordable land', 'Long-term appreciation', 'Mixed farming']
      }
    ]
  },

  infrastructure: {
    title: 'Infrastructure & Amenities',
    transportation: [
      'Eldoret International Airport - International and domestic flights',
      'Nairobi-Eldoret Highway (A104) - Recently upgraded dual carriageway',
      'Eldoret-Malaba Road - Gateway to Uganda',
      'Eldoret Railway Station - Planned SGR extension',
      'Well-developed urban matatu network',
      'Proximity to Uganda border (Malaba) for regional trade'
    ],
    education: [
      'Moi University - Major public university',
      'University of Eldoret',
      'Catholic University of Eastern Africa (CUEA) Eldoret Campus',
      'Eldoret National Polytechnic',
      'Moi High School',
      'Kapsabet Boys High School (nearby)',
      'Numerous private and public schools'
    ],
    healthcare: [
      'Moi Teaching and Referral Hospital - Leading regional hospital',
      'Eldoret Hospital',
      'Mediheal Hospital',
      'St. Luke\'s Orthopaedic and Trauma Hospital',
      'Eldoret Provincial General Hospital',
      'Numerous private clinics and health centers'
    ],
    shopping: [
      'Zucchini Mall',
      'Rupa\'s Mall',
      'Naivas Eldoret',
      'Tuskys Supermarket',
      'Chepkulei Complex',
      'Various shopping centers in CBD',
      'Eldoret Municipal Market'
    ]
  },

  investment: {
    title: 'Investment Opportunities in Eldoret',
    content: `Eldoret presents exceptional investment value with some of the highest rental yields in Kenya (10-14%). The city's agricultural wealth, university student population, and growing commercial sector create diverse opportunities. Affordable property prices compared to major cities, combined with strong appreciation and high occupancy rates, make Eldoret ideal for investors seeking cash flow and capital growth.`,
    opportunities: [
      'Student accommodation near Moi University and University of Eldoret (12-15% yields)',
      'Buy-to-let apartments in Langas and Kapsoya for working professionals',
      'Commercial properties in CBD benefiting from regional trade growth',
      'Warehouses along Nairobi-Eldoret highway for logistics businesses',
      'Luxury homes in Pioneer and Elgon View for affluent farmers and executives',
      'Land banking along expansion corridors (Iten Road, Burnt Forest)',
      'Hotels and guesthouses near airport for aviation sector growth'
    ],
    considerations: [
      'Verify land ownership through official searches at Eldoret Lands Office',
      'Consider student term cycles when calculating rental income projections',
      'Assess proximity to universities for student accommodation investments',
      'Factor in agricultural season impact on luxury property demand',
      'Review building approvals and county zoning regulations',
      'Consider security and neighborhood reputation for family housing',
      'Evaluate access to amenities and transport for rental properties'
    ]
  },

  authoritative_sources: [
    {
      label: 'Kenya National Bureau of Statistics',
      url: 'https://www.knbs.or.ke',
      description: 'Population and economic statistics for Uasin Gishu County'
    },
    {
      label: 'Uasin Gishu County Government',
      url: 'https://uasingishu.go.ke',
      description: 'County planning, development approvals, and regulations'
    },
    {
      label: 'Moi University',
      url: 'https://www.mu.ac.ke',
      description: 'University information affecting student accommodation demand'
    },
    {
      label: 'Kenya Airports Authority',
      url: 'https://www.kaa.go.ke',
      description: 'Eldoret Airport expansion and aviation sector development'
    },
    {
      label: 'Hass Consult Property Index',
      url: 'https://www.hassconsult.co.ke',
      description: 'Rift Valley property market trends and Eldoret-specific data'
    }
  ]
};

/**
 * Get comprehensive content for a specific city
 */
export function getCityPillarContent(cityName: string): CityPillarContent | null {
  const normalizedCity = cityName.toLowerCase();

  if (normalizedCity.includes('nairobi')) {
    return NAIROBI_PILLAR_CONTENT;
  } else if (normalizedCity.includes('mombasa')) {
    return MOMBASA_PILLAR_CONTENT;
  } else if (normalizedCity.includes('nakuru')) {
    return NAKURU_PILLAR_CONTENT;
  } else if (normalizedCity.includes('kisumu')) {
    return KISUMU_PILLAR_CONTENT;
  } else if (normalizedCity.includes('eldoret') || normalizedCity.includes('uasin gishu')) {
    return ELDORET_PILLAR_CONTENT;
  }

  return null;
}

/**
 * Check if location qualifies for comprehensive pillar content
 */
export function hasPillarContent(location: Location): boolean {
  if (location.type !== 'county') return false;

  const cityName = location.name.toLowerCase();
  return cityName.includes('nairobi') ||
         cityName.includes('mombasa') ||
         cityName.includes('nakuru') ||
         cityName.includes('kisumu') ||
         cityName.includes('eldoret') ||
         cityName.includes('uasin gishu');
}
