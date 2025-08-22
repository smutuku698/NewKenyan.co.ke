# Blog SEO Workflow

## Adding New Articles

When you add new blog articles (especially HTML files), follow this workflow to ensure they're SEO-optimized before pushing to GitHub:

### 1. Add Your Article
Place your HTML article in `src/content/blog/your-article.html`

### 2. Process SEO (Required)
Run the SEO processor to optimize your content:

```bash
# Option A: Process all articles
npm run process-blog-seo

# Option B: Process specific article
npm run process-blog-file your-article.html

# Option C: Full preparation workflow
npm run prepare-push
```

### 3. Review Changes
Check what the processor changed:
```bash
git diff
```

### 4. Commit & Push
```bash
git add .
git commit -m "Add SEO-optimized blog article"
git push
```

## What the SEO Processor Does

✅ **Domain Replacement**: `your-domain.com` → `newkenyan.com`  
✅ **Frontmatter Addition**: Adds YAML metadata for blog system  
✅ **Author Info**: Sets author to "Melvin Akinyi"  
✅ **Schema Enhancement**: Fills placeholder schema data  
✅ **LocalBusiness Schema**: Adds Kenya location data  
✅ **Person Schema**: Adds author credibility  
✅ **FAQ Answers**: Fills empty FAQ responses  
✅ **Address Updates**: Uses real Nairobi office address  

## File Structure

```
src/content/blog/
├── your-article.html          ← Original article
└── your-article-processed.html ← After SEO processing
```

## Important Notes

- **Always run SEO processing** before pushing articles
- The processor is **safe to run multiple times** on the same file
- **Review changes** before committing
- Articles without frontmatter will get default metadata
- All schema placeholders will be replaced with real data

## Quick Commands

```bash
# Process and prepare for push
npm run prepare-push

# Just process SEO
npm run process-blog-seo

# Process single file
npm run process-blog-file filename.html
```