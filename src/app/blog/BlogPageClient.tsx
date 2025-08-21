'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BlogPost } from './actions';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  TrendingUp, 
  Mail, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Filter
} from 'lucide-react';

interface BlogPageClientProps {
  initialPosts: BlogPost[];
}

export default function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [randomPosts, setRandomPosts] = useState<BlogPost[]>([]);
  const [email, setEmail] = useState('');

  const categories = ['All', ...Array.from(new Set(initialPosts.map(post => post.category)))];
  const trendingPosts = initialPosts.filter(post => post.isTrending);
  
  // Get random posts for internal linking
  const getRandomPosts = (currentPostId?: string, count: number = 3) => {
    const availablePosts = initialPosts.filter(post => post.id !== currentPostId);
    const shuffled = [...availablePosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (initialPosts.length > 0) {
      setRandomPosts(getRandomPosts(undefined, 6));
    }
  }, [initialPosts]);

  useEffect(() => {
    let filtered = initialPosts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory, initialPosts]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              Business Daily Kenya - News & Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay updated with the latest business news, market insights, career advice, and industry trends shaping Kenya&apos;s economy and business landscape.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search articles, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-4 text-lg border-2 border-gray-200 focus:border-green-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    (selectedCategory === category) || (category === 'All' && !selectedCategory)
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured/Trending Posts */}
              {!searchTerm && !selectedCategory && trendingPosts.length > 0 && (
                <section className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="h-6 w-6 text-red-600" />
                    <h2 className="text-2xl font-bold text-gray-900">Trending Articles</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {trendingPosts.map((post) => (
                      <article key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative">
                          <Image
                            src={post.featuredImage || '/images/default-blog.svg'}
                            alt={post.title}
                            width={600}
                            height={300}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/default-blog.svg';
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Trending
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime} min read
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            <Link href={`/blog/${post.id}`} className="hover:text-green-600 transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{post.author}</span>
                            </div>
                            
                            <Link 
                              href={`/blog/${post.id}`}
                              className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center gap-1"
                            >
                              Read More
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {/* All Articles */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {searchTerm ? `Search Results (${filteredPosts.length})` : 
                     selectedCategory ? `${selectedCategory} Articles` : 'Latest Articles'}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Filter className="h-4 w-4" />
                    <span>{filteredPosts.length} articles found</span>
                  </div>
                </div>
                
                <div className="grid gap-8">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <Image
                            src={post.featuredImage || '/images/default-blog.svg'}
                            alt={post.title}
                            width={400}
                            height={250}
                            className="w-full h-48 md:h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/default-blog.svg';
                            }}
                          />
                        </div>
                        
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime} min read
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            <Link href={`/blog/${post.id}`} className="hover:text-green-600 transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{post.author}</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <button className="text-gray-400 hover:text-green-600 transition-colors">
                                  <Share2 className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <Link 
                                href={`/blog/${post.id}`}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors flex items-center gap-1"
                              >
                                Read Full Article
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                {filteredPosts.length > 6 && (
                  <div className="text-center mt-12">
                    <Button 
                      onClick={() => {
                        // For now, just show message - can implement pagination later
                        alert('Showing all available articles. More content coming soon!');
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Newsletter Signup */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="text-center mb-6">
                  <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Subscribe to Business Daily Kenya
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get the latest business news and insights delivered to your inbox
                  </p>
                </div>
                
                <form onSubmit={handleNewsletterSignup}>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                    required
                  />
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Subscribe Now
                  </Button>
                </form>
              </div>

              {/* Random Articles for Internal Linking */}
              {randomPosts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">You Might Also Like</h3>
                  
                  <div className="space-y-4">
                    {randomPosts.slice(0, 4).map((post) => (
                      <article key={post.id} className="border-b border-gray-100 pb-4 last:border-0">
                        <div className="flex gap-3">
                          <Image
                            src={post.featuredImage || '/images/default-blog.svg'}
                            alt={post.title}
                            width={80}
                            height={60}
                            className="w-20 h-15 object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/default-blog.svg';
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                              <Link href={`/blog/${post.id}`} className="hover:text-green-600 transition-colors">
                                {post.title}
                              </Link>
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.publishedAt)}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                  
                  <div className="text-center mt-4">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        // Scroll to top of page
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center justify-center gap-1 w-full"
                    >
                      View All Articles
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Categories */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                
                <div className="space-y-2">
                  {categories.filter(cat => cat !== 'All').map(category => {
                    const count = initialPosts.filter(post => post.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded transition-colors flex items-center justify-between ${
                          selectedCategory === category
                            ? 'bg-green-50 text-green-700'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span>{category}</span>
                        <span className="text-sm text-gray-500">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Social Sharing */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
                
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61565698142992" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="font-semibold">Facebook</span>
                  </a>
                  
                  <a 
                    href="https://twitter.com/SimonNthen66255" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="font-semibold">Twitter</span>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/company/108658379" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="font-semibold">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}