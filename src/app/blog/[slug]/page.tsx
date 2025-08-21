import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { sampleBlogPosts } from '@/data/sampleData';
import { getBlogPost, getAllBlogPosts, BlogPost } from '@/lib/blog';
import ShareButton from './ShareButtons';
import RelatedPostCard from './RelatedPostCard';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft
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
        
        <main className="py-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <article className="lg:col-span-3">
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
                  <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                      {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center justify-between gap-6 text-gray-600 mb-8 pb-8 border-b">
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          <span>By {post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      <ShareButton post={post} />
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-green-600 prose-strong:text-gray-900">
                      {post.content ? (
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                      ) : (
                        <div>
                          <p className="text-lg text-gray-700 mb-6">{post.excerpt}</p>
                          <p className="text-gray-700 mb-4">
                            This is where your blog post content will appear. You can add your HTML content here and it will be displayed properly.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Follow Us Section */}
                    <div className="mt-12 pt-8 border-t">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow us on social media</h3>
                      <div className="flex gap-4">
                        <a
                          href="https://facebook.com/newkenyan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Facebook
                        </a>
                        <a
                          href="https://twitter.com/newkenyan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                        >
                          Twitter
                        </a>
                        <a
                          href="https://linkedin.com/company/newkenyan"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <RelatedPostCard key={relatedPost.id} post={relatedPost} />
                      ))}
                    </div>
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Author Bio */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <p className="text-sm text-gray-600">Contributing Writer</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expert writer covering business, technology, and lifestyle topics relevant to Kenya's growing economy.
                  </p>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest business news and insights delivered to your inbox.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Subscribe to Newsletter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}