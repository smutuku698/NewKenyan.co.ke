// Sample data for Kenya Pulse Hub

// Sample Google Trends
export const googleTrends = [
  { keyword: 'M-Pesa Services', changePercent: 45, category: 'Finance' },
  { keyword: 'Remote Jobs Kenya', changePercent: 32, category: 'Employment' },
  { keyword: 'Nairobi Apartments', changePercent: 28, category: 'Real Estate' },
  { keyword: 'Online Business', changePercent: 25, category: 'Business' },
  { keyword: 'Digital Banking', changePercent: -12, category: 'Finance' },
];

// Sample Twitter Trends
export const twitterTrends = [
  {
    hashtag: 'KenyanJobs',
    tweets: 15420,
    commentary: 'Job seekers are actively discussing new opportunities in the tech sector across Kenya.',
  },
  {
    hashtag: 'NairobiStartup',
    tweets: 8750,
    commentary: 'The startup ecosystem in Nairobi continues to grow with new funding announcements.',
  },
  {
    hashtag: 'DigitalKenya',
    tweets: 12340,
    commentary: 'Kenya\'s digital transformation is accelerating with new government initiatives.',
  },
  {
    hashtag: 'PropertyKenya',
    tweets: 6890,
    commentary: 'Real estate discussions focus on affordable housing and investment opportunities.',
  },
];

// Sample Businesses
export const sampleBusinesses = [
  {
    id: '1',
    name: 'Savannah Grill Restaurant',
    category: 'Food & Dining',
    rating: 4.8,
    reviewCount: 342,
    location: 'Westlands, Nairobi',
    imageUrl: '/images/sample-business-1.jpg',
    isVerified: true,
    isNew: false,
    phoneNumber: '+254700123456',
    whatsappNumber: '+254700123456',
    description: 'Authentic Kenyan cuisine with a modern twist, serving the best nyama choma in Nairobi.',
  },
  {
    id: '2',
    name: 'Tech Hub Co-working',
    category: 'Co-working Space',
    rating: 4.6,
    reviewCount: 128,
    location: 'CBD, Nairobi',
    imageUrl: '/images/sample-business-2.jpg',
    isVerified: true,
    isNew: true,
    phoneNumber: '+254700234567',
    whatsappNumber: '+254700234567',
    description: 'Modern co-working space designed for Kenya\'s growing tech community and entrepreneurs.',
  },
  {
    id: '3',
    name: 'Green Valley Organic Farm',
    category: 'Agriculture',
    rating: 4.9,
    reviewCount: 89,
    location: 'Nakuru',
    imageUrl: '/images/sample-business-1.jpg',
    isVerified: true,
    isNew: false,
    phoneNumber: '+254700345678',
    description: 'Organic farming solutions and fresh produce supply for restaurants and markets.',
  },
  {
    id: '4',
    name: 'Kenya Coffee Roasters',
    category: 'Food & Dining',
    rating: 4.7,
    reviewCount: 156,
    location: 'Kiambu',
    imageUrl: '/images/sample-business-2.jpg',
    isVerified: true,
    isNew: false,
    phoneNumber: '+254700456789',
    whatsappNumber: '+254700456789',
    description: 'Premium Kenyan coffee beans roasted to perfection for local and international markets.',
  },
  {
    id: '5',
    name: 'Nairobi Innovation Hub',
    category: 'Technology',
    rating: 4.9,
    reviewCount: 98,
    location: 'Upperhill, Nairobi',
    imageUrl: '/images/sample-business-1.jpg',
    isVerified: true,
    isNew: true,
    phoneNumber: '+254700567890',
    description: 'Supporting tech startups and entrepreneurs with mentorship, funding, and workspace.',
  },
];

// Sample Jobs
export const sampleJobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Safaricom PLC',
    location: 'Nairobi',
    salary: 'KSh 180,000 - 250,000',
    type: 'full-time' as const,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isUrgent: false,
    isFeatured: true,
    description: 'Join Kenya\'s leading telecommunications company as a Senior Software Engineer. Work on cutting-edge mobile financial services.',
  },
  {
    id: '2',
    title: 'Digital Marketing Specialist',
    company: 'Kenya Airways',
    location: 'Nairobi',
    salary: 'KSh 80,000 - 120,000',
    type: 'full-time' as const,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isUrgent: true,
    isFeatured: false,
    description: 'Drive digital marketing campaigns for Africa\'s premier airline. Experience in travel industry preferred.',
  },
  {
    id: '3',
    title: 'Remote Customer Success Manager',
    company: 'Twiga Foods',
    location: 'Remote',
    salary: 'KSh 100,000 - 150,000',
    type: 'remote' as const,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isUrgent: false,
    isFeatured: true,
    description: 'Help revolutionize food distribution in Kenya. Work with farmers and retailers to improve supply chains.',
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    company: 'iHub Kenya',
    location: 'Nairobi',
    salary: 'KSh 90,000 - 130,000',
    type: 'full-time' as const,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    isUrgent: false,
    isFeatured: true,
    description: 'Design intuitive user experiences for Kenya\'s leading innovation hub. Work with startups and established companies.',
  },
  {
    id: '5',
    title: 'Data Analyst',
    company: 'NCBA Bank',
    location: 'Nairobi',
    salary: 'KSh 70,000 - 95,000',
    type: 'full-time' as const,
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    isUrgent: false,
    isFeatured: false,
    description: 'Analyze customer data to drive business insights and improve banking services across Kenya.',
  },
];

// Sample Properties
export const sampleProperties = [
  {
    id: '1',
    title: 'Modern 2BR Apartment with City Views',
    type: 'Apartment',
    price: 85000,
    bedrooms: 2,
    bathrooms: 2,
    location: 'Kilimani, Nairobi',
    images: ['/images/sample-property-1.jpg', '/images/sample-business-1.jpg', '/images/sample-business-2.jpg'],
    amenities: ['parking', 'gym', 'pool', 'security', 'balcony'],
    contactPhone: '+254700456789',
    whatsappNumber: '+254700456789',
  },
  {
    id: '2',
    title: 'Spacious Family Home in Quiet Neighborhood',
    type: 'House',
    price: 120000,
    bedrooms: 4,
    bathrooms: 3,
    location: 'Karen, Nairobi',
    images: ['/images/sample-business-2.jpg', '/images/sample-property-1.jpg'],
    amenities: ['garden', 'parking', 'security', 'backup generator'],
    contactPhone: '+254700567890',
    whatsappNumber: '+254700567890',
  },
  {
    id: '3',
    title: 'Studio Apartment Perfect for Young Professionals',
    type: 'Studio',
    price: 45000,
    bedrooms: 1,
    bathrooms: 1,
    location: 'Westlands, Nairobi',
    images: ['/images/sample-property-1.jpg'],
    amenities: ['furnished', 'wifi', 'parking', 'security'],
    contactPhone: '+254700678901',
  },
];

// Sample Blog Posts
export const sampleBlogPosts = [
  {
    id: '1',
    title: 'The Rise of Kenya\'s Tech Ecosystem: A New Era of Innovation',
    excerpt: 'Exploring how Kenya is becoming Africa\'s silicon valley with thriving startups, increased funding, and world-class tech talent emerging across the country.',
    category: 'Technology',
    author: 'Sarah Wanjiku',
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    readTime: 8,
    featuredImage: '/images/sample-blog-1.jpg',
    isTrending: true,
  },
  {
    id: '2',
    title: 'Investment Opportunities in Nairobi\'s Growing Real Estate Market',
    excerpt: 'A comprehensive guide to understanding the current real estate trends in Nairobi and how young Kenyans can get started in property investment.',
    category: 'Business',
    author: 'Michael Koech',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    readTime: 12,
    featuredImage: '/images/sample-property-1.jpg',
    isTrending: false,
  },
  {
    id: '3',
    title: 'Remote Work Revolution: How Kenyan Professionals Are Adapting',
    excerpt: 'The shift to remote work has opened new possibilities for Kenyan professionals. Here\'s how to thrive in the new work environment and find global opportunities.',
    category: 'Lifestyle',
    author: 'Grace Akinyi',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    readTime: 6,
    featuredImage: '/images/sample-business-2.jpg',
    isTrending: true,
  },
];

// Top Story for Hero Section
export const topStory = {
  headline: 'Connect with Kenya\'s fastest-growing business directory, job board, and property marketplace.',
  excerpt: 'Discover opportunities, grow your network, and build your future in Kenya\'s digital economy.',
  imageUrl: '/images/sample-blog-1.jpg',
  category: 'Featured',
  readTime: 5,
};

// Stats for Hero Section
export const heroStats = {
  businesses: 2847,
  jobs: 1256,
  properties: 892,
};