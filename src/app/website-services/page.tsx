'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Globe, 
  Search, 
  Zap, 
  Shield, 
  ArrowRight,
  MessageCircle,
  Phone
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WebsiteServicesPage = () => {
  const [, setSelectedPlan] = useState('business');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Website',
      price: 'KSh 25,000',
      description: 'Perfect for small businesses getting started online',
      features: [
        '5-page responsive website',
        'Mobile-friendly design',
        'Basic SEO setup',
        'Contact form',
        'Social media integration',
        '3 months free hosting',
        'Basic analytics setup'
      ],
      popular: false,
      delivery: '7-10 business days'
    },
    {
      id: 'business',
      name: 'Business Pro',
      price: 'KSh 45,000',
      description: 'Comprehensive solution for growing businesses',
      features: [
        '10-page responsive website',
        'Professional custom design',
        'Advanced SEO optimization',
        'Lead generation forms',
        'WhatsApp integration',
        'Google My Business setup',
        '6 months free hosting',
        'Advanced analytics & tracking',
        'Blog section setup',
        'Payment gateway integration'
      ],
      popular: true,
      delivery: '10-14 business days'
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Store',
      price: 'KSh 75,000',
      description: 'Complete online store for selling products',
      features: [
        'Unlimited pages',
        'Product catalog management',
        'Shopping cart & checkout',
        'Payment processing (M-Pesa, Cards)',
        'Inventory management',
        'Order management system',
        'Customer accounts',
        'Advanced SEO package',
        '1 year free hosting',
        'Sales analytics dashboard',
        'Email marketing setup',
        'Security & SSL certificate'
      ],
      popular: false,
      delivery: '14-21 business days'
    }
  ];

  const seoServices = [
    {
      name: 'SEO Audit & Strategy',
      price: 'KSh 15,000',
      description: 'Comprehensive analysis of your website&apos;s SEO performance',
      features: [
        'Technical SEO audit',
        'Keyword research & analysis',
        'Competitor analysis',
        'SEO strategy roadmap',
        'Monthly progress reports'
      ]
    },
    {
      name: 'Local SEO Package',
      price: 'KSh 25,000',
      description: 'Optimize your business for local search results',
      features: [
        'Google My Business optimization',
        'Local keyword targeting',
        'Citation building',
        'Review management setup',
        'Local content creation'
      ]
    },
    {
      name: 'Content & Link Building',
      price: 'KSh 35,000',
      description: 'Boost your website authority with quality content',
      features: [
        'Blog content creation (4 posts)',
        'High-quality backlink building',
        'Social media content',
        'Press release writing',
        'Directory submissions'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Badge className="bg-white/20 text-white mb-4">
                🚀 Professional Web Services
              </Badge>
              <h1 className="text-5xl font-bold mb-6">
                Let Us Build You the Perfect Business Website
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Professional website design & SEO services to help your Kenyan business thrive online. 
                Get more customers, increase visibility, and grow your revenue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Get Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Web Services?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We understand the Kenyan market and build websites that convert visitors into customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Mobile-First Design</h3>
                <p className="text-gray-600 text-sm">
                  Perfect for Kenyan users who primarily browse on mobile devices
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local SEO Focus</h3>
                <p className="text-gray-600 text-sm">
                  Optimized to rank in Kenyan search results and attract local customers
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Loading</h3>
                <p className="text-gray-600 text-sm">
                  Optimized for Kenya&apos;s internet speeds with fast loading times
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
                <p className="text-gray-600 text-sm">
                  SSL certificates, regular backups, and secure hosting included
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Website Development Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the perfect package for your business needs. All packages include free consultation and ongoing support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border p-8 ${
                    plan.popular 
                      ? 'border-blue-500 bg-blue-50 scale-105' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">
                      <Zap className="h-4 w-4 inline mr-1" />
                      Delivery: {plan.delivery}
                    </p>
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">SEO Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Boost your website&apos;s visibility in Google search results and attract more customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {seoServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-3">{service.price}</div>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-blue-100 mb-8">
                Contact us today for a free consultation. We&apos;ll discuss your business goals and recommend the best solution for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp: +254 700 123 456
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: +254 700 123 456
                </Button>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                Free consultation • No commitment required • Quick response guaranteed
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">How long does it take to build a website?</h3>
                <p className="text-gray-600 text-sm">
                  Our typical turnaround time is 7-21 business days depending on the package you choose. 
                  We&apos;ll provide you with a clear timeline during your consultation.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Do you provide ongoing support?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! All our packages include ongoing support for technical issues, content updates, 
                  and basic maintenance. We&apos;re here to help your business succeed online.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Can you integrate M-Pesa payments?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We specialize in integrating popular Kenyan payment methods including 
                  M-Pesa, Airtel Money, and international payment gateways.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What if I&apos;m not satisfied with the result?</h3>
                <p className="text-gray-600 text-sm">
                  We offer unlimited revisions during the development process and a 30-day money-back 
                  guarantee if you&apos;re not completely satisfied with your website.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WebsiteServicesPage;