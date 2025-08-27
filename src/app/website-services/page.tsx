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
  Phone,
  Mail
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
        '50+ pages (Main pages, Blog posts, SEO pages)',
        'Lightning-fast Next.js & React technology',
        '90+ Google PageSpeed score guaranteed',
        'Mobile-first responsive design',
        'Advanced SEO setup & optimization',
        'Contact forms & lead capture',
        'Social media integration',
        '6 months premium hosting included',
        'Google Analytics & tracking setup',
        'WhatsApp business integration',
        'SSL certificate & security',
        'Professional onboarding meeting',
        'Site management training session',
        '30-day revision guarantee'
      ],
      popular: false,
      delivery: '7-10 business days',
      highlight: 'Fast & Mobile-Ready'
    },
    {
      id: 'business',
      name: 'Business Pro',
      price: 'KSh 45,000',
      description: 'Comprehensive solution for growing businesses',
      features: [
        '100+ pages (Website, Blog, SEO landing pages)',
        'Premium Next.js, Node.js & React stack',
        '95+ Google PageSpeed score guaranteed',
        'Professional custom design & branding',
        'Complete SEO optimization package',
        'Advanced lead generation system',
        'WhatsApp & Live Chat integration',
        'Google My Business setup & optimization',
        '12 months premium hosting included',
        'Advanced analytics & conversion tracking',
        'Blog management system',
        'M-Pesa & payment gateway integration',
        'Email marketing automation setup',
        'Content management training',
        'Mobile app deployment ready',
        '60-day revision guarantee',
        'Monthly performance reports'
      ],
      popular: true,
      delivery: '10-14 business days',
      highlight: 'Most Popular - Complete Solution'
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Store',
      price: 'KSh 75,000',
      description: 'Complete online store for selling products',
      features: [
        '200+ pages (Store, Products, Blog, SEO pages)',
        'Enterprise Next.js, Node.js & React architecture',
        '95+ Google PageSpeed score guaranteed',
        'Professional e-commerce design',
        'Complete product catalog management',
        'Advanced shopping cart & checkout system',
        'Multi-payment processing (M-Pesa, Airtel, Cards)',
        'Real-time inventory management',
        'Comprehensive order management system',
        'Customer account & loyalty system',
        'Advanced SEO & marketing package',
        '18 months premium hosting included',
        'Sales analytics & reporting dashboard',
        'Email marketing & automation',
        'Social media marketing integration',
        'Mobile app deployment ready',
        'Security & fraud protection',
        'Staff training & onboarding sessions',
        '90-day revision guarantee',
        'Priority support & maintenance'
      ],
      popular: false,
      delivery: '14-21 business days',
      highlight: 'Enterprise Solution'
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
              <p className="text-xl text-blue-100 mb-6">
                Professional website design & SEO services to help your Kenyan business thrive online. 
                Get more customers, increase visibility, and grow your revenue.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8">
                <p className="text-blue-100 text-lg font-semibold mb-2">🚀 Built with Latest Technology</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="bg-white/20 px-3 py-1 rounded-full">Next.js 14</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">React 18</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">Node.js</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">90+ PageSpeed Score</span>
                </div>
              </div>
              <p className="text-blue-100 mt-4">
                📍 Nairobi, Kenya | 📧 info@newkenyan.com
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                  onClick={() => window.open('mailto:info@newkenyan.com?subject=Free Consultation Request&body=Hi, I would like to schedule a free consultation for web services.', '_blank')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-700 text-white hover:bg-green-800 font-semibold"
                  onClick={() => window.open('https://wa.me/254736407642?text=' + encodeURIComponent('Hi, I would like to schedule a free consultation for web services.'), '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Consultation
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
                <h3 className="text-lg font-semibold mb-2">90+ PageSpeed Score</h3>
                <p className="text-gray-600 text-sm">
                  Lightning-fast sites built with Next.js, React & Node.js for superior performance
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
                    <p className="text-gray-600 text-sm mb-3">{plan.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {plan.highlight}
                    </Badge>
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

                  <div className="space-y-3">
                    <Button
                      className={`w-full font-semibold ${
                        plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                      onClick={() => window.open('mailto:hr@jobvacancy.co.ke?subject=' + encodeURIComponent('Website Service Request - ' + plan.name) + '&body=' + encodeURIComponent('Hi, I am interested in the ' + plan.name + ' package (' + plan.price + '). Please provide more details and next steps for ordering this service.'), '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Get Started via Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => window.open('https://wa.me/254736407642?text=' + encodeURIComponent('Hi, I am interested in the ' + plan.name + ' package (' + plan.price + '). Please provide more details and next steps for ordering this service.'), '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Us
                    </Button>
                  </div>
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

                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => window.open('mailto:hr@jobvacancy.co.ke?subject=' + encodeURIComponent('SEO Service Inquiry - ' + service.name) + '&body=' + encodeURIComponent('Hi, I am interested in your ' + service.name + ' service (' + service.price + '). Please provide more details and next steps.'), '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Learn More via Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => window.open('https://wa.me/254736407642?text=' + encodeURIComponent('Hi, I am interested in your ' + service.name + ' service (' + service.price + '). Please provide more details and next steps.'), '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Us
                    </Button>
                  </div>
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
                  className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold"
                  onClick={() => window.open('https://wa.me/254736407642?text=Hi, I would like to discuss web services for my business.', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp: +254 736 407 642
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                  onClick={() => window.open('tel:+254736407642', '_self')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: +254 736 407 642
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
                <h3 className="font-semibold mb-2">Why are your websites so fast?</h3>
                <p className="text-gray-600 text-sm">
                  We use cutting-edge technology including Next.js 14, React 18, and Node.js to build 
                  lightning-fast websites. Our sites consistently score 90+ on Google PageSpeed Insights, 
                  ensuring better user experience and higher search rankings.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Do you provide training and onboarding?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! Every package includes professional onboarding meetings where we train you on managing 
                  your website, updating content, and following best practices. We ensure you&apos;re completely 
                  comfortable using your new website.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Can you integrate M-Pesa payments?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! We specialize in integrating popular Kenyan payment methods including 
                  M-Pesa, Airtel Money, and international payment gateways for seamless transactions.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What about revisions and guarantees?</h3>
                <p className="text-gray-600 text-sm">
                  We offer comprehensive revision guarantees: 30 days for Starter, 60 days for Business Pro, 
                  and 90 days for E-Commerce packages. We also provide ongoing site management and support 
                  to ensure your website continues performing at its best.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Can my website be turned into a mobile app?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! Our websites are built with React and Next.js, making them mobile app deployment ready. 
                  This means you can easily expand to iOS and Android apps in the future without rebuilding.
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