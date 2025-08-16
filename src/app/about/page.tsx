import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Users, 
  Target, 
  Award, 
  Globe,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About NewKenyan.com - Connecting Kenyans with Opportunities',
  description: 'Learn about NewKenyan.com, the leading platform connecting Kenyans with job opportunities, businesses, and real estate across Kenya. Our mission is to empower Kenyan communities.',
  keywords: 'about new kenyan, kenya platform, kenyan business directory, kenya jobs platform, about us',
  openGraph: {
    title: 'About NewKenyan.com - Connecting Kenyans with Opportunities',
    description: 'Learn about NewKenyan.com, the leading platform connecting Kenyans with job opportunities, businesses, and real estate across Kenya.',
    url: 'https://newkenyan.com/about',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-about.jpg',
      width: 1200,
      height: 630,
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NewKenyan.com - Connecting Kenyans with Opportunities',
    description: 'Learn about NewKenyan.com, the leading platform connecting Kenyans with job opportunities, businesses, and real estate across Kenya.',
    images: ['https://newkenyan.com/og-about.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/about',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NewKenyan.com',
    url: 'https://newkenyan.com',
    logo: 'https://newkenyan.com/logo.png',
    description: 'Leading platform connecting Kenyans with job opportunities, businesses, and real estate across Kenya.',
    foundingDate: '2024',
    founder: {
      '@type': 'Organization',
      name: 'Legit Hustles'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'Kenya'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254-700-000-000',
      contactType: 'customer service',
      email: 'info@newkenyan.com'
    },
    sameAs: [
      'https://twitter.com/newkenyan',
      'https://facebook.com/newkenyan',
      'https://linkedin.com/company/newkenyan'
    ],
    knowsAbout: [
      'Kenya Jobs',
      'Kenyan Business Directory',
      'Kenya Real Estate',
      'Kenyan Opportunities',
      'Kenya Employment'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About NewKenyan.com
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Empowering Kenyans through digital opportunities and connections
              </p>
              <p className="text-lg text-green-200 max-w-3xl mx-auto">
                We are the leading platform connecting Kenyans with job opportunities, 
                businesses, and real estate across the nation. Our mission is to digitally 
                transform how Kenyans discover and access opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To connect every Kenyan with opportunities that matter. We bridge the gap 
                    between job seekers and employers, businesses and customers, property owners 
                    and tenants, creating a thriving digital ecosystem for Kenya's economy.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To be Kenya's premier digital platform where opportunities meet ambition. 
                    We envision a Kenya where geographic and economic barriers don't limit 
                    access to opportunities, and where every Kenyan can thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  What We Do
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  NewKenyan.com serves as Kenya's comprehensive digital marketplace, 
                  connecting people with opportunities across multiple sectors.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Job Opportunities</h3>
                  <p className="text-gray-600">
                    Connect job seekers with employers across Kenya. From entry-level 
                    positions to executive roles, we cover all industries and experience levels.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Business Directory</h3>
                  <p className="text-gray-600">
                    Discover and connect with Kenyan businesses. Our comprehensive directory 
                    helps customers find trusted local businesses and services.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Real Estate</h3>
                  <p className="text-gray-600">
                    Find your next home or investment property. Browse rentals, sales, 
                    and commercial properties across Kenya with detailed listings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Why Choose NewKenyan.com
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We're more than just a platform - we're your partner in success.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Verified Listings',
                    description: 'All our listings are verified to ensure quality and authenticity.'
                  },
                  {
                    title: 'Local Expertise',
                    description: 'Deep understanding of the Kenyan market and local needs.'
                  },
                  {
                    title: 'User-Friendly Platform',
                    description: 'Easy-to-use interface designed for the Kenyan user experience.'
                  },
                  {
                    title: 'Comprehensive Coverage',
                    description: 'From major cities to remote areas, we cover all of Kenya.'
                  },
                  {
                    title: 'Mobile Optimized',
                    description: 'Full functionality on mobile devices for on-the-go access.'
                  },
                  {
                    title: 'Community Focused',
                    description: 'Building stronger Kenyan communities through connections.'
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Powered by Legit Hustles
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                NewKenyan.com is proudly developed and maintained by Legit Hustles, 
                a technology company dedicated to creating digital solutions that 
                empower African communities and economies.
              </p>
              <p className="text-gray-600">
                With deep roots in Kenya and a passion for innovation, our team 
                understands the unique challenges and opportunities in the Kenyan market. 
                We're committed to building technology that makes a real difference 
                in people's lives.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Join thousands of Kenyans who are already finding opportunities on NewKenyan.com
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link
                  href="/jobs-in-kenya/post"
                  className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Post a Job
                </Link>
                <Link
                  href="/add-listing"
                  className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  List Your Business
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}