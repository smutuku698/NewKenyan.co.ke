'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Star, 
  Home, 
  Camera, 
  Users, 
  TrendingUp, 
  ArrowRight,
  MessageCircle,
  Phone,
  MapPin,
  Mail
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const RealEstateServicesPage = () => {
  const [, setSelectedPlan] = useState('professional');

  const services = [
    {
      id: 'basic',
      name: 'Property Listing',
      price: 'KSh 5,000',
      description: 'Professional property listing and marketing',
      features: [
        'Professional property photography',
        'Detailed property description',
        'Multi-platform listing (NewKenyan.com + 3 sites)',
        'Social media promotion',
        'Lead management for 30 days',
        'Basic market analysis'
      ],
      popular: false,
      delivery: '3-5 business days'
    },
    {
      id: 'professional',
      name: 'Premium Marketing',
      price: 'KSh 12,000',
      description: 'Complete property marketing solution',
      features: [
        'Professional photography + video tour',
        'Premium listing placement',
        'Multi-platform marketing (5+ sites)',
        'Social media campaign (Facebook, Instagram)',
        'WhatsApp & Email lead management',
        'Market analysis & pricing strategy',
        'Virtual tour creation',
        'Lead follow-up for 60 days'
      ],
      popular: true,
      delivery: '5-7 business days'
    },
    {
      id: 'enterprise',
      name: 'Full Sales Support',
      price: 'KSh 25,000',
      description: 'Complete sales management service',
      features: [
        'Everything in Premium Marketing',
        'Dedicated sales agent support',
        'Property staging consultation',
        'Buyer qualification & screening',
        'Negotiation support',
        'Legal documentation assistance',
        'Market updates & reporting',
        'Lead management until sale',
        'Post-sale support'
      ],
      popular: false,
      delivery: '7-10 business days'
    }
  ];

  const additionalServices = [
    {
      name: 'Property Valuation',
      price: 'KSh 8,000',
      description: 'Professional property valuation for accurate pricing',
      features: [
        'Comparative market analysis',
        'Property inspection',
        'Detailed valuation report',
        'Pricing recommendations',
        'Market trend analysis'
      ]
    },
    {
      name: 'Property Management',
      price: 'KSh 15,000/month',
      description: 'Full property management for landlords',
      features: [
        'Tenant screening & placement',
        'Rent collection',
        'Property maintenance coordination',
        'Monthly reporting',
        'Legal compliance support'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Badge className="bg-white/20 text-white mb-4">
                🏠 Real Estate Services
              </Badge>
              <h1 className="text-5xl font-bold mb-6">
                Sell Your Property Faster with Expert Marketing
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Professional real estate services to help Kenyan property owners sell, rent, and manage their properties effectively. 
                Get maximum exposure and better prices for your property.
              </p>
              <p className="text-green-100 mt-4">
                📍 Nairobi, Kenya | 📧 info@newkenyan.com
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 font-semibold"
                  onClick={() => window.open('mailto:info@newkenyan.com?subject=Real Estate Service Consultation&body=Hi, I would like to discuss real estate services for my property.', '_blank')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get Free Consultation
                </Button>
                <Button 
                  size="lg" 
                  className="bg-green-700 text-white hover:bg-green-800 font-semibold"
                  onClick={() => window.open('https://wa.me/254736407642?text=' + encodeURIComponent('Hi, I would like to discuss real estate services for my property.'), '_blank')}
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
              <h2 className="text-3xl font-bold mb-4">Why Choose Our Real Estate Services?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We understand the Kenyan property market and use proven strategies to get your property sold or rented faster
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Professional Photography</h3>
                <p className="text-gray-600 text-sm">
                  High-quality photos and videos that showcase your property's best features
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Qualified Buyers</h3>
                <p className="text-gray-600 text-sm">
                  Access to our database of pre-qualified buyers and serious investors
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Market Expertise</h3>
                <p className="text-gray-600 text-sm">
                  Deep knowledge of Kenyan property markets and pricing strategies
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multi-Platform Reach</h3>
                <p className="text-gray-600 text-sm">
                  Your property featured across multiple listing platforms for maximum exposure
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Real Estate Service Packages</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the perfect package for your property needs. All packages include dedicated support and results tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`relative rounded-2xl border p-8 ${
                    service.popular 
                      ? 'border-green-500 bg-green-50 scale-105' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-600 text-white px-4 py-1">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">{service.price}</div>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      Setup: {service.delivery}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button
                      className={`w-full font-semibold ${
                        service.popular 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                      onClick={() => window.open('mailto:hr@jobvacancy.co.ke?subject=' + encodeURIComponent('Real Estate Service Request - ' + service.name) + '&body=' + encodeURIComponent('Hi, I am interested in the ' + service.name + ' package (' + service.price + ') for my property. Please provide more details and next steps.'), '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Get Started via Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => window.open('https://wa.me/254736407642?text=' + encodeURIComponent('Hi, I am interested in the ' + service.name + ' package (' + service.price + ') for my property. Please provide more details and next steps.'), '_blank')}
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

        {/* Additional Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive property solutions to support your real estate needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {additionalServices.map((service, index) => (
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
                      onClick={() => window.open('mailto:hr@jobvacancy.co.ke?subject=' + encodeURIComponent('Real Estate Service Inquiry - ' + service.name) + '&body=' + encodeURIComponent('Hi, I am interested in your ' + service.name + ' service (' + service.price + '). Please provide more details.'), '_blank')}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Learn More via Email
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => window.open('https://wa.me/254736407642?text=' + encodeURIComponent('Hi, I am interested in your ' + service.name + ' service (' + service.price + '). Please provide more details.'), '_blank')}
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
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Sell Your Property?</h2>
              <p className="text-green-100 mb-8">
                Contact us today for a free property consultation. We'll assess your property and recommend the best marketing strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold"
                  onClick={() => window.open('https://wa.me/254736407642?text=Hi, I would like to discuss real estate services for my property.', '_blank')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp: +254 736 407 642
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-green-600 font-semibold"
                  onClick={() => window.open('tel:+254736407642', '_self')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call: +254 736 407 642
                </Button>
              </div>
              <p className="text-green-200 text-sm mt-4">
                Free consultation • No upfront fees • Results guaranteed
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
                <h3 className="font-semibold mb-2">How quickly can you sell my property?</h3>
                <p className="text-gray-600 text-sm">
                  While we can&apos;t guarantee specific timelines, our professional marketing typically reduces time on market by 40-60%. 
                  Most properties receive serious inquiries within the first 2 weeks of listing.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Do you charge upfront fees?</h3>
                <p className="text-gray-600 text-sm">
                  Our service packages have transparent upfront pricing. No hidden fees, no commission unless we achieve results. 
                  Contact us for a free consultation and custom quote.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What areas do you serve?</h3>
                <p className="text-gray-600 text-sm">
                  We serve all major Kenyan cities including Nairobi, Mombasa, Kisumu, Nakuru, and surrounding areas. 
                  Remote consultation available for properties nationwide.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold mb-2">What if my property doesn&apos;t sell?</h3>
                <p className="text-gray-600 text-sm">
                  We provide ongoing support and strategy adjustments until your property sells. Our comprehensive 
                  approach includes market analysis, pricing optimization, and continuous marketing improvements.
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

export default RealEstateServicesPage;