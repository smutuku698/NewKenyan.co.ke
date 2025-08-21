'use client';

import { Share2 } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface ShareButtonProps {
  post: BlogPost;
}

export default function ShareButton({ post }: ShareButtonProps) {
  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    };

    try {
      // Use Web Share API if available
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Article URL copied to clipboard!');
      }
    } catch (error) {
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Article URL copied to clipboard!');
      } catch (clipboardError) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      title="Share this article"
    >
      <Share2 className="h-4 w-4" />
      Share
    </button>
  );
}