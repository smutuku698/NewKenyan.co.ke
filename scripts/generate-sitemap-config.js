const fs = require('fs');
const path = require('path');

/**
 * Script to generate sitemap configuration by discovering all routes in the app directory
 * This ensures all static pages are included in the sitemap
 */

const appDir = path.join(__dirname, '../src/app');
const excludeDirs = ['api', 'auth', 'admin', 'dashboard', 'favorites', 'add-listing', 'sign-in', 'sign-up'];
const excludeFiles = ['layout.tsx', 'loading.tsx', 'error.tsx', 'not-found.tsx', 'template.tsx'];

function getAllStaticRoutes(dir, baseRoute = '') {
  const routes = [];

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip excluded directories and dynamic routes
        if (excludeDirs.includes(item) || item.startsWith('[') || item.startsWith('(')) {
          continue;
        }

        const newRoute = baseRoute + '/' + item;

        // Check if this directory has a page.tsx
        const pagePath = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          routes.push(newRoute);
        }

        // Recursively check subdirectories
        const subRoutes = getAllStaticRoutes(fullPath, newRoute);
        routes.push(...subRoutes);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return routes;
}

// Get all static routes
const routes = getAllStaticRoutes(appDir);

// Sort routes
routes.sort();

// Generate the sitemap entries
console.log('\n=== STATIC ROUTES DISCOVERED ===\n');
console.log('Total routes found:', routes.length);
console.log('\nRoutes:');
routes.forEach(route => {
  const url = route === '' ? '/' : route;
  console.log(url);
});

console.log('\n=== SITEMAP TYPESCRIPT CODE ===\n');
console.log('Add these entries to your staticPages array in src/app/sitemap.ts:\n');

routes.forEach(route => {
  const url = route === '' ? baseUrl : `\${baseUrl}${route}`;
  const priority = getPriority(route);
  const changeFreq = getChangeFrequency(route);

  console.log(`    {
      url: ${url},
      lastModified: new Date(),
      changeFrequency: '${changeFreq}' as const,
      priority: ${priority},
    },`);
});

function getPriority(route) {
  if (route === '') return 1;
  if (route.includes('nairobi') || route.includes('mombasa')) return 0.9;
  if (route.includes('calculator') || route.includes('tool')) return 0.75;
  if (route.includes('services')) return 0.7;
  if (route.includes('about') || route.includes('contact')) return 0.5;
  if (route.includes('privacy') || route.includes('terms')) return 0.3;
  return 0.8;
}

function getChangeFrequency(route) {
  if (route === '' || route.includes('properties') || route.includes('business')) return 'daily';
  if (route.includes('calculator') || route.includes('tool')) return 'monthly';
  if (route.includes('blog') || route.includes('jobs')) return 'weekly';
  if (route.includes('about') || route.includes('contact')) return 'monthly';
  if (route.includes('privacy') || route.includes('terms')) return 'yearly';
  return 'weekly';
}

console.log('\n=== DYNAMIC ROUTES TO VERIFY ===\n');
console.log('Make sure these dynamic routes are handled in sitemap.ts:');
console.log('- /houses-for-sale/[location]');
console.log('- /houses-for-rent/[location]');
console.log('- /apartments-for-sale/[location]');
console.log('- /apartments-for-rent/[location]');
console.log('- /2-bedroom-houses-for-rent/[location]');
console.log('- /2-bedroom-houses-for-sale/[location]');
console.log('- /3-bedroom-houses-for-rent/[location]');
console.log('- /3-bedroom-houses-for-sale/[location]');
console.log('- /4-bedroom-houses-for-rent/[location]');
console.log('- /4-bedroom-houses-for-sale/[location]');
console.log('- /5-bedroom-houses-for-rent/[location]');
console.log('- /5-bedroom-houses-for-sale/[location]');
console.log('- /bedsitters-for-rent/[location]');
console.log('- /bungalows-for-rent/[location]');
console.log('- /bungalows-for-sale/[location]');
console.log('- /commercial-properties-for-rent/[location]');
console.log('- /commercial-properties-for-sale/[location]');
console.log('- /container-houses-for-sale/[location]');
console.log('- /land-for-sale/[location]');
console.log('- /maisonettes-for-rent/[location]');
console.log('- /maisonettes-for-sale/[location]');
console.log('- /office-space-for-rent/[location]');
console.log('- /serviced-apartments-for-rent/[location]');
console.log('- /shops-for-rent/[location]');
console.log('- /shops-for-sale/[location]');
console.log('- /studio-apartments-for-rent/[location]');
console.log('- /studio-apartments-for-sale/[location]');
console.log('- /townhouses-for-rent/[location]');
console.log('- /townhouses-for-sale/[location]');
console.log('- /villas-for-rent/[location]');
console.log('- /villas-for-sale/[location]');
console.log('- /warehouses-for-rent/[location]');
console.log('- /warehouses-for-sale/[location]');
console.log('- /[city] (dynamic city pages)');
console.log('- /properties/[id]');
console.log('- /business/[id]');
console.log('- /jobs-in-kenya/[slug]');
