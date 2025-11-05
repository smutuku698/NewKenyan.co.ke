const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvContent = fs.readFileSync('google.csv', 'utf-8');
const lines = csvContent.split('\n');

// Skip first 3 lines (headers and empty rows)
const dataLines = lines.slice(3);

const companies = [];

dataLines.forEach((line, index) => {
  if (!line.trim()) return;

  // Parse CSV line handling quoted fields
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());

  // Extract relevant data based on the CSV structure
  const googleMapsLink = fields[0] || '';
  const name = fields[1] || '';
  const rating = fields[2] || '';
  const reviewCount = fields[3] ? fields[3].replace(/[()]/g, '') : '0';
  const type = fields[4] || 'Real Estate Company';
  const address = fields[8] || '';
  const hours = fields[9] || '';
  const openingTime = fields[10] || '';
  const phone = fields[12] || '';
  const website = fields[13] || '';
  const review = fields[21] || '';

  // Only add if it has a name
  if (name && name !== '') {
    // Extract coordinates from Google Maps link if possible
    let latitude = null;
    let longitude = null;

    const coordMatch = googleMapsLink.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (coordMatch) {
      latitude = parseFloat(coordMatch[1]);
      longitude = parseFloat(coordMatch[2]);
    }

    // Generate a slug for the company
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Extract city from address
    let city = 'Nairobi'; // Default
    const addressLower = address.toLowerCase();
    if (addressLower.includes('mombasa')) city = 'Mombasa';
    else if (addressLower.includes('kisumu')) city = 'Kisumu';
    else if (addressLower.includes('nakuru')) city = 'Nakuru';
    else if (addressLower.includes('eldoret')) city = 'Eldoret';

    // Determine services based on type
    const services = [];
    const typeLower = type.toLowerCase();
    if (typeLower.includes('investment')) {
      services.push('Property Investment', 'Land Sales', 'Off-Plan Properties');
    } else if (typeLower.includes('agency')) {
      services.push('Property Sales', 'Property Rentals', 'Property Management');
    } else if (typeLower.includes('developer')) {
      services.push('Property Development', 'Construction', 'Project Management');
    } else {
      services.push('Property Sales', 'Rentals', 'Valuations');
    }

    // Add specializations
    const specializations = ['Residential Properties', 'Commercial Properties'];
    if (typeLower.includes('investment') || typeLower.includes('land')) {
      specializations.push('Land Sales', 'Investment Advisory');
    }

    companies.push({
      id: `company-${index + 1}`,
      slug: slug,
      name: name,
      type: type,
      description: `${name} is a trusted ${type.toLowerCase()} serving clients across Kenya. ${review ? 'Client testimonial: ' + review.substring(0, 150) + '...' : 'Offering professional real estate services with a focus on customer satisfaction.'}`,
      rating: parseFloat(rating) || 0,
      reviewCount: parseInt(reviewCount) || 0,
      address: address,
      city: city,
      phone: phone,
      website: website,
      googleMapsLink: googleMapsLink,
      coordinates: latitude && longitude ? { latitude, longitude } : null,
      hours: hours,
      openingTime: openingTime,
      services: services,
      specializations: specializations,
      verified: parseFloat(rating) >= 4.0,
      featured: parseFloat(rating) >= 4.5 && parseInt(reviewCount) >= 50,
      yearEstablished: null, // Can be added manually later
      employeeCount: null, // Can be added manually later
      logo: null, // Can be added later
      images: [],
      socialMedia: {
        facebook: null,
        twitter: null,
        instagram: null,
        linkedin: null
      },
      features: {
        virtualTours: false,
        onlineBooking: website !== '',
        customerSupport: phone !== '',
        propertyManagement: services.includes('Property Management'),
        financing: false,
        legalSupport: false
      },
      certifications: [],
      awards: []
    });
  }
});

// Sort by rating and review count
companies.sort((a, b) => {
  if (b.rating !== a.rating) {
    return b.rating - a.rating;
  }
  return b.reviewCount - a.reviewCount;
});

// Write to JSON file
const outputPath = path.join(__dirname, 'src', 'data', 'realEstateCompanies.json');
const outputData = {
  lastUpdated: new Date().toISOString(),
  totalCompanies: companies.length,
  companies: companies
};

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');

console.log(`✅ Successfully parsed ${companies.length} real estate companies`);
console.log(`📄 Data saved to: ${outputPath}`);
console.log(`\nTop 5 Companies by Rating:`);
companies.slice(0, 5).forEach((company, index) => {
  console.log(`${index + 1}. ${company.name} - ${company.rating}⭐ (${company.reviewCount} reviews)`);
});
