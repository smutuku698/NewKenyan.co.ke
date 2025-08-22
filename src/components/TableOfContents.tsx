'use client';

import { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  format: 'html' | 'md' | 'mdx';
}

export default function TableOfContents({ content, format }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const extractHeadings = () => {
      const items: TOCItem[] = [];
      
      if (format === 'html') {
        // For HTML content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const headings = tempDiv.querySelectorAll('h2, h3, h4, h5, h6');
        
        headings.forEach((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1));
          const text = heading.textContent || '';
          const id = heading.id || `heading-${index}`;
          
          // Add ID to heading if it doesn't have one
          if (!heading.id) {
            heading.id = id;
          }
          
          items.push({ id, text, level });
        });
      } else {
        // For Markdown/MDX content
        const headingRegex = /^(#{2,6})\s+(.+)$/gm;
        let match;
        let index = 0;
        
        while ((match = headingRegex.exec(content)) !== null) {
          const level = match[1].length;
          const text = match[2].trim();
          const id = text.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
          
          items.push({ id: id || `heading-${index}`, text, level });
          index++;
        }
      }
      
      setTocItems(items);
    };

    extractHeadings();
  }, [content, format]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="toc-container sticky top-4 bg-white border-2 border-green-100 rounded-xl shadow-lg mb-8 mx-auto max-w-3xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="toc-toggle w-full p-4 md:p-5 text-left font-semibold bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 transition-all duration-200 flex items-center justify-between"
      >
        <span className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">📋</span>
          </div>
          <span className="text-gray-900 text-base md:text-lg">Table of Contents</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 hidden sm:block">
            {tocItems.length} sections
          </span>
          <span className={`transform transition-transform duration-300 text-green-600 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </button>
      
      {isExpanded && (
        <nav className="toc-content p-4 md:p-5 bg-white border-t border-green-100">
          <div className="space-y-1">
            {tocItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left py-2 px-3 rounded-lg transition-all duration-200 hover:bg-green-50 hover:text-green-700 group ${
                  item.level === 2 ? 'font-medium text-gray-900 text-base' : 
                  item.level === 3 ? 'ml-4 text-sm text-gray-700 font-medium' :
                  item.level === 4 ? 'ml-8 text-sm text-gray-600' :
                  item.level === 5 ? 'ml-12 text-xs text-gray-600' :
                  'ml-16 text-xs text-gray-500'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="line-clamp-2">{item.text}</span>
                </span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}