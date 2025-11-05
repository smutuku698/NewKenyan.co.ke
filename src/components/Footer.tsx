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
              <a href="https://www.facebook.com/profile.php?id=61565698142992" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://twitter.com/SimonNthen66255" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/108658379" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.pinterest.com/ApartmentsForRentNow/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
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
              <li><Link href="/real-estate-companies-in-kenya" className="text-gray-400 hover:text-white transition-colors flex items-center group">Real Estate Companies <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors flex items-center group">Blog <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/jobs-in-kenya/post" className="text-gray-400 hover:text-white transition-colors flex items-center group">Post a Job <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/add-listing" className="text-gray-400 hover:text-white transition-colors flex items-center group">List Your Business <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/website-services" className="text-gray-400 hover:text-white transition-colors flex items-center group">Website & SEO Services <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/real-estate-services" className="text-gray-400 hover:text-white transition-colors flex items-center group">Real Estate Services <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
            
            <h4 className="text-md font-semibold mb-3 mt-6 text-white">Tools & Calculators</h4>
            <ul className="space-y-2">
              <li><Link href="/construction-cost-calculator-kenya" className="text-gray-400 hover:text-white transition-colors flex items-center group">Construction Cost Calculator <ArrowRight className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
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
                  <a href="tel:+254736407642" className="hover:text-white transition-colors">
                    +254 736 407 642
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <svg className="h-5 w-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Important Disclaimer
            </h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>
                <strong className="text-gray-300">Advertised Listings:</strong> All property listings, job postings, and business advertisements on NewKenyan.com are submitted by third-party advertisers and individual users. NewKenyan.com acts solely as a platform to connect buyers, sellers, employers, and service providers.
              </p>
              <p>
                <strong className="text-gray-300">Verification & Due Diligence:</strong> While we make reasonable efforts to review listings, we do not guarantee the accuracy, completeness, or legitimacy of any advertisement. Users are strongly advised to conduct their own independent verification, due diligence, and physical inspections before making any commitments or payments.
              </p>
              <p>
                <strong className="text-gray-300">No Liability:</strong> NewKenyan.com and Legit Hustles shall not be held liable for any losses, damages, or disputes arising from transactions conducted through this platform. We recommend meeting in safe public locations, verifying ownership documents, and consulting legal professionals when necessary.
              </p>
              <p>
                <strong className="text-gray-300">Report Suspicious Activity:</strong> If you encounter fraudulent listings or suspicious activity, please contact us immediately at <a href="mailto:info@newkenyan.com" className="text-green-500 hover:text-green-400 underline">info@newkenyan.com</a> or call <a href="tel:+254736407642" className="text-green-500 hover:text-green-400 underline">+254 736 407 642</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-800 pt-8">
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