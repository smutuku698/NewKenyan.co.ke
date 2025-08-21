'use client';

import Image from 'next/image';
import Link from 'next/link';

interface RelatedPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: number;
  featuredImage?: string;
}

interface RelatedPostCardProps {
  post: RelatedPost;
}

export default function RelatedPostCard({ post }: RelatedPostCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/images/default-blog.svg';
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <Image
        src={post.featuredImage || '/images/default-blog.svg'}
        alt={post.title}
        width={300}
        height={200}
        className="w-full h-40 object-cover"
        onError={handleImageError}
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{post.author}</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </article>
  );
}