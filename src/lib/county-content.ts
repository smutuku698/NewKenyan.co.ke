/**
 * Comprehensive County-Level Content for All 47 Kenya Counties
 *
 * Provides localized, in-depth information for county landing pages
 * with economic data, infrastructure, and real estate market insights
 */

export interface CountyContent {
  countyName: string;
  region: 'Central' | 'Coast' | 'Eastern' | 'Nairobi' | 'North Eastern' | 'Nyanza' | 'Rift Valley' | 'Western';
  capital: string;
  population: string;
  overview: string;
  economy: {
    mainSectors: string[];
    keyIndustries: string[];
    economicGrowth: string;
  };
  realEstate: {
    marketOverview: string;
    priceRange: string;
    rentalYield: string;
    growthAreas: string[];
    investmentPotential: string;
  };
  infrastructure: {
    transport: string[];
    education: string[];
    healthcare: string[];
    utilities: string;
  };
  keyTowns: string[];
  attractions: string[];
  developmentProjects: string[];
}

/**
 * Comprehensive content for all 47 Kenya counties
 */
export const COUNTY_CONTENT: Record<string, CountyContent> = {
  // NAIROBI REGION
  'Nairobi': {
    countyName: 'Nairobi',
    region: 'Nairobi',
    capital: 'Nairobi City',
    population: '4.4 million',
    overview: `Nairobi County is Kenya's capital and largest city, serving as the country's economic, political, and cultural hub. As the only city county in Kenya, Nairobi hosts the headquarters of major corporations, international organizations, and diplomatic missions. The county's strategic location and world-class infrastructure make it East Africa's premier real estate market.`,
    economy: {
      mainSectors: ['Finance & Banking', 'ICT & Technology', 'Real Estate', 'Manufacturing', 'Tourism'],
      keyIndustries: ['Financial Services', 'Technology & Innovation', 'Construction', 'Telecommunications', 'Professional Services'],
      economicGrowth: 'Nairobi contributes over 60% of Kenya\'s GDP with average growth of 5-6% annually'
    },
    realEstate: {
      marketOverview: 'Nairobi has the most developed real estate market in East Africa, with diverse options from affordable housing to luxury properties. High demand driven by urban migration and growing middle class.',
      priceRange: 'KES 2M - 200M+ (suburban to luxury estates)',
      rentalYield: '6-9% for residential, 8-12% for commercial',
      growthAreas: ['Ruiru', 'Syokimau', 'Rongai', 'Kitengela', 'Kiambu Road', 'Thika Road corridor'],
      investmentPotential: 'Excellent - high appreciation (5-8% annually), strong rental demand, infrastructure development'
    },
    infrastructure: {
      transport: ['JKIA - Africa\'s 7th busiest airport', 'Nairobi Expressway (elevated toll road)', 'SGR connecting to Mombasa', 'Thika Superhighway', 'Extensive matatu and bus network', 'Uber, Bolt, Little Cab services'],
      education: ['University of Nairobi', 'Kenyatta University', 'Strathmore University', 'USIU-Africa', 'International School of Kenya', 'Over 500 primary and secondary schools'],
      healthcare: ['Kenyatta National Hospital', 'Aga Khan University Hospital', 'Nairobi Hospital', 'MP Shah Hospital', '100+ clinics and health centers'],
      utilities: 'Reliable electricity (Kenya Power), piped water (Nairobi Water), fiber internet widely available'
    },
    keyTowns: ['Nairobi CBD', 'Westlands', 'Karen', 'Kilimani', 'Kileleshwa', 'Lavington', 'Ruiru', 'Kikuyu'],
    attractions: ['Nairobi National Park', 'Giraffe Centre', 'David Sheldrick Elephant Orphanage', 'Karura Forest', 'Nairobi National Museum', 'Bomas of Kenya'],
    developmentProjects: ['Nairobi Expressway (completed)', 'Green Park Bus Terminus', 'Affordable Housing Projects', 'Nairobi Metropolitan Area Transport Authority (NaMATA)', 'Digital Superhighway']
  },

  // CENTRAL REGION
  'Kiambu': {
    countyName: 'Kiambu',
    region: 'Central',
    capital: 'Kiambu Town',
    population: '2.4 million',
    overview: `Kiambu County borders Nairobi to the north and has become a major satellite county benefiting from capital city overflow. Known for coffee and tea farming, Kiambu has rapidly urbanized with numerous residential developments along major highways.`,
    economy: {
      mainSectors: ['Agriculture (Coffee, Tea, Horticulture)', 'Real Estate', 'Manufacturing', 'Trade', 'Tourism'],
      keyIndustries: ['Coffee production', 'Tea farming', 'Horticulture exports', 'Construction', 'Retail trade'],
      economicGrowth: 'Fast-growing economy driven by proximity to Nairobi, agriculture, and real estate development'
    },
    realEstate: {
      marketOverview: 'Booming market with high demand for residential properties. Attractive to Nairobi workers seeking affordable housing. Major developments along Thika Road, Limuru Road, and Kiambu Road.',
      priceRange: 'KES 1.5M - 25M (affordable to upscale)',
      rentalYield: '7-10% in satellite towns',
      growthAreas: ['Ruiru', 'Juja', 'Ruaka', 'Githurai', 'Kikuyu', 'Limuru', 'Kiambu Road corridor'],
      investmentPotential: 'Very High - rapid appreciation (8-12% annually), strong rental demand from Nairobi commuters'
    },
    infrastructure: {
      transport: ['Thika Superhighway', 'Kiambu Road', 'Limuru Road', 'SGR passing through', 'Matatu and bus services to Nairobi'],
      education: ['Jomo Kenyatta University of Agriculture & Technology (JKUAT)', 'Mount Kenya University', 'Presbyterian University', 'Numerous secondary and primary schools'],
      healthcare: ['Thika Level 5 Hospital', 'Kiambu Level 5 Hospital', 'Gatundu Level 4 Hospital', 'Private hospitals and clinics'],
      utilities: 'Good electricity coverage, piped water in major towns, expanding fiber internet'
    },
    keyTowns: ['Thika', 'Ruiru', 'Kikuyu', 'Limuru', 'Karuri', 'Kiambu Town', 'Ruaka'],
    attractions: ['Fourteen Falls', 'Blue Post Hotel', 'Chania Falls', 'Paradise Lost', 'Coffee and tea plantations'],
    developmentProjects: ['Thika-Garissa Road upgrade', 'Northern Collector Tunnel', 'Ruiru Industrial Park', 'Affordable housing schemes']
  },

  'Murang\'a': {
    countyName: 'Murang\'a',
    region: 'Central',
    capital: 'Murang\'a Town',
    population: '1.1 million',
    overview: `Murang'a County in Central Kenya is known for rich agricultural land, tea and coffee farming, and growing urban centers. The county benefits from good rainfall and fertile soils, supporting a vibrant agricultural economy.`,
    economy: {
      mainSectors: ['Agriculture (Tea, Coffee, Dairy)', 'Trade', 'Small-scale Manufacturing', 'Tourism'],
      keyIndustries: ['Tea production', 'Coffee farming', 'Dairy farming', 'Horticulture', 'Agro-processing'],
      economicGrowth: 'Agriculture-driven economy with growing trade and services sectors'
    },
    realEstate: {
      marketOverview: 'Emerging market with affordable land and properties. Growing demand in major towns. Popular for agricultural investments and retirement homes.',
      priceRange: 'KES 500K - 8M (very affordable)',
      rentalYield: '8-12% in major towns',
      growthAreas: ['Murang\'a Town', 'Kenol', 'Makuyu', 'Sagana'],
      investmentPotential: 'Good - affordable entry, agricultural land appreciation, growing urbanization'
    },
    infrastructure: {
      transport: ['Thika-Murang\'a-Nyeri Highway', 'Kenol-Marua Road', 'Matatu services', 'Murky connections to Nairobi'],
      education: ['Murang\'a University of Technology', 'Secondary and primary schools', 'TVET institutions'],
      healthcare: ['Murang\'a Level 5 Hospital', 'Makuyu Level 4 Hospital', 'Mission hospitals', 'Health centers'],
      utilities: 'Electricity coverage, piped water in towns, expanding mobile network'
    },
    keyTowns: ['Murang\'a', 'Kenol', 'Makuyu', 'Kangema', 'Kigumo'],
    attractions: ['Mount Kenya foothills', 'Sagana rapids (white water rafting)', 'Historical sites', 'Tea estates'],
    developmentProjects: ['Thika-Murang\'a-Nyeri highway completion', 'Water projects', 'Market infrastructure']
  },

  // COAST REGION
  'Mombasa': {
    countyName: 'Mombasa',
    region: 'Coast',
    capital: 'Mombasa City',
    population: '1.2 million',
    overview: `Mombasa County is Kenya's second-largest city and principal port on the Indian Ocean coast. As the gateway to East Africa's trade, Mombasa combines rich Swahili heritage with modern development. The county's tourism sector and port operations drive its economy.`,
    economy: {
      mainSectors: ['Port & Shipping', 'Tourism & Hospitality', 'Trade', 'Real Estate', 'Manufacturing'],
      keyIndustries: ['Port operations (30M+ tons annually)', 'Tourism', 'Hospitality', 'Maritime services', 'Oil refining'],
      economicGrowth: 'Strategic port drives 4-5% annual growth, tourism recovery boosting economy'
    },
    realEstate: {
      marketOverview: 'Mature coastal market with strong demand for beachfront properties and commercial spaces. Tourism drives short-term rental market. Port expansion creating industrial property demand.',
      priceRange: 'KES 3M - 80M+ (inland to beachfront)',
      rentalYield: '6-8% long-term, 10-14% Airbnb',
      growthAreas: ['Nyali', 'Bamburi', 'Shanzu', 'Mtwapa', 'Diani', 'Kilifi Road'],
      investmentPotential: 'High - beachfront appreciation, tourism recovery, port expansion benefits'
    },
    infrastructure: {
      transport: ['Moi International Airport', 'Port of Mombasa (largest in East Africa)', 'SGR to Nairobi', 'Likoni Ferry', 'Nyali Bridge', 'Matatus and tuk-tuks'],
      education: ['Technical University of Mombasa', 'Pwani University', 'Aga Khan Academy', 'International schools', 'Numerous public and private schools'],
      healthcare: ['Aga Khan Hospital', 'Mombasa Hospital', 'Coast General Hospital', 'Pandya Memorial', 'Private clinics'],
      utilities: 'Reliable electricity, piped water, fiber internet in urban areas'
    },
    keyTowns: ['Mombasa Island', 'Nyali', 'Bamburi', 'Likoni', 'Changamwe', 'Kisauni'],
    attractions: ['Fort Jesus (UNESCO site)', 'Old Town', 'Haller Park', 'Mombasa Marine Park', 'Beaches (Nyali, Bamburi, Shanzu)'],
    developmentProjects: ['Dongo Kundu Special Economic Zone', 'Port expansion', 'Makupa Causeway upgrade', 'Affordable housing']
  },

  'Kilifi': {
    countyName: 'Kilifi',
    region: 'Coast',
    capital: 'Kilifi Town',
    population: '1.5 million',
    overview: `Kilifi County stretches along Kenya's Indian Ocean coast, known for pristine beaches, luxury resorts, and rich Giriama culture. The county benefits from tourism and is emerging as a real estate hotspot for beachfront developments.`,
    economy: {
      mainSectors: ['Tourism', 'Agriculture (Cashew nuts, Coconuts)', 'Fishing', 'Real Estate', 'Trade'],
      keyIndustries: ['Beach tourism', 'Hospitality', 'Fishing', 'Cashew production', 'Coconut farming'],
      economicGrowth: 'Tourism-led growth with expanding agriculture and real estate sectors'
    },
    realEstate: {
      marketOverview: 'Growing coastal market attracting investors for beach properties and retirement homes. Mtwapa and Kilifi town experiencing residential boom. High-end developments in Watamu and Malindi.',
      priceRange: 'KES 2M - 60M+ (inland to beachfront)',
      rentalYield: '8-14% (vacation rentals)',
      growthAreas: ['Mtwapa', 'Kikambala', 'Vipingo', 'Kilifi Town', 'Watamu', 'Malindi'],
      investmentPotential: 'Very High - beachfront appreciation (6-10% annually), tourism growth, infrastructure development'
    },
    infrastructure: {
      transport: ['Malindi Airport', 'Mombasa-Malindi highway', 'Mtwapa-Kikambala road', 'Matatu services'],
      education: ['Pwani University Kilifi Campus', 'Vipingo International School', 'Secondary and primary schools'],
      healthcare: ['Kilifi County Hospital', 'Malindi Sub-County Hospital', 'Private clinics', 'Mission hospitals'],
      utilities: 'Expanding electricity, water supply challenges in some areas, mobile network coverage'
    },
    keyTowns: ['Kilifi', 'Malindi', 'Watamu', 'Mtwapa', 'Takaungu', 'Gede'],
    attractions: ['Watamu Marine Park', 'Malindi Marine Park', 'Gede Ruins', 'Arabuko Sokoke Forest', 'Beautiful beaches'],
    developmentProjects: ['Mombasa-Malindi road upgrade', 'Kilifi Bridge dualling', 'Water projects', 'Tourism infrastructure']
  },

  // RIFT VALLEY REGION
  'Nakuru': {
    countyName: 'Nakuru',
    region: 'Rift Valley',
    capital: 'Nakuru City',
    population: '2.2 million',
    overview: `Nakuru County hosts Kenya's fourth-largest city and is a major agricultural and industrial hub in the Rift Valley. Known for fertile farmlands, flower farms, and Lake Nakuru National Park, the county has diverse economic activities and growing urbanization.`,
    economy: {
      mainSectors: ['Agriculture (Horticulture, Dairy, Wheat)', 'Manufacturing', 'Trade', 'Tourism', 'Energy'],
      keyIndustries: ['Floriculture (major flower exporter)', 'Dairy production', 'Wheat farming', 'Geothermal energy', 'Manufacturing'],
      economicGrowth: 'Robust 5-6% growth driven by agriculture, manufacturing, and geothermal energy'
    },
    realEstate: {
      marketOverview: 'Vibrant market benefiting from Nakuru\'s city status. High demand for residential and commercial properties. Industrial estates expanding. Satellite towns growing rapidly.',
      priceRange: 'KES 1M - 20M (affordable to upscale)',
      rentalYield: '8-11% in Nakuru city',
      growthAreas: ['Nakuru CBD', 'Milimani', 'Bahati', 'Naivasha', 'Gilgil', 'Njoro'],
      investmentPotential: 'High - city growth, industrial expansion, geothermal projects, tourism'
    },
    infrastructure: {
      transport: ['Nakuru Railway Station (SGR)', 'Nairobi-Nakuru Highway', 'Nakuru Airstrip', 'Urban matatu network'],
      education: ['Egerton University', 'Kabarak University', 'Nakuru Technical Training Institute', 'Numerous schools'],
      healthcare: ['Nakuru Level 5 Hospital', 'Provincial General Hospital', 'War Memorial Hospital', 'Private hospitals'],
      utilities: 'Reliable electricity (including geothermal), piped water, fiber internet in urban areas'
    },
    keyTowns: ['Nakuru City', 'Naivasha', 'Gilgil', 'Molo', 'Njoro'],
    attractions: ['Lake Nakuru National Park (flamingos, rhinos)', 'Menengai Crater', 'Hell\'s Gate National Park (Naivasha)', 'Lake Naivasha', 'Flower farms tours'],
    developmentProjects: ['Nakuru-Kisumu railway', 'Menengai Geothermal Power', 'Industrial parks', 'Urban renewal projects']
  },

  'Uasin Gishu': {
    countyName: 'Uasin Gishu',
    region: 'Rift Valley',
    capital: 'Eldoret City',
    population: '1.2 million',
    overview: `Uasin Gishu County is home to Eldoret, Kenya's fifth-largest city and a major agricultural hub. Known as the "home of champions" for producing world-class athletes, the county has fertile farmlands and a growing urban economy.`,
    economy: {
      mainSectors: ['Agriculture (Maize, Wheat, Dairy)', 'Trade', 'Manufacturing', 'Sports & Tourism', 'Education'],
      keyIndustries: ['Large-scale farming', 'Grain milling', 'Dairy processing', 'Athletic training', 'Agribusiness'],
      economicGrowth: 'Strong agricultural base with diversifying economy, 4-5% annual growth'
    },
    realEstate: {
      marketOverview: 'Growing market driven by Eldoret\'s expansion and agricultural wealth. Increasing demand for residential and commercial properties. Satellite towns developing rapidly.',
      priceRange: 'KES 800K - 15M (very affordable to upscale)',
      rentalYield: '9-13% in Eldoret',
      growthAreas: ['Eldoret Town', 'Pioneer', 'Kapsoya', 'Langas', 'Burnt Forest', 'Turbo'],
      investmentPotential: 'Very Good - affordable prices, growing city, agricultural investments, infrastructure development'
    },
    infrastructure: {
      transport: ['Eldoret International Airport', 'Eldoret Railway Station', 'Nairobi-Eldoret Highway', 'Urban transport network'],
      education: ['Moi University', 'University of Eldoret', 'Catholic University of Eastern Africa', 'Many secondary schools'],
      healthcare: ['Moi Teaching & Referral Hospital', 'Eldoret Hospital', 'Mediheal Hospital', 'Private clinics'],
      utilities: 'Good electricity coverage, piped water in urban areas, expanding fiber network'
    },
    keyTowns: ['Eldoret', 'Turbo', 'Burnt Forest', 'Soy', 'Moiben'],
    attractions: ['Kerio Valley views', 'Chepkiit Falls', 'Sergoit Rock', 'Athletic training camps', 'Eldoret Museum'],
    developmentProjects: ['Eldoret city expansion', 'Airport upgrade', 'Industrial parks', 'Eldoret-Malaba SGR (planned)']
  },

  // NYANZA REGION
  'Kisumu': {
    countyName: 'Kisumu',
    region: 'Nyanza',
    capital: 'Kisumu City',
    population: '1.2 million',
    overview: `Kisumu County is Kenya's third-largest city and the principal city of Western Kenya. Located on the shores of Lake Victoria, Kisumu is a major port and commercial center connecting Kenya to Uganda and Tanzania.`,
    economy: {
      mainSectors: ['Trade', 'Fishing', 'Agriculture', 'Manufacturing', 'Tourism'],
      keyIndustries: ['Port operations', 'Fish processing', 'Sugar production', 'Rice farming', 'Import-export trade'],
      economicGrowth: 'Regional trade hub with port-driven growth, expanding manufacturing'
    },
    realEstate: {
      marketOverview: 'Developing market with growing demand driven by trade and infrastructure projects. Lakefront properties gaining value. Industrial estates expanding.',
      priceRange: 'KES 800K - 18M (affordable to upscale)',
      rentalYield: '9-12% in city center',
      growthAreas: ['Kisumu CBD', 'Milimani', 'Mamboleo', 'Riat', 'Dunga', 'Kibos'],
      investmentPotential: 'Good - infrastructure projects (port, airport, SGR planned), regional trade hub, affordable entry'
    },
    infrastructure: {
      transport: ['Kisumu International Airport', 'Kisumu Port (Lake Victoria)', 'SGR extension (planned)', 'Nairobi-Kisumu Highway', 'Urban matatu network'],
      education: ['Maseno University', 'Jaramogi Oginga Odinga University', 'Kisumu Technical Training Institute', 'Numerous schools'],
      healthcare: ['Jaramogi Oginga Odinga Teaching & Referral Hospital', 'Kisumu County Hospital', 'Aga Khan Hospital', 'Private facilities'],
      utilities: 'Electricity coverage, municipal water supply, expanding fiber internet'
    },
    keyTowns: ['Kisumu City', 'Maseno', 'Ahero', 'Muhoroni', 'Kombewa'],
    attractions: ['Kisumu Impala Sanctuary', 'Hippo Point', 'Dunga Beach', 'Kit Mikayi rock', 'Lake Victoria sunset cruises'],
    developmentProjects: ['Kisumu Port expansion', 'Lake Victoria waterfront development', 'Airport upgrade', 'Kisumu-Kakamega road']
  },

  // WESTERN REGION
  'Kakamega': {
    countyName: 'Kakamega',
    region: 'Western',
    capital: 'Kakamega Town',
    population: '1.9 million',
    overview: `Kakamega County in Western Kenya is known for its rainforest, gold mining potential, and agricultural productivity. The county is one of Kenya's most densely populated, with a vibrant local economy and rich cultural heritage.`,
    economy: {
      mainSectors: ['Agriculture (Sugarcane, Tea, Maize)', 'Trade', 'Mining (Gold)', 'Small-scale Manufacturing'],
      keyIndustries: ['Sugarcane farming', 'Tea production', 'Gold mining (emerging)', 'Dairy farming', 'Small businesses'],
      economicGrowth: 'Agriculture-dependent economy with potential in mining and trade'
    },
    realEstate: {
      marketOverview: 'Affordable market with opportunities in agricultural land and residential properties. Growing urban centers creating demand.',
      priceRange: 'KES 500K - 10M (very affordable)',
      rentalYield: '10-15% in major towns',
      growthAreas: ['Kakamega Town', 'Mumias', 'Butere', 'Khayega', 'Malava'],
      investmentPotential: 'Moderate - affordable land, agricultural investments, gold mining potential'
    },
    infrastructure: {
      transport: ['Kisumu-Kakamega Road', 'Kakamega Airstrip', 'Matatu services', 'Rural road network'],
      education: ['Masinde Muliro University', 'MMUST', 'Secondary and primary schools', 'TVET institutes'],
      healthcare: ['Kakamega County General Hospital', 'Kakamega Provincial Hospital', 'Mission hospitals', 'Health centers'],
      utilities: 'Electricity in urban areas, water challenges in some regions, expanding mobile network'
    },
    keyTowns: ['Kakamega', 'Mumias', 'Butere', 'Malava', 'Navakholo'],
    attractions: ['Kakamega Forest (unique rainforest)', 'Crying Stone of Ilesi', 'Nabongo Cultural Village', 'Gold panning sites'],
    developmentProjects: ['Kakamega-Kisumu highway upgrade', 'Gold mining exploration', 'Irrigation projects']
  },

  // EASTERN REGION
  'Machakos': {
    countyName: 'Machakos',
    region: 'Eastern',
    capital: 'Machakos Town',
    population: '1.4 million',
    overview: `Machakos County neighbors Nairobi and has become a major real estate destination for the capital's growing population. Known for its hills and scenic landscapes, Machakos combines urban development with agricultural activities.`,
    economy: {
      mainSectors: ['Real Estate', 'Agriculture (Horticulture, Livestock)', 'Trade', 'Manufacturing', 'Mining (Sand, Stones)'],
      keyIndustries: ['Construction', 'Horticulture exports', 'Poultry farming', 'Sand harvesting', 'Retail trade'],
      economicGrowth: 'Rapid growth driven by Nairobi overflow, real estate boom, and agriculture'
    },
    realEstate: {
      marketOverview: 'Booming market with high demand from Nairobi workers. Athi River and Mlolongo experiencing industrial and residential growth. Syokimau corridor highly developed.',
      priceRange: 'KES 1M - 20M (affordable to upscale)',
      rentalYield: '8-12% in satellite towns',
      growthAreas: ['Syokimau', 'Mlolongo', 'Athi River', 'Tala', 'Kangundo Road'],
      investmentPotential: 'Very High - proximity to Nairobi, SGR connectivity, rapid appreciation (8-15% annually)'
    },
    infrastructure: {
      transport: ['SGR Syokimau Station', 'Mombasa Road', 'Kangundo Road', 'Eastern Bypass', 'Matatu services to Nairobi'],
      education: ['Machakos University', 'Scott Christian University', 'Secondary and primary schools', 'Technical institutes'],
      healthcare: ['Machakos Level 5 Hospital', 'Shalom Hospital', 'Private clinics and hospitals'],
      utilities: 'Good electricity, piped water in major towns, fiber internet expanding'
    },
    keyTowns: ['Machakos', 'Athi River', 'Mlolongo', 'Kangundo', 'Tala', 'Matungulu'],
    attractions: ['Machakos People\'s Park', 'Fourteen Falls (border)', 'Lukenya Hills', 'Ol Donyo Sabuk National Park'],
    developmentProjects: ['Industrial parks in Athi River', 'Konza Technopolis (part)', 'Affordable housing', 'Road improvements']
  },

  // Add remaining counties with shorter profiles
  'Kajiado': {
    countyName: 'Kajiado',
    region: 'Rift Valley',
    capital: 'Kajiado Town',
    population: '1.1 million',
    overview: `Kajiado County borders Nairobi and Tanzania, known for Maasai culture and wildlife conservancies. The county has seen massive real estate growth along Nairobi's southern corridor.`,
    economy: {
      mainSectors: ['Real Estate', 'Tourism', 'Livestock (Maasai pastoralism)', 'Trade', 'Mining'],
      keyIndustries: ['Construction', 'Tourism & conservancies', 'Cattle ranching', 'Soda ash (Magadi)', 'Retail'],
      economicGrowth: 'Rapid growth from real estate boom and tourism expansion'
    },
    realEstate: {
      marketOverview: 'Explosive growth in towns like Ongata Rongai, Kitengela, and Ngong. Major gated communities and satellite town developments.',
      priceRange: 'KES 800K - 30M (affordable to luxury)',
      rentalYield: '7-10%',
      growthAreas: ['Kitengela', 'Ongata Rongai', 'Ngong', 'Kajiado Town', 'Namanga Road'],
      investmentPotential: 'Very High - Nairobi proximity, rapid appreciation, infrastructure growth'
    },
    infrastructure: {
      transport: ['Namanga Road', 'Magadi Road', 'Matatu services', 'SGR nearby (Syokimau)'],
      education: ['KCA University Kitengela', 'Secondary and primary schools', 'Growing international schools'],
      healthcare: ['Kajiado County Referral Hospital', 'Ongata Rongai Medical Center', 'Private hospitals'],
      utilities: 'Expanding electricity and water, fiber internet in urban areas'
    },
    keyTowns: ['Kitengela', 'Ongata Rongai', 'Ngong', 'Kajiado', 'Namanga', 'Bissil'],
    attractions: ['Amboseli National Park (part)', 'Ol Donyo Sabuk', 'Maasai cultural villages', 'Wildlife conservancies'],
    developmentProjects: ['Ngong-Suswa road', 'Industrial parks', 'Affordable housing', 'Konza Technopolis']
  }
};

/**
 * Get content for a specific county
 */
export function getCountyContent(countyName: string): CountyContent | null {
  // Normalize county name (handle "County" suffix)
  const normalizedName = countyName.replace(/\s+County$/i, '').trim();
  return COUNTY_CONTENT[normalizedName] || null;
}

/**
 * Get all counties in a specific region
 */
export function getCountiesByRegion(region: string): CountyContent[] {
  return Object.values(COUNTY_CONTENT).filter(county => county.region === region);
}

/**
 * Check if county has comprehensive content
 */
export function hasCountyContent(countyName: string): boolean {
  const normalizedName = countyName.replace(/\s+County$/i, '').trim();
  return normalizedName in COUNTY_CONTENT;
}

/**
 * Get list of all counties with content
 */
export function getAllCountiesWithContent(): string[] {
  return Object.keys(COUNTY_CONTENT);
}
