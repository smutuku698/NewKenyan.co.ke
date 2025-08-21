---
title: "Blog System Documentation - Auto SEO & Schema Generation"
excerpt: "Complete guide to NewKenyan.com's automated blog system with SEO optimization and schema markup generation."
category: "Documentation"
author: "NewKenyan Admin"
date: "2024-08-21"
readTime: 8
featuredImage: "/images/default-blog.svg"
trending: false
---

# NewKenyan.com Blog System Documentation

This documentation explains our automated blog system that generates SEO metadata and schema markup for every blog post.

## 🚀 Auto-Generation Features

When you upload a new blog post (`.md`, `.mdx`, or `.html`), the system automatically:

### 1. SEO Metadata Generation
- **SEO Title**: Auto-formats as "Your Post Title | NewKenyan.com Blog"
- **Meta Description**: Uses excerpt or first 160 characters of content
- **Keywords**: Combines category + "kenya, business, newkenyan" + title keywords
- **OpenGraph Tags**: For Facebook/LinkedIn sharing with proper images
- **Twitter Cards**: Optimized for Twitter sharing

### 2. JSON-LD Schema Markup
- **BlogPosting Schema**: Full structured data for search engines
- **Publisher Info**: NewKenyan.com organization details
- **Author Details**: Person schema with author information
- **Article Metadata**: Word count, reading time, publish date
- **Image Optimization**: Proper image schema with dimensions

### 3. Performance Optimization
- **Server-Side Rendering**: Full SSR for optimal SEO
- **Static Generation**: Pre-builds all blog pages
- **Meta Tags**: Proper canonical URLs and language tags

## 📝 How to Add Blog Posts

### Option 1: Markdown Files (.md or .mdx)

Create a file in `src/content/blog/` with frontmatter:

```markdown
---
title: "Your Business Article Title"
excerpt: "Compelling description for SEO and social sharing"
category: "Business" # Options: Business, Technology, Finance, etc.
author: "Your Name"
date: "2024-08-21"
readTime: 5 # Optional - auto-calculated if not provided
featuredImage: "/images/your-image.jpg" # Optional - uses default if not provided
trending: false # Optional - marks as trending article
seoTitle: "Custom SEO Title" # Optional - auto-generated if not provided
seoDescription: "Custom meta description" # Optional - auto-generated if not provided
keywords: "custom, keywords, here" # Optional - auto-generated if not provided
---

# Your Article Content

Write your markdown content here. The system supports:

- **Bold text** and *italic text*
- [Links](https://example.com)
- Lists and bullet points
- Code blocks and syntax highlighting
- Images and media

## Subheadings

All markdown formatting is supported and will be properly styled.
```

### Option 2: HTML Files (.html)

Create an HTML file with YAML frontmatter:

```html
---
title: "Your HTML Article Title"
excerpt: "Description for this HTML article"
category: "Technology"
author: "Your Name"
date: "2024-08-21"
featuredImage: "/images/tech-article.jpg"
---

<h1>Your HTML Content</h1>
<p>Write your HTML content here. Full HTML is supported including:</p>

<ul>
  <li>Custom styling with CSS classes</li>
  <li>Embedded media and iframes</li>
  <li>Complex layouts and components</li>
</ul>

<h2>Rich Content</h2>
<p>You can include any HTML elements, embedded videos, images, and more.</p>
```

## 🔧 Advanced Features

### Custom SEO Fields
Override auto-generation by providing these optional fields:

- `seoTitle`: Custom page title (defaults to "Title | NewKenyan.com Blog")
- `seoDescription`: Custom meta description (defaults to excerpt or content snippet)
- `keywords`: Custom keywords (defaults to auto-generated based on category and title)

### Auto-Generated Fields
The system automatically calculates:

- **Reading Time**: Based on word count (200 words per minute)
- **Word Count**: For schema markup
- **Publication Date**: Uses file date if not specified
- **Image URLs**: Converts to full URLs for social sharing
- **Slug**: Based on filename for clean URLs

## 📊 What Happens When You Upload

1. **File Processing**: System reads your `.md`, `.mdx`, or `.html` file
2. **Frontmatter Parsing**: Extracts metadata from YAML header
3. **Content Processing**: Parses markdown or HTML content
4. **SEO Generation**: Auto-generates missing SEO fields
5. **Schema Creation**: Builds JSON-LD structured data
6. **Static Generation**: Pre-renders the page for performance
7. **Metadata Injection**: Adds all SEO tags to HTML head

## 🌐 Social Sharing Features

Each blog post includes:

### Share Button
- Uses Web Share API on supported devices
- Fallback to clipboard copy on desktop
- Shares post title, excerpt, and URL

### Social Follow Links
- Links to NewKenyan.com social profiles
- Separate from article sharing functionality
- Facebook, Twitter, and LinkedIn integration

## 📁 File Organization

```
src/content/blog/
├── your-article-slug.md        # Becomes /blog/your-article-slug
├── another-post.html           # Becomes /blog/another-post
└── business-guide.mdx          # Becomes /blog/business-guide
```

## 🔍 SEO Best Practices

For optimal SEO, include:

1. **Descriptive titles** (50-60 characters)
2. **Compelling excerpts** (150-160 characters)
3. **High-quality featured images** (1200x630px recommended)
4. **Relevant categories** for proper organization
5. **Fresh content** with recent dates
6. **Kenya-focused keywords** for local SEO

## 🚀 Getting Started

1. Create your content file in `src/content/blog/`
2. Add proper frontmatter with required fields
3. Write your content using markdown or HTML
4. Save the file - the system handles everything else!
5. Your post appears automatically on `/blog` with full SEO optimization

The system is designed to be simple for content creators while providing enterprise-level SEO optimization automatically.