#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple function to test frontmatter parsing like the blog system does
function testFrontmatterParsing(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  let content = '';
  let frontMatter = {};
  
  // Check if it has frontmatter
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContents.match(frontMatterRegex);
  
  if (match) {
    const yamlContent = match[1];
    content = match[2];
    
    console.log('✅ Frontmatter detected!');
    console.log('📄 Parsing frontmatter...');
    
    yamlContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        frontMatter[key.trim()] = value;
      }
    });
    
    console.log('📊 Extracted frontmatter:');
    console.log(JSON.stringify(frontMatter, null, 2));
    
    const title = frontMatter.title || 'Untitled Post';
    const slug = frontMatter.slug || title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    
    console.log(`\n📝 Title: ${title}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`👤 Author: ${frontMatter.author}`);
    console.log(`📂 Category: ${frontMatter.category}`);
    console.log(`📖 Read Time: ${frontMatter.readTime} minutes`);
    
  } else {
    console.log('❌ No frontmatter found');
    content = fileContents;
  }
  
  console.log(`\n📏 Content length: ${content.length} characters`);
  
  return { frontMatter, content };
}

// Test the processed file
const blogDirectory = path.join(process.cwd(), 'src/content/blog');
const testFile = path.join(blogDirectory, 'how-to-get-a-passport-in-kenya-complete.html');

console.log('🧪 Testing blog frontmatter parsing...');
console.log(`📂 File: ${testFile}`);

if (fs.existsSync(testFile)) {
  testFrontmatterParsing(testFile);
} else {
  console.log('❌ Test file not found!');
}