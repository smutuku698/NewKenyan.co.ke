'use client';

import { Facebook, Twitter, Linkedin } from 'lucide-react';

interface SocialFollowLinksProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'horizontal' | 'vertical';
}

export default function SocialFollowLinks({ 
  className = '', 
  size = 'md',
  variant = 'horizontal' 
}: SocialFollowLinksProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61565698142992',
      icon: Facebook,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-600'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/SimonNthen66255',
      icon: Twitter,
      color: 'hover:bg-blue-400 hover:text-white',
      bgColor: 'bg-blue-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/108658379',
      icon: Linkedin,
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-700'
    },
    {
      name: 'Pinterest',
      url: 'https://www.pinterest.com/ApartmentsForRentNow/',
      icon: ({ className: iconClassName }: { className?: string }) => (
        <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      color: 'hover:bg-red-600 hover:text-white',
      bgColor: 'bg-red-600'
    }
  ];

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const containerClasses = variant === 'horizontal' 
    ? 'flex flex-wrap gap-3' 
    : 'flex flex-col gap-2';

  return (
    <div className={`${containerClasses} ${className}`}>
      {socialLinks.map((social) => {
        const IconComponent = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg transition-colors ${social.color}`}
            title={`Follow us on ${social.name}`}
          >
            <IconComponent className={sizeClasses[size]} />
            <span>{social.name}</span>
          </a>
        );
      })}
    </div>
  );
}