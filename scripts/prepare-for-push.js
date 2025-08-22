#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Preparing blog content for GitHub push...\n');

try {
  // Step 1: Process all blog SEO
  console.log('📝 Step 1: Processing blog SEO...');
  execSync('npm run process-blog-seo', { stdio: 'inherit' });
  
  // Step 2: Check git status
  console.log('\n📊 Step 2: Checking git status...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (gitStatus.trim()) {
    console.log('📁 Modified files detected:');
    console.log(gitStatus);
    
    console.log('\n✅ Your blog content is now SEO-optimized and ready for push!');
    console.log('\n📋 Next steps:');
    console.log('   1. Review the changes: git diff');
    console.log('   2. Add files: git add .');
    console.log('   3. Commit: git commit -m "Add SEO-optimized blog content"');
    console.log('   4. Push: git push');
  } else {
    console.log('✅ No changes detected. Content is already optimized!');
  }
  
} catch (error) {
  console.error('❌ Error during preparation:', error.message);
  process.exit(1);
}