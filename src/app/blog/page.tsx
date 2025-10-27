import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { sampleBlogPosts } from '@/data/sampleData';
import { getAllBlogPosts } from '@/lib/blog';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Business Daily Kenya - News, Insights & Articles | NewKenyan.com Blog',
  description: 'Read the latest business daily Kenya news, market insights, career advice, and industry trends. Stay informed with expert articles and analysis.',
  keywords: 'business daily kenya, kenya news, business news, market insights, career advice, industry trends, kenya business blog',
  openGraph: {
    title: 'Business Daily Kenya - News & Insights | NewKenyan.com Blog',
    description: 'Read the latest business daily Kenya news, market insights, career advice, and industry trends.',
    url: 'https://newkenyan.com/blog',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'NewKenyan.com Business Daily Blog'
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Daily Kenya - News & Insights | NewKenyan.com Blog',
    description: 'Read the latest business daily Kenya news, market insights, and industry trends.',
    images: ['https://newkenyan.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/blog',
  },
};

export default async function BlogPage() {
  // Get blog posts from both file system and sample data
  const filePosts = getAllBlogPosts();
  const combinedPosts = [...filePosts, ...sampleBlogPosts];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "NewKenyan.com Business Daily Blog",
            "description": "Latest business news, insights, and trends from Kenya",
            "url": "https://newkenyan.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "NewKenyan.com",
              "logo": "https://newkenyan.com/logo.png"
            },
            "blogPost": combinedPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.publishedAt.toISOString(),
              "image": post.featuredImage
            }))
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <Header />
        <BlogPageClient initialPosts={combinedPosts} />
        <Footer />
      </div>
    </>
  );
}