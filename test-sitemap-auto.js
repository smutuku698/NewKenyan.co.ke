const fs = require('fs');
const path = require('path');

// Auto-discover all app routes from file system
function getAppRoutes() {
  const appDir = path.join(__dirname, 'src', 'app');
  const routes = [];

  function scanDirectory(dir, currentPath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      // Skip special Next.js folders and files
      if (entry.name.startsWith('_') || entry.name.startsWith('.') ||
          entry.name === 'api' || entry.name === 'components' ||
          entry.name.includes('[') || entry.name.includes(']')) {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      const routePath = currentPath ? `${currentPath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        // Check if directory has a page.tsx or page.ts file
        const hasPage = fs.existsSync(path.join(fullPath, 'page.tsx')) ||
                        fs.existsSync(path.join(fullPath, 'page.ts'));

        if (hasPage) {
          routes.push(`/${routePath}`);
        }

        // Recursively scan subdirectories
        scanDirectory(fullPath, routePath);
      }
    }
  }

  scanDirectory(appDir);
  return routes;
}

console.log('='.repeat(80));
console.log('AUTO-DISCOVERED ROUTES');
console.log('='.repeat(80));
console.log('');

const routes = getAppRoutes();
routes.sort();

console.log(`Total routes found: ${routes.length}\n`);

// Categorize routes
const pillarPages = routes.filter(r =>
  r.includes('apartment') || r.includes('house') || r.includes('bedsitter') ||
  r.includes('bedroom') || r.includes('land') || r.includes('cheap')
);

const toolPages = routes.filter(r => r.includes('calculator'));
const servicePages = routes.filter(r => r.includes('service'));
const infoPages = routes.filter(r => r.includes('about') || r.includes('contact') || r.includes('privacy') || r.includes('terms'));
const mainPages = routes.filter(r => r.includes('properties') || r.includes('business') || r.includes('jobs') || r.includes('blog'));

console.log('PILLAR PAGES (Property keyword pages):');
console.log('-'.repeat(80));
pillarPages.forEach(r => console.log(`  ${r}`));

console.log('\nMAIN SECTIONS:');
console.log('-'.repeat(80));
mainPages.forEach(r => console.log(`  ${r}`));

console.log('\nTOOLS & CALCULATORS:');
console.log('-'.repeat(80));
toolPages.forEach(r => console.log(`  ${r}`));

console.log('\nSERVICE PAGES:');
console.log('-'.repeat(80));
servicePages.forEach(r => console.log(`  ${r}`));

console.log('\nINFO PAGES:');
console.log('-'.repeat(80));
infoPages.forEach(r => console.log(`  ${r}`));

console.log('\n' + '='.repeat(80));
console.log('✓ ALL PAGES WILL BE AUTO-ADDED TO SITEMAP!');
console.log('  When you add a new folder with page.tsx, it will automatically appear.');
console.log('='.repeat(80));
