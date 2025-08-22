import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { sampleBlogPosts } from '@/data/sampleData';
import { getBlogPost, getAllBlogPosts } from '@/lib/blog';
import ShareButton from './ShareButtons';
import RelatedPostCard from './RelatedPostCard';
import BlogContentWithTOC from '@/components/BlogContentWithTOC';
import SocialFollowLinks from '@/components/SocialFollowLinks';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  // Try to find in file posts first
  let post = getBlogPost(resolvedParams.slug);
  
  // If not found, try sample posts
  if (!post) {
    post = sampleBlogPosts.find(p => p.id === resolvedParams.slug) || null;
  }
  
  if (!post) {
    return {
      title: 'Post Not Found | NewKenyan.com Blog',
    };
  }

  return {
    title: post.seoTitle || `${post.title} | NewKenyan.com Blog`,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `https://newkenyan.com/blog/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const filePosts = getAllBlogPosts();
  const allPosts = [...filePosts, ...sampleBlogPosts];
  
  return allPosts.map((post) => ({
    slug: post.slug || post.id,
  }));
}


export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  // Try to find in file posts first
  let post = getBlogPost(resolvedParams.slug);
  
  // If not found, try sample posts
  if (!post) {
    post = sampleBlogPosts.find(p => p.id === resolvedParams.slug) || null;
  }
  
  if (!post) {
    notFound();
  }
  
  // Get related posts from same category
  const allPosts = [...getAllBlogPosts(), ...sampleBlogPosts];
  const relatedPosts = allPosts
    .filter(p => p.id !== resolvedParams.slug && p.category === post.category)
    .slice(0, 3);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.schema || {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://newkenyan.com${post.featuredImage}`,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "NewKenyan.com",
              "logo": "https://newkenyan.com/logo.png"
            },
            "datePublished": post.publishedAt.toISOString(),
            "dateModified": post.publishedAt.toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://newkenyan.com/blog/${post.slug}`
            }
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-6 md:py-8 lg:py-12">
          <div className="container mx-auto px-3 sm:px-6 lg:px-8 max-w-7xl">
            {/* Breadcrumb */}
            <div className="mb-6 md:mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
              {/* Main Content */}
              <article className="lg:col-span-3 min-w-0">
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  {/* Featured Image */}
                  <div className="relative">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-96 object-cover"
                      priority
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Header */}
                  <div className="p-6 md:p-8">
                    <h1 className="display-title mb-6">
                      {post.title}
                    </h1>
                    
                    {/* Enhanced Article Metadata */}
                    <div className="bg-gray-50 rounded-lg p-4 md:p-6 mb-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Author and Article Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{post.author}</p>
                              <p className="text-sm text-gray-600">Contributing Writer</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-green-600" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-green-600" />
                              <span>{post.readTime} min read</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-green-600" />
                              <span>{post.category}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Share Button */}
                        <div className="flex items-center gap-3">
                          <ShareButton post={post} />
                        </div>
                      </div>
                      
                      {/* Social Follow Section */}
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Follow NewKenyan.com</h3>
                            <p className="text-xs text-gray-600">Stay updated with our latest articles and insights</p>
                          </div>
                          <SocialFollowLinks size="sm" className="flex-shrink-0" />
                        </div>
                      </div>
                    </div>

                    {/* Article Content */}
                    {post.content ? (
                      <BlogContentWithTOC 
                        content={post.content} 
                        format={post.format || "html"}
                        htmlContent={post.htmlContent}
                      />
                    ) : (
                      <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-strong:text-gray-900">
                        <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
                        <p className="text-gray-700 mb-4">
                          This is where your blog post content will appear. You can add your HTML content here and it will be displayed properly.
                        </p>
                      </div>
                    )}

                    {/* Enhanced Follow Us Section */}
                    <div className="mt-12 pt-8 border-t bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Connected with NewKenyan.com</h3>
                        <p className="text-gray-600">Follow us for the latest updates, insights, and opportunities in Kenya</p>
                      </div>
                      <div className="flex justify-center">
                        <SocialFollowLinks size="md" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-16">
                    <h2 className="section-title mb-8 text-center">Related Articles</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Enhanced Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-6">
                  {/* Author Bio */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="subsection-title mb-4">About the Author</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                        <User className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-base">{post.author}</h4>
                        <p className="text-sm text-gray-600">Contributing Writer</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Expert writer covering business, technology, and lifestyle topics relevant to Kenya's growing economy.
                    </p>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-100 p-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="subsection-title mb-2">Stay Updated</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Get the latest business news and insights delivered to your inbox.
                      </p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors">
                      Subscribe to Newsletter
                    </Button>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="subsection-title mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <Link href="/jobs-in-kenya" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium">
                        <span>Jobs in Kenya</span>
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </Link>
                      <Link href="/business-directory" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium">
                        <span>Business Directory</span>
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </Link>
                      <Link href="/properties" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium">
                        <span>Properties</span>
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </Link>
                      <Link href="/blog" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors text-sm font-medium">
                        <span>More Articles</span>
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}