#!/usr/bin/env node

const path = require('path');
const fs = require('fs');

// Simple HTML processing without external dependencies for now
function processHTMLContent(content, fileName) {
  const domain = 'newkenyan.com';
  const siteName = 'NewKenyan.com';
  const author = 'Melvin Akinyi';
  const authorLinkedIn = 'https://www.linkedin.com/in/melvin-akinyi-993929338/recent-activity/all/';
  const address = '8th Floor, Wing C - West End Towers, Waiyaki Way, Westlands, Nairobi, Kenya - 00100';
  
  // Replace domain placeholders
  content = content
    .replace(/your-domain\.com/g, domain)
    .replace(/Your Website Name/g, siteName)
    .replace(/Your Company Name/g, siteName)
    .replace(/Content Team/g, author)
    .replace(/\+1-555-555-5555/g, '+254-700-000-000')
    .replace(/2025-08-21T23:01:08\.6\d+Z/g, new Date().toISOString());

  // Fix title typo
  content = content.replace(/How to Passport in kenya/g, 'How to Get a Passport in Kenya');

  // Add author schema if not present
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://${domain}#author`,
    "name": author,
    "url": authorLinkedIn,
    "jobTitle": "Content Writer",
    "worksFor": {
      "@type": "Organization",
      "name": siteName
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://${domain}#business`,
    "name": siteName,
    "url": `https://${domain}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address,
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "addressCountry": "Kenya",
      "postalCode": "00100"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-1.2921",
      "longitude": "36.8219"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Kenya"
    }
  };

  // Add additional schema before closing
  const additionalSchema = `,\n    ${JSON.stringify(personSchema, null, 6)},\n    ${JSON.stringify(localBusinessSchema, null, 6)}`;
  const lastScriptIndex = content.lastIndexOf('</script>');
  if (lastScriptIndex !== -1) {
    content = content.slice(0, lastScriptIndex) + additionalSchema + content.slice(lastScriptIndex);
  }

  // Fill empty FAQ answers
  content = content.replace(/"text":\s*""/g, '"text": "For detailed information about this topic, please refer to the complete guide above."');

  // Add frontmatter if missing
  if (!content.includes('---')) {
    const slug = fileName.replace('.html', '');
    const frontmatter = `---
title: "How to Get a Passport in Kenya: Complete Guide 2025"
slug: "${slug}"
author: "${author}"
category: "Immigration"
excerpt: "Complete guide on how to get a passport in Kenya with step-by-step instructions, requirements, and costs for 2025."
publishedAt: "${new Date().toISOString()}"
readTime: 17
featuredImage: "/images/default-blog.svg"
seoTitle: "How to Get a Passport in Kenya: Complete Guide 2025"
seoDescription: "Learn how to get a passport in Kenya with our comprehensive 2025 guide. Step-by-step process, requirements, costs, and expert tips for first-time applicants."
keywords: "passport in kenya, how to get a passport in kenya, passport application kenya, kenyan passport requirements"
---
`;
    content = frontmatter + content;
  }

  return content;
}

// Get the blog directory path
const blogDirectory = path.join(process.cwd(), 'src/content/blog');

// Get command line arguments
const args = process.argv.slice(2);
const specificFile = args[0];

console.log('🚀 Starting SEO Blog Processor...');
console.log(`📂 Blog directory: ${blogDirectory}`);

try {
  if (specificFile) {
    // Process specific file
    const filePath = path.join(blogDirectory, specificFile);
    console.log(`📄 Processing specific file: ${specificFile}`);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const processedContent = processHTMLContent(content, specificFile);
    fs.writeFileSync(filePath, processedContent, 'utf8');
    
    console.log('✅ Single file processing completed!');
  } else {
    // Process all files
    console.log('📄 Processing all blog files...');
    
    if (!fs.existsSync(blogDirectory)) {
      throw new Error(`Blog directory not found: ${blogDirectory}`);
    }
    
    const files = fs.readdirSync(blogDirectory);
    
    files.forEach(fileName => {
      if (fileName.endsWith('.html')) {
        try {
          const filePath = path.join(blogDirectory, fileName);
          const content = fs.readFileSync(filePath, 'utf8');
          const processedContent = processHTMLContent(content, fileName);
          fs.writeFileSync(filePath, processedContent, 'utf8');
          console.log(`✅ Processed: ${fileName}`);
        } catch (error) {
          console.error(`❌ Error processing ${fileName}:`, error.message);
        }
      }
    });
    
    console.log('✅ All files processing completed!');
  }
  
  console.log('\n🎉 SEO enhancement completed successfully!');
  console.log('📈 Your articles are now optimized with:');
  console.log('   • Domain placeholders replaced with newkenyan.com');
  console.log('   • Enhanced schema markup with real data');
  console.log('   • LocalBusiness and Person schema added');
  console.log('   • FAQ answers auto-generated');
  console.log('   • Frontmatter added for HTML articles');
  console.log('   • Author information updated');
  
} catch (error) {
  console.error('❌ Error processing blog files:', error.message);
  process.exit(1);
}