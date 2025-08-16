import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, AlertTriangle, Users, Shield, Gavel, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - NewKenyan.com | Legal Terms and Conditions',
  description: 'Read NewKenyan.com terms of service outlining the legal terms and conditions for using our platform, including user responsibilities and prohibited activities.',
  keywords: 'terms of service, terms and conditions, legal terms, user agreement, new kenyan terms, platform rules',
  openGraph: {
    title: 'Terms of Service - NewKenyan.com | Legal Terms and Conditions',
    description: 'Read NewKenyan.com terms of service outlining the legal terms and conditions for using our platform.',
    url: 'https://newkenyan.com/terms-of-service',
    siteName: 'NewKenyan.com',
    locale: 'en_KE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newkenyan.com/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsOfServicePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Terms of service for NewKenyan.com outlining the legal terms and conditions for platform usage.',
    url: 'https://newkenyan.com/terms-of-service',
    isPartOf: {
      '@type': 'WebSite',
      name: 'NewKenyan.com',
      url: 'https://newkenyan.com'
    },
    about: {
      '@type': 'Thing',
      name: 'Legal Terms and Conditions'
    },
    dateModified: '2024-01-01',
    inLanguage: 'en-KE'
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
        <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Gavel className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Terms of Service
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-4 text-gray-100">
                Legal terms and conditions for using NewKenyan.com
              </p>
              <p className="text-lg text-gray-300">
                Last updated: January 1, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <FileText className="h-8 w-8 text-gray-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">1. Introduction and Acceptance</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    Welcome to NewKenyan.com, operated by Legit Hustles ("we," "our," or "us"). 
                    These Terms of Service ("Terms") govern your use of our website located at 
                    <a href="https://newkenyan.com" className="text-blue-600 hover:underline"> https://newkenyan.com</a> 
                    and all related services (collectively, the "Service").
                  </p>
                  <p>
                    By accessing or using our Service, you agree to be bound by these Terms. 
                    If you disagree with any part of these terms, you may not access the Service.
                  </p>
                </div>
              </div>

              {/* Definitions */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Definitions</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <dl className="space-y-4">
                    <div>
                      <dt className="font-semibold text-gray-900">Service:</dt>
                      <dd className="text-gray-700">The NewKenyan.com platform including job postings, business directory, property listings, and all related features.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">User:</dt>
                      <dd className="text-gray-700">Any individual or entity that accesses or uses our Service.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Content:</dt>
                      <dd className="text-gray-700">All information, data, text, images, and other materials posted or transmitted through the Service.</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Listing:</dt>
                      <dd className="text-gray-700">Any job posting, business listing, or property listing created on the platform.</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* User Accounts */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">3. User Accounts and Registration</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Account Creation</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>You must provide accurate and complete information when creating an account</li>
                      <li>You are responsible for maintaining the security of your account credentials</li>
                      <li>You must be at least 18 years old to create an account</li>
                      <li>One person or entity may not maintain multiple accounts</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Account Responsibilities</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>You are responsible for all activities that occur under your account</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                      <li>Keep your contact information current and accurate</li>
                      <li>Comply with all applicable laws and these Terms</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Acceptable Use */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">4. Acceptable Use Policy</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">You May:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Post legitimate job opportunities</li>
                      <li>List genuine business services</li>
                      <li>Advertise real properties</li>
                      <li>Search and apply for opportunities</li>
                      <li>Contact other users through provided channels</li>
                      <li>Leave honest reviews and feedback</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">You May Not:</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Post false or misleading information</li>
                      <li>Engage in fraudulent activities</li>
                      <li>Spam or send unsolicited communications</li>
                      <li>Violate intellectual property rights</li>
                      <li>Upload harmful or illegal content</li>
                      <li>Interfere with platform operations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prohibited Activities */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">5. Prohibited Activities</h2>
                </div>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <p className="text-gray-700 mb-4 font-semibold">
                    The following activities are strictly prohibited:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Posting job scams or pyramid schemes</li>
                      <li>Discriminatory job postings</li>
                      <li>Adult or inappropriate content</li>
                      <li>Illegal goods or services</li>
                      <li>Harassment or threatening behavior</li>
                      <li>Identity theft or impersonation</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Automated data collection (scraping)</li>
                      <li>Malware or virus distribution</li>
                      <li>Circumventing security measures</li>
                      <li>Creating fake accounts or listings</li>
                      <li>Money laundering activities</li>
                      <li>Violating export control laws</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Content and Listings */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Content and Listings</h2>
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Content Standards</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>All listings must be accurate and truthful</li>
                      <li>Content must be relevant to the Kenyan market</li>
                      <li>Images must be original or properly licensed</li>
                      <li>Contact information must be current and functional</li>
                      <li>Pricing information must be clearly stated</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Content Ownership and License</h3>
                    <p className="text-gray-700 mb-3">
                      You retain ownership of content you post, but grant us a non-exclusive, 
                      worldwide, royalty-free license to use, display, and distribute your 
                      content in connection with the Service.
                    </p>
                    <p className="text-gray-700">
                      We reserve the right to remove any content that violates these Terms 
                      or is deemed inappropriate for our platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment and Fees */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Payment and Fees</h2>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Fee Structure</h3>
                      <p className="text-gray-700">
                        Certain services require payment as outlined on our pricing page. 
                        All fees are non-refundable unless otherwise specified.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Payment Processing</h3>
                      <p className="text-gray-700">
                        Payments are processed through secure third-party providers. 
                        We do not store payment card information on our servers.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Currency</h3>
                      <p className="text-gray-700">
                        All fees are charged in Kenyan Shillings (KSh) unless otherwise specified.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy and Data */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">8. Privacy and Data Protection</h2>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    Your privacy is important to us. Our collection and use of personal information 
                    is governed by our <a href="/privacy-policy" className="text-purple-600 hover:underline">Privacy Policy</a>, 
                    which is incorporated into these Terms by reference.
                  </p>
                  <p className="text-gray-700">
                    By using our Service, you consent to the collection and use of your information 
                    as described in our Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Intellectual Property</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Our Rights</h3>
                    <p className="text-gray-700">
                      The Service, including its design, features, and functionality, is owned by 
                      Legit Hustles and protected by copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Your Rights</h3>
                    <p className="text-gray-700">
                      You retain all rights to content you create and post, subject to the license 
                      granted to us in these Terms.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Infringement Claims</h3>
                    <p className="text-gray-700">
                      If you believe your intellectual property rights have been violated, 
                      contact us at <a href="mailto:legal@newkenyan.com" className="text-blue-600 hover:underline">legal@newkenyan.com</a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimers */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Disclaimers and Limitation of Liability</h2>
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Service Availability</h3>
                      <p className="text-gray-700">
                        The Service is provided "as is" without warranties. We do not guarantee 
                        uninterrupted or error-free operation.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Third-Party Content</h3>
                      <p className="text-gray-700">
                        We are not responsible for the accuracy, legality, or quality of 
                        user-generated content or third-party listings.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                      <p className="text-gray-700">
                        Our liability is limited to the amount you paid for the Service in 
                        the 12 months preceding the claim, up to a maximum of KSh 100,000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Termination</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">By You</h3>
                    <p className="text-gray-700">
                      You may terminate your account at any time by contacting us or 
                      using the account deletion feature in your dashboard.
                    </p>
                  </div>
                  <div className="bg-red-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">By Us</h3>
                    <p className="text-gray-700">
                      We may suspend or terminate your account for violations of these Terms, 
                      illegal activities, or other reasons at our discretion.
                    </p>
                  </div>
                </div>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Governing Law and Disputes</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    These Terms are governed by the laws of Kenya. Any disputes shall be 
                    resolved through arbitration in Nairobi, Kenya, in accordance with 
                    the Arbitration Act of Kenya.
                  </p>
                  <p className="text-gray-700">
                    Before initiating formal proceedings, parties agree to attempt 
                    good faith negotiations to resolve disputes.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Changes to Terms</h2>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-gray-700">
                    We reserve the right to modify these Terms at any time. Changes will be 
                    effective immediately upon posting. Your continued use of the Service 
                    constitutes acceptance of the modified Terms. We will notify users of 
                    material changes via email or platform notifications.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">14. Contact Information</h2>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-gray-700 mb-4">
                    For questions about these Terms or our Service, contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> <a href="mailto:legal@newkenyan.com" className="text-green-600 hover:underline">legal@newkenyan.com</a></p>
                    <p><strong>General Contact:</strong> <a href="mailto:info@newkenyan.com" className="text-green-600 hover:underline">info@newkenyan.com</a></p>
                    <p><strong>Company:</strong> Legit Hustles</p>
                    <p><strong>Address:</strong> Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              {/* Effective Date */}
              <div className="bg-gray-100 p-6 rounded-lg text-center">
                <p className="text-gray-600">
                  <strong>Effective Date:</strong> January 1, 2024<br />
                  These Terms of Service were last updated on January 1, 2024.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}