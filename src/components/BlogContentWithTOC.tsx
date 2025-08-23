'use client';

import { useEffect, useRef } from 'react';

interface BlogContentWithTOCProps {
  content: string;
  format: 'html' | 'md' | 'mdx';
  htmlContent?: string;
}

export default function BlogContentWithTOC({ content, format, htmlContent }: BlogContentWithTOCProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Add IDs to headings that don't have them for anchor linking
      const headings = contentRef.current.querySelectorAll('h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          const text = heading.textContent || '';
          const id = text.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() || `heading-${index}`;
          heading.id = id;
        }
      });
    }
  }, [htmlContent, content]);

  return (
    <div 
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: htmlContent || content }}
      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-lg prose-img:w-full prose-img:h-auto prose-h1:text-h1-mobile prose-h1:lg:text-h1-desktop prose-h1:font-heading prose-h1:font-semibold"
    />
  );
}