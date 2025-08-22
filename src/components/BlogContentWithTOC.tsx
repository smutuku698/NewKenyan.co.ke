'use client';

import { useEffect, useRef, useState } from 'react';
import TableOfContents from './TableOfContents';

interface BlogContentWithTOCProps {
  content: string;
  format: 'html' | 'md' | 'mdx';
}

export default function BlogContentWithTOC({ content, format }: BlogContentWithTOCProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState<string>('');
  const [showTOC, setShowTOC] = useState<boolean>(false);

  useEffect(() => {
    const processContent = () => {
      let processed = content;
      
      if (format === 'html') {
        // For HTML content, find the first paragraph and insert TOC placeholder after it
        const paragraphMatch = processed.match(/(<p[^>]*>.*?<\/p>)/i);
        if (paragraphMatch) {
          const firstParagraph = paragraphMatch[0];
          const tocMarker = '<div class="toc-insertion-point"></div>';
          processed = processed.replace(firstParagraph, firstParagraph + tocMarker);
          setShowTOC(true);
        }
      } else {
        // For Markdown content, convert to HTML-like structure for processing
        const lines = processed.split('\n');
        let insertIndex = -1;
        
        // Find first paragraph (not heading, not empty line)
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line && !line.startsWith('#') && !line.startsWith('![') && line.length > 20) {
            insertIndex = i;
            break;
          }
        }
        
        if (insertIndex !== -1) {
          lines.splice(insertIndex + 1, 0, '<div class="toc-insertion-point"></div>');
          processed = lines.join('\n');
          setShowTOC(true);
        }
      }
      
      setProcessedContent(processed);
    };

    processContent();
  }, [content, format]);

  useEffect(() => {
    if (contentRef.current && showTOC) {
      // Add IDs to headings that don't have them
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
  }, [processedContent, showTOC]);

  const renderContentWithTOC = () => {
    if (!showTOC) {
      return (
        <div 
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: processedContent }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-strong:text-gray-900"
        />
      );
    }

    const parts = processedContent.split('<div class="toc-insertion-point"></div>');
    if (parts.length !== 2) {
      return (
        <div 
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: processedContent }}
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-strong:text-gray-900"
        />
      );
    }

    return (
      <div ref={contentRef} className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-strong:text-gray-900">
        <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
        <TableOfContents content={content} format={format} />
        <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
      </div>
    );
  };

  return renderContentWithTOC();
}