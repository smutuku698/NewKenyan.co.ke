import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

export interface SEOConfig {
  domain: string;
  siteName: string;
  author: {
    name: string;
    linkedIn: string;
  };
  organization: {
    name: string;
    address: string;
    phone?: string;
    email?: string;
    socialProfiles?: string[];
  };
}

const DEFAULT_CONFIG: SEOConfig = {
  domain: 'newkenyan.com',
  siteName: 'NewKenyan.com',
  author: {
    name: 'Melvin Akinyi',
    linkedIn: 'https://www.linkedin.com/in/melvin-akinyi-993929338/recent-activity/all/'
  },
  organization: {
    name: 'NewKenyan.com',
    address: '8th Floor, Wing C - West End Towers, Waiyaki Way, Westlands, Nairobi, Kenya - 00100',
    phone: '+254-xxx-xxx-xxx',
    email: 'info@newkenyan.com',
    socialProfiles: [
      'https://www.facebook.com/newkenyan',
      'https://www.twitter.com/newkenyan',
      'https://www.linkedin.com/company/newkenyan'
    ]
  }
};

export class SEOProcessor {
  private config: SEOConfig;

  constructor(config: SEOConfig = DEFAULT_CONFIG) {
    this.config = config;
  }

  /**
   * Process HTML article content for SEO enhancement
   */
  public processHTMLArticle(content: string, fileName: string): string {
    const dom = new JSDOM(content);
    const document = dom.window.document;

    // Extract article metadata
    const metadata = this.extractMetadata(document);
    
    // Process domain replacements
    content = this.replaceDomainPlaceholders(content);
    
    // Enhance schema markup
    content = this.enhanceSchemaMarkup(content, metadata);
    
    // Add missing schema types
    content = this.addMissingSchema(content, metadata);
    
    // Generate frontmatter if missing
    const frontmatter = this.generateFrontmatter(metadata, fileName);
    
    // Add frontmatter to content if not present
    if (!content.includes('---')) {
      content = `---\n${frontmatter}\n---\n${content}`;
    }

    return content;
  }

  /**
   * Extract metadata from HTML document
   */
  private extractMetadata(document: Document): any {
    const title = document.querySelector('title')?.textContent || 
                  document.querySelector('h1')?.textContent || 
                  'Untitled Article';
    
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    
    // Extract category from breadcrumb schema or content
    const category = this.extractCategory(document);
    
    // Extract reading time and word count
    const wordCount = this.extractWordCount(document);
    const readTime = Math.ceil(wordCount / 200);

    // Extract FAQ questions for answers
    const faqQuestions = this.extractFAQQuestions(document);

    return {
      title: title.replace(/^How to Passport/, 'How to Get a Passport'),
      description: metaDescription,
      keywords,
      category,
      wordCount,
      readTime,
      faqQuestions,
      publishedAt: new Date().toISOString()
    };
  }

  /**
   * Replace domain placeholders with actual domain
   */
  private replaceDomainPlaceholders(content: string): string {
    return content
      .replace(/your-domain\.com/g, this.config.domain)
      .replace(/Your Website Name/g, this.config.siteName)
      .replace(/Your Company Name/g, this.config.organization.name)
      .replace(/\+1-555-555-5555/g, this.config.organization.phone || '+254-xxx-xxx-xxx')
      .replace(/Content Team/g, this.config.author.name);
  }

  /**
   * Enhance existing schema markup
   */
  private enhanceSchemaMarkup(content: string, metadata: any): string {
    // Replace schema placeholders
    content = content.replace(
      /"datePublished":\s*"[^"]*"/g,
      `"datePublished": "${metadata.publishedAt}"`
    );
    
    content = content.replace(
      /"dateModified":\s*"[^"]*"/g,
      `"dateModified": "${metadata.publishedAt}"`
    );

    // Add author information
    content = content.replace(
      /"author":\s*{[^}]*}/g,
      `"author": {
        "@type": "Person",
        "name": "${this.config.author.name}",
        "url": "${this.config.author.linkedIn}"
      }`
    );

    // Enhance organization schema
    content = content.replace(
      /"publisher":\s*{[^}]*}/g,
      `"publisher": {
        "@type": "Organization",
        "name": "${this.config.organization.name}",
        "logo": {
          "@type": "ImageObject",
          "url": "https://${this.config.domain}/logo.png",
          "width": 200,
          "height": 60
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "${this.config.organization.address}",
          "addressLocality": "Nairobi",
          "addressCountry": "Kenya"
        }
      }`
    );

    // Fill FAQ answers
    content = this.fillFAQAnswers(content, metadata);

    return content;
  }

  /**
   * Add missing schema types
   */
  private addMissingSchema(content: string, metadata: any): string {
    const additionalSchema = this.generateAdditionalSchema(metadata);
    
    // Find the closing script tag of existing schema and insert before it
    const schemaEndIndex = content.lastIndexOf('</script>');
    if (schemaEndIndex !== -1) {
      content = content.slice(0, schemaEndIndex) + 
                additionalSchema + 
                content.slice(schemaEndIndex);
    }

    return content;
  }

  /**
   * Generate additional schema markup
   */
  private generateAdditionalSchema(metadata: any): string {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `https://${this.config.domain}#author`,
      "name": this.config.author.name,
      "url": this.config.author.linkedIn,
      "jobTitle": "Content Writer",
      "worksFor": {
        "@type": "Organization",
        "name": this.config.organization.name
      }
    };

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://${this.config.domain}#business`,
      "name": this.config.organization.name,
      "url": `https://${this.config.domain}`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": this.config.organization.address,
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
      "telephone": this.config.organization.phone,
      "email": this.config.organization.email,
      "areaServed": {
        "@type": "Country",
        "name": "Kenya"
      },
      "sameAs": this.config.organization.socialProfiles
    };

    return `,\n    ${JSON.stringify(personSchema, null, 6)},\n    ${JSON.stringify(localBusinessSchema, null, 6)}`;
  }

  /**
   * Generate frontmatter for HTML articles
   */
  private generateFrontmatter(metadata: any, fileName: string): string {
    const slug = fileName.replace('.html', '').replace(/^.*\//, '');
    
    return `title: "${metadata.title}"
slug: "${slug}"
author: "${this.config.author.name}"
category: "${metadata.category}"
excerpt: "${metadata.description}"
publishedAt: "${metadata.publishedAt}"
readTime: ${metadata.readTime}
featuredImage: "/images/default-blog.svg"
seoTitle: "${metadata.title}"
seoDescription: "${metadata.description}"
keywords: "${metadata.keywords}"`;
  }

  /**
   * Extract category from document
   */
  private extractCategory(document: Document): string {
    // Try to extract from breadcrumb schema
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const script of scripts) {
      try {
        const schema = JSON.parse(script.textContent || '');
        if (schema['@type'] === 'Article' && schema.articleSection) {
          return schema.articleSection;
        }
        if (schema['@graph']) {
          for (const item of schema['@graph']) {
            if (item['@type'] === 'Article' && item.articleSection) {
              return item.articleSection;
            }
          }
        }
      } catch (e) {
        // Continue if JSON parsing fails
      }
    }
    
    // Fallback to extracting from content
    const h1 = document.querySelector('h1')?.textContent || '';
    if (h1.toLowerCase().includes('passport')) return 'Immigration';
    if (h1.toLowerCase().includes('business')) return 'Business';
    if (h1.toLowerCase().includes('job')) return 'Jobs';
    
    return 'General';
  }

  /**
   * Extract word count from document
   */
  private extractWordCount(document: Document): number {
    const wordCountMeta = document.querySelector('meta[name="article:word_count"]');
    if (wordCountMeta) {
      return parseInt(wordCountMeta.getAttribute('content') || '0');
    }
    
    // Count words in article content
    const article = document.querySelector('article');
    if (article) {
      const text = article.textContent || '';
      return text.split(/\s+/).filter(word => word.length > 0).length;
    }
    
    return 0;
  }

  /**
   * Extract FAQ questions from document
   */
  private extractFAQQuestions(document: Document): string[] {
    const questions: string[] = [];
    const faqHeaders = document.querySelectorAll('h2, h3');
    
    faqHeaders.forEach(header => {
      const text = header.textContent || '';
      if (text.includes('?')) {
        questions.push(text);
      }
    });
    
    return questions;
  }

  /**
   * Fill FAQ answers in schema
   */
  private fillFAQAnswers(content: string, metadata: any): string {
    // This is a simplified version - in a real implementation,
    // you might want to extract actual answers from the content
    return content.replace(
      /"text":\s*""/g,
      `"text": "For detailed information about this topic, please refer to the complete guide above."`
    );
  }
}

/**
 * Process a single blog file for SEO enhancement
 */
export function processBlogFile(filePath: string, config?: SEOConfig): void {
  const processor = new SEOProcessor(config);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  
  if (fileName.endsWith('.html')) {
    const processedContent = processor.processHTMLArticle(content, fileName);
    fs.writeFileSync(filePath, processedContent, 'utf8');
    console.log(`Processed HTML file: ${fileName}`);
  }
}

/**
 * Process all blog files in the content directory
 */
export function processAllBlogFiles(blogDirectory: string, config?: SEOConfig): void {
  const processor = new SEOProcessor(config);
  
  if (!fs.existsSync(blogDirectory)) {
    throw new Error(`Blog directory not found: ${blogDirectory}`);
  }
  
  const files = fs.readdirSync(blogDirectory);
  
  files.forEach(fileName => {
    const filePath = path.join(blogDirectory, fileName);
    
    if (fileName.endsWith('.html')) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const processedContent = processor.processHTMLArticle(content, fileName);
        fs.writeFileSync(filePath, processedContent, 'utf8');
        console.log(`✅ Processed: ${fileName}`);
      } catch (error) {
        console.error(`❌ Error processing ${fileName}:`, error);
      }
    }
  });
}