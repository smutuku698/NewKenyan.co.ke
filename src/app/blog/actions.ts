'use server';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  featuredImage: string;
  isTrending: boolean;
  content?: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  schema?: any;
}

function generateSEOData(post: any, content: string): any {
  // Auto-generate SEO title if not provided
  const seoTitle = post.seoTitle || `${post.title} | NewKenyan.com Blog`;
  
  // Auto-generate meta description if not provided
  const seoDescription = post.seoDescription || post.excerpt || content.substring(0, 160).replace(/<[^>]*>/g, '') + '...';
  
  // Auto-generate keywords based on title and category
  const autoKeywords = [
    post.category.toLowerCase(),
    'kenya',
    'business',
    'newkenyan',
    ...post.title.toLowerCase().split(' ').filter(word => word.length > 3)
  ].join(', ');
  
  const keywords = post.keywords || autoKeywords;
  
  // Generate schema markup
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": `https://newkenyan.com${post.featuredImage}`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://newkenyan.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NewKenyan.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://newkenyan.com/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "datePublished": post.publishedAt.toISOString(),
    "dateModified": post.publishedAt.toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://newkenyan.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": keywords,
    "wordCount": content.split(' ').length,
    "timeRequired": `PT${post.readTime}M`,
    "inLanguage": "en-KE"
  };

  return {
    seoTitle,
    seoDescription,
    keywords,
    schema
  };
}

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // Check if blog directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const posts: BlogPost[] = [];

  fileNames.forEach((fileName) => {
    const filePath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    let content = '';
    let frontMatter: any = {};
    
    // Handle different file types
    if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
      // Parse markdown with frontmatter
      const matterResult = matter(fileContents);
      content = matterResult.content;
      frontMatter = matterResult.data;
    } else if (fileName.endsWith('.html')) {
      // For HTML files, try to extract frontmatter if it exists
      const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
      const match = fileContents.match(frontMatterRegex);
      
      if (match) {
        // Parse YAML frontmatter
        const yamlContent = match[1];
        content = match[2];
        
        // Simple YAML parser for basic key-value pairs
        yamlContent.split('\n').forEach(line => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
            frontMatter[key.trim()] = value;
          }
        });
      } else {
        content = fileContents;
      }
    }

    const slug = fileName.replace(/\.(md|mdx|html)$/, '');
    
    // Basic post data
    const basePost = {
      id: slug,
      slug: slug,
      title: frontMatter.title || 'Untitled Post',
      excerpt: frontMatter.excerpt || frontMatter.description || content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      category: frontMatter.category || 'General',
      author: frontMatter.author || 'Anonymous',
      publishedAt: frontMatter.date ? new Date(frontMatter.date) : new Date(),
      readTime: frontMatter.readTime || Math.ceil(content.split(' ').length / 200),
      featuredImage: frontMatter.featuredImage || frontMatter.image || '/images/default-blog.svg',
      isTrending: frontMatter.trending === true || frontMatter.trending === 'true',
      content: content
    };

    // Generate SEO data automatically
    const seoData = generateSEOData(basePost, content);
    
    const post: BlogPost = {
      ...basePost,
      seoTitle: seoData.seoTitle,
      seoDescription: seoData.seoDescription,
      keywords: seoData.keywords,
      schema: seoData.schema
    };

    posts.push(post);
  });

  // Sort by published date (newest first)
  return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}