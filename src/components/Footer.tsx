import Link from 'next/link';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">NewKenyan.com</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting Kenyans with opportunities, businesses, and communities across the nation.
              Your gateway to Kenya&apos;s digital economy.
            </p>
            <p className="text-sm text-gray-500">
              By Legit Hustles
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/jobs-in-kenya" className="text-gray-400 hover:text-white transition-colors">Jobs</Link></li>
              <li><Link href="/directory" className="text-gray-400 hover:text-white transition-colors">Directory</Link></li>
              <li><Link href="/properties" className="text-gray-400 hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Nairobi, Kenya</li>
              <li>info@kenyapulsehub.com</li>
              <li>+254 700 000 000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 NewKenyan.com by Legit Hustles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;