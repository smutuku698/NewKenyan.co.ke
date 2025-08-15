import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { sampleBlogPosts } from '@/data/sampleData';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">NewKenyan.com Blog</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest insights, trends, and stories shaping Kenya&apos;s future
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sampleBlogPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}