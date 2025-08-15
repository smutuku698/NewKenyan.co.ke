import Image from 'next/image';
import { Calendar, Clock, User, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: Date;
  readTime: number;
  featuredImage: string;
  isTrending: boolean;
}

const BlogCard = ({
  title,
  excerpt,
  category,
  author,
  publishedAt,
  readTime,
  featuredImage,
  isTrending,
}: BlogCardProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Business': 'bg-green-100 text-green-800',
      'Lifestyle': 'bg-purple-100 text-purple-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
      'Startups': 'bg-pink-100 text-pink-800',
      'Career': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={featuredImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex space-x-2">
          <Badge className={`text-xs ${getCategoryColor(category)}`}>
            {category}
          </Badge>
          {isTrending && (
            <Badge className="bg-red-100 text-red-800 text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {author}
          </div>
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(publishedAt)}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {readTime} min read
          </div>
        </div>

        {/* Read More Button */}
        <Button 
          variant="ghost" 
          className="w-full justify-between hover:bg-green-50 hover:text-green-600 transition-colors group"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;