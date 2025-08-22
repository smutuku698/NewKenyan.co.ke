import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

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
  content: string;
  slug: string;
  format: 'html' | 'md' | 'mdx';
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  schema?: any;
}

function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getAllBlogPosts(): BlogPost[] {
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
    
    if (fileName.endsWith('.md') || fileName.endsWith('.mdx')) {
      const matterResult = matter(fileContents);
      content = matterResult.content;
      frontMatter = matterResult.data;
    } else if (fileName.endsWith('.html')) {
      const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
      const match = fileContents.match(frontMatterRegex);
      
      if (match) {
        const yamlContent = match[1];
        content = match[2];
        
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

    const title = frontMatter.title || 'Untitled Post';
    const slug = frontMatter.slug || generateSlugFromTitle(title);
    
    const post: BlogPost = {
      id: slug,
      slug: slug,
      title: title,
      excerpt: frontMatter.excerpt || frontMatter.description || content.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      category: frontMatter.category || 'General',
      author: frontMatter.author || 'Anonymous',
      publishedAt: frontMatter.date ? new Date(frontMatter.date) : new Date(),
      readTime: frontMatter.readTime || Math.ceil(content.split(' ').filter(word => word.length > 0).length / 200),
      featuredImage: frontMatter.featuredImage || frontMatter.image || '/images/default-blog.svg',
      isTrending: frontMatter.trending === true || frontMatter.trending === 'true',
      content: content,
      seoTitle: frontMatter.seoTitle,
      seoDescription: frontMatter.seoDescription,
      keywords: frontMatter.keywords,
      schema: frontMatter.schema
    };

    posts.push(post);
  });

  return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}