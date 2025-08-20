import Link from 'next/link';
import { MapPin, Mail, Phone, MessageSquare, Users, Building2, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Call to Action Section */}
      <div className="bg-green-600 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Connect with Opportunities?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join thousands of Kenyans finding jobs, businesses, and properties on NewKenyan.com
            </p>
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <a
                href="mailto:info@newkenyan.com?subject=General Inquiry"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                General Inquiries
              </a>
              <a
                href="mailto:partnerships@newkenyan.com?subject=Partnership Opportunity"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center justify-center"
              >
                <Users className="h-5 w-5 mr-2" />
                Partnerships
              </a>
              <a
                href="mailto:advertising@newkenyan.com?subject=Advertising Inquiry"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center justify-center"
              >
                <Building2 className="h-5 w-5 mr-2" />
                Advertising
              </a>
              <a
                href="mailto:info@newkenyan.com?subject=Talk to Us"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Talk to Us
              </a>
            </div>
            <p className="text-green-200">
              Have questions? Need support? Want to partner with us? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">NewKenyan.com</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting Kenyans with opportunities, businesses, and communities across the nation.
              Your gateway to Kenya&apos;s digital economy.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Proudly powered by Legit Hustles
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs-in-kenya" className="text-gray-400 hover:text-white transition-colors flex items-center group">Jobs in Kenya <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/business-directory" className="text-gray-400 hover:text-white transition-colors flex items-center group">Business Directory <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center group">Properties <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center group">Blog <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/jobs-in-kenya/post" className="text-gray-400 hover:text-white transition-colors flex items-center group">Post a Job <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/add-listing" className="text-gray-400 hover:text-white transition-colors flex items-center group">List Your Business <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Tools Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Tools & Calculators</h3>
            <ul className="space-y-2">
              <li><Link href="/mortgage-calculator-kenya" className="text-gray-400 hover:text-white transition-colors flex items-center group">Mortgage Calculator Kenya <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/net-pay-calculator" className="text-gray-400 hover:text-white transition-colors flex items-center group">Net Pay Calculator Kenya <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">About Us <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">Contact <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center group">Privacy Policy <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors flex items-center group">Terms of Service <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/website-services" className="text-gray-400 hover:text-white transition-colors flex items-center group">Website Services <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>

            {/* Contact Info */}
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-3">Contact Info</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Nairobi, Kenya
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:info@newkenyan.com" className="hover:text-white transition-colors">
                    info@newkenyan.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+254700000000" className="hover:text-white transition-colors">
                    +254 700 000 000
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 NewKenyan.com by Legit Hustles. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;