'use client';

import { Share2, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { BlogPost } from '@/lib/blog';
import { useState } from 'react';

interface ShareButtonProps {
  post: BlogPost;
}

export default function ShareButton({ post }: ShareButtonProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${post.title}`;

  const handleNativeShare = async () => {
    if (typeof window === 'undefined') return;
    
    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await handleCopyToClipboard();
      }
    } catch (error) {
      await handleCopyToClipboard();
    }
    setShowShareOptions(false);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        title="Share this article"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {showShareOptions && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 min-w-48 z-10">
          <div className="flex flex-col space-y-1">
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Share2 className="h-4 w-4 text-green-600" />
              <span>Share via...</span>
            </button>
            
            <button
              onClick={shareToFacebook}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              <span>Facebook</span>
            </button>
            
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Twitter className="h-4 w-4 text-blue-400" />
              <span>Twitter</span>
            </button>
            
            <button
              onClick={shareToLinkedIn}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              <Linkedin className="h-4 w-4 text-blue-700" />
              <span>LinkedIn</span>
            </button>
            
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
            >
              {copiedToClipboard ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-gray-600" />
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}