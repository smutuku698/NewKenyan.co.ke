/**
 * Generate Static HTML Sitemap
 *
 * Creates an HTML sitemap page that Bing can easily crawl
 * This helps search engines discover all your pages
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BASE_URL = 'https://newkenyan.com';

async function generateHTMLSitemap() {
  console.log('\n' + '═'.repeat(70));
  console.log('📄 GENERATING HTML SITEMAP');
  console.log('═'.repeat(70));

  const sections = [];

  // 1. Main Pages
  console.log('\n1️⃣ Adding main pages...');
  const mainPages = [
    { url: '/', title: 'Home - NewKenyan.com' },
    { url: '/properties', title: 'Properties for Sale & Rent' },
    { url: '/business-directory', title: 'Business Directory' },
    { url: '/jobs-in-kenya', title: 'Jobs in Kenya' },
    { url: '/real-estate-companies-in-kenya', title: 'Real Estate Companies' },
    { url: '/apartments-for-rent-nairobi', title: 'Apartments for Rent Nairobi' },
    { url: '/houses-for-sale-nairobi', title: 'Houses for Sale Nairobi' },
    { url: '/bedsitter-nairobi', title: 'Bedsitter Nairobi' },
    { url: '/land-for-sale-kenya', title: 'Land for Sale Kenya' },
    { url: '/real-estate-services', title: 'Real Estate Services' },
    { url: '/website-services', title: 'Website Services' },
    { url: '/about', title: 'About Us' },
    { url: '/contact', title: 'Contact Us' },
  ];

  sections.push({
    title: 'Main Pages',
    links: mainPages,
  });

  // 2. Location Pages
  console.log('2️⃣ Fetching location pages...');
  const { data: locations } = await supabase
    .from('locations')
    .select('slug, name, type, county')
    .eq('is_active', true)
    .order('type')
    .order('name')
    .limit(200); // Top 200 locations

  const propertyTypes = [
    { path: 'houses-for-sale', title: 'Houses for Sale' },
    { path: 'houses-for-rent', title: 'Houses for Rent' },
    { path: 'apartments-for-sale', title: 'Apartments for Sale' },
    { path: 'apartments-for-rent', title: 'Apartments for Rent' },
    { path: 'land-for-sale', title: 'Land for Sale' },
  ];

  // Group by counties
  const counties = [...new Set(locations?.filter(l => l.type === 'county').map(l => l.name) || [])];

  counties.forEach(county => {
    const countySlug = locations.find(l => l.name === county && l.type === 'county')?.slug;
    if (!countySlug) return;

    const countyLinks = [];
    propertyTypes.forEach(type => {
      countyLinks.push({
        url: `/${type.path}/${countySlug}`,
        title: `${type.title} in ${county}`,
      });
    });

    sections.push({
      title: `${county} Properties`,
      links: countyLinks,
    });

    // Add neighborhoods in this county
    const neighborhoods = locations?.filter(l =>
      l.type === 'neighborhood' && l.county?.includes(county.replace(' County', ''))
    ) || [];

    if (neighborhoods.length > 0) {
      const neighborhoodLinks = [];
      neighborhoods.slice(0, 10).forEach(neighborhood => {
        propertyTypes.slice(0, 2).forEach(type => {
          neighborhoodLinks.push({
            url: `/${type.path}/${neighborhood.slug}`,
            title: `${type.title} in ${neighborhood.name}`,
          });
        });
      });

      if (neighborhoodLinks.length > 0) {
        sections.push({
          title: `${county} Neighborhoods`,
          links: neighborhoodLinks,
        });
      }
    }
  });

  // Generate HTML
  console.log('\n📝 Generating HTML...');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>Sitemap - NewKenyan.com</title>
  <meta name="description" content="Complete sitemap of NewKenyan.com - Browse all our properties, businesses, and jobs across Kenya.">
  <link rel="canonical" href="${BASE_URL}/sitemap-page">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 {
      color: #10B981;
      margin-bottom: 10px;
      font-size: 2.5em;
    }
    .subtitle {
      color: #666;
      margin-bottom: 40px;
      font-size: 1.1em;
    }
    .section {
      margin-bottom: 40px;
    }
    .section h2 {
      color: #333;
      border-bottom: 2px solid #10B981;
      padding-bottom: 10px;
      margin-bottom: 20px;
      font-size: 1.5em;
    }
    .links {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 10px;
    }
    .links a {
      color: #10B981;
      text-decoration: none;
      padding: 8px 12px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .links a:hover {
      background: #f0fdf4;
      text-decoration: underline;
    }
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      text-align: center;
      color: #666;
    }
    .footer a {
      color: #10B981;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>NewKenyan.com Sitemap</h1>
    <p class="subtitle">Browse all pages on NewKenyan.com - Kenya's premier platform for properties, businesses, and jobs.</p>

${sections.map(section => `    <div class="section">
      <h2>${section.title}</h2>
      <div class="links">
${section.links.map(link => `        <a href="${link.url}">${link.title}</a>`).join('\n')}
      </div>
    </div>
`).join('\n')}

    <div class="footer">
      <p><a href="/">← Back to Home</a> | <a href="/sitemap.xml">XML Sitemap</a></p>
      <p>© 2024 NewKenyan.com - All rights reserved</p>
    </div>
  </div>
</body>
</html>`;

  // Save to public directory
  const outputPath = path.join(process.cwd(), 'public', 'sitemap-page.html');
  fs.writeFileSync(outputPath, html, 'utf8');

  console.log('\n✅ HTML Sitemap generated!');
  console.log(`   Location: ${outputPath}`);
  console.log(`   URL: ${BASE_URL}/sitemap-page.html`);
  console.log(`   Sections: ${sections.length}`);
  console.log(`   Total links: ${sections.reduce((sum, s) => sum + s.links.length, 0)}`);

  console.log('\n💡 Next Steps:');
  console.log('   1. Deploy your site with the new sitemap-page.html');
  console.log('   2. Link to it from your footer: /sitemap-page.html');
  console.log('   3. Submit it to Bing: https://newkenyan.com/sitemap-page.html');
  console.log('   4. This helps Bing discover all your pages!\n');
}

if (require.main === module) {
  generateHTMLSitemap()
    .then(() => {
      console.log('🎉 Script completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

module.exports = { generateHTMLSitemap };
