"use client";

import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Copy } from 'lucide-react';

interface JobActionsProps {
  job: {
    id: number;
    job_title: string;
    job_location: string;
  };
  currentUrl: string;
  shareText: string;
  showInlineButton?: boolean;
}

export default function JobActions({ job, currentUrl, shareText, showInlineButton = false }: JobActionsProps) {
  const handleApplyNow = () => {
    const subject = encodeURIComponent(`Application for ${job.job_title} - ${job.job_location}`);
    const body = encodeURIComponent(`Dear HR Team,

I am writing to apply for the ${job.job_title} position at ${job.job_location}.

Please find my CV attached.

Best regards,`);
    
    window.location.href = `mailto:hr@newkenyan.com?subject=${subject}&body=${body}`;
  };

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    };
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(currentUrl);
      return;
    }
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  if (showInlineButton) {
    return (
      <div className="pt-6 border-t border-green-200">
        <Button
          onClick={handleApplyNow}
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Apply Now via Email
        </Button>
      </div>
    );
  }

  return (
    <div className="sticky top-24 space-y-6">
      {/* Apply Now Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this Job</h3>
        <p className="text-gray-600 mb-6">Ready to take the next step in your career in Kenya?</p>
        <Button
          onClick={handleApplyNow}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 font-semibold rounded-lg"
        >
          Apply Now
        </Button>
      </div>

      {/* Share Job Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Share this Job</h3>
        <p className="text-gray-600 mb-4">Help others find this opportunity</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center space-x-2"
          >
            <Twitter className="h-4 w-4" />
            <span>Twitter</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center space-x-2"
          >
            <Facebook className="h-4 w-4" />
            <span>Facebook</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('linkedin')}
            className="flex items-center justify-center space-x-2"
          >
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('copy')}
            className="flex items-center justify-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>Copy Link</span>
          </Button>
        </div>
      </div>
    </div>
  );
}