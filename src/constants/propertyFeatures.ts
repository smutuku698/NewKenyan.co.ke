// Property Features Constants

export const CONSTRUCTION_STATUS = [
  'Under Construction',
  'Off-Plan',
  'Completed',
  'Ready to Move In',
  'Under Renovation'
] as const;

export const NEARBY_FEATURES = [
  'Bus Stop',
  'Golf Course',
  'Hospital',
  'Scenic View',
  'School',
  'Shopping Mall',
  'Restaurant',
  'Bank',
  'Pharmacy',
  'Park',
  'Beach',
  'Airport',
  'Train Station',
  'University',
  'Market'
] as const;

export const EXTERNAL_FEATURES = [
  'Balcony',
  'BBQ',
  'CCTV',
  'Electric Fence',
  'Borehole',
  'Garden',
  'Gym',
  'Lift/Elevator',
  'Parking',
  'Swimming Pool',
  'Jacuzzi',
  'Spa',
  'Tennis Court',
  'Padel Court',
  'Basketball Court',
  'Playground',
  'Terrace',
  'Rooftop Access',
  'Security Gate',
  'Generator',
  'Solar Panels',
  'Water Tank',
  'Servant Quarter',
  'Guest House'
] as const;

export const INTERNAL_FEATURES = [
  'Alarm',
  'Fibre Internet',
  'Air Conditioning',
  'Central Heating',
  'Built-in Wardrobes',
  'Walk-in Closet',
  'En-suite Bathroom',
  'Bathtub',
  'Shower Cubicle',
  'Modern Kitchen',
  'Granite Countertops',
  'Kitchen Appliances',
  'Dishwasher',
  'Washing Machine',
  'Dryer',
  'Microwave',
  'Oven',
  'Refrigerator',
  'Smart Home System',
  'Intercom',
  'Video Doorbell',
  'Study Room',
  'Home Office',
  'Fireplace',
  'Wooden Floors',
  'Tile Floors',
  'High Ceilings',
  'Chandelier',
  'LED Lighting',
  'Backup Water Supply',
  'Water Heater',
  'Furnished',
  'Semi-Furnished'
] as const;

export const AMENITIES = [
  'Parking',
  'Security',
  'Swimming Pool',
  'Gym',
  'Garden',
  'Balcony',
  'Elevator',
  'Backup Generator',
  'WiFi',
  'Air Conditioning',
  'Servant Quarter',
  'CCTV',
  'Borehole',
  'Solar Panels',
  'Sauna',
  'Wine Cellar',
  'Arrival Concierge',
  'Hotel Lobby',
  'Residence Lounge',
  'Conference Center',
  'Club House',
  'Café',
  'Business Center',
  'Courtyard',
  'Pool Rain Shower',
  'Yoga Studio',
  'Sky Recreation Garden',
  'Sports Facilities',
  'Smart Access Solutions',
  'In-building Retail',
  'Laundry Area',
  'Children Play Area',
  'BBQ Area',
  'Rooftop Terrace',
  'Concierge Service',
  'Valet Parking',
  '24/7 Security',
  'Electric Fence'
] as const;

// Type exports
export type ConstructionStatus = typeof CONSTRUCTION_STATUS[number];
export type NearbyFeature = typeof NEARBY_FEATURES[number];
export type ExternalFeature = typeof EXTERNAL_FEATURES[number];
export type InternalFeature = typeof INTERNAL_FEATURES[number];
export type Amenity = typeof AMENITIES[number];
