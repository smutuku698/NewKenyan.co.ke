/**
 * Script to remove hero images and use solid green backgrounds
 * Updates properties, jobs, and business directory pages
 */

const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/properties/page.tsx',
  'src/app/jobs-in-kenya/page.tsx',
  'src/app/business-directory/page.tsx',
];

filesToUpdate.forEach(filePath => {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Remove Image import if it exists and isn't used elsewhere
  const hasOtherImageUses = (content.match(/Image/g) || []).length > 2;
  if (!hasOtherImageUses) {
    content = content.replace(/import Image from 'next\/image';\n/, '');
  }

  // Replace hero section pattern 1 (with Image component)
  const heroPattern1 = /<section className="relative bg-gray-900 text-white py-20">[\s\S]*?<div className="absolute inset-0">[\s\S]*?<Image[\s\S]*?\/?>[\s\S]*?<\/div>[\s\S]*?<div className="relative z-10 container mx-auto px-4">/g;

  content = content.replace(
    heroPattern1,
    `<section className="relative text-white py-16" style={{ backgroundColor: '#076146' }}>
        <div className="container mx-auto px-4">`
  );

  // Replace hero section pattern 2 (with background-image style)
  const heroPattern2 = /<section className="relative bg-gray-900 text-white py-20" style=\{[\s\S]*?backgroundImage:[\s\S]*?\}\}>[\s\S]*?<div className="relative z-10 container mx-auto px-4">/g;

  content = content.replace(
    heroPattern2,
    `<section className="relative text-white py-16" style={{ backgroundColor: '#076146' }}>
        <div className="container mx-auto px-4">`
  );

  // Replace any other patterns with absolute overlay
  content = content.replace(
    /<div className="absolute inset-0[\s\S]*?<\/div>\s*<div className="relative z-10/g,
    '<div className="relative'
  );

  // Update py-20 to py-16 for consistency
  content = content.replace(
    /py-20/g,
    'py-16'
  );

  // Replace bg-gray-900 with our green color
  content = content.replace(
    /className="relative bg-gray-900 text-white/g,
    'className="relative text-white" style={{ backgroundColor: \'#076146\' }} /* Solid green background'
  );

  fs.writeFileSync(fullPath, content);
  console.log(`✅ Updated ${filePath}`);
});

console.log('\n🎉 All hero sections updated with solid green backgrounds!');
