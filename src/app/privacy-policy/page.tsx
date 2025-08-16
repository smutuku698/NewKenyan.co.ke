import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Users, FileText, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - NewKenyan.com | How We Protect Your Data',
  description: 'Read NewKenyan.com privacy policy to understand how we collect, use, and protect your personal information. We are committed to safeguarding your privacy.',
  keywords: 'privacy policy, data protection, new kenyan privacy, personal information, data security, GDPR compliance',
  openGraph: {
    title: 'Privacy Policy - NewKenyan.com | How We Protect Your Data',
    description: 'Read NewKenyan.com privacy policy to understand how we collect, use, and protect your personal information.',
    url: 'https://newkenyan.com/privacy-policy',
    siteName: 'NewKenyan.com',
    locale: 'en_KE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://newkenyan.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Privacy policy for NewKenyan.com detailing how we collect, use, and protect user data.',
    url: 'https://newkenyan.com/privacy-policy',
    isPartOf: {
      '@type': 'WebSite',
      name: 'NewKenyan.com',
      url: 'https://newkenyan.com'
    },
    about: {
      '@type': 'Thing',
      name: 'Data Privacy and Protection'
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 mr-4" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-xl md:text-2xl mb-4 text-blue-100">
                Your privacy is our priority
              </p>
              <p className="text-lg text-blue-200">
                Last updated: January 1, 2024
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <FileText className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    NewKenyan.com ("we," "our," or "us") is committed to protecting and respecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you visit our website <a href="https://newkenyan.com" className="text-blue-600 hover:underline">https://newkenyan.com</a> 
                    and use our services.
                  </p>
                  <p>
                    This policy applies to all users of our platform, including job seekers, employers, 
                    business owners, property owners, and visitors to our website.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Information We Collect</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Personal Information</h3>
                    <p className="text-gray-700 mb-3">When you register or use our services, we may collect:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Name, email address, and phone number</li>
                      <li>Professional information (resume, work experience, skills)</li>
                      <li>Business information (company name, description, contact details)</li>
                      <li>Property information (listings, descriptions, images)</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Usage Information</h3>
                    <p className="text-gray-700 mb-3">We automatically collect certain information about your use of our platform:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>IP address, browser type, and device information</li>
                      <li>Pages visited, time spent on pages, and referral sources</li>
                      <li>Search queries and interaction with listings</li>
                      <li>Location data (if you enable location services)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Cookies and Tracking</h3>
                    <p className="text-gray-700">
                      We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                      and provide personalized content. You can control cookie settings through your browser.
                    </p>
                  </div>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-yellow-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Service Delivery",
                      items: [
                        "Process and display your listings",
                        "Connect job seekers with employers",
                        "Facilitate business discoveries",
                        "Process payments and transactions"
                      ]
                    },
                    {
                      title: "Communication",
                      items: [
                        "Send important updates about your account",
                        "Notify you of relevant opportunities",
                        "Respond to your inquiries and support requests",
                        "Send marketing communications (with consent)"
                      ]
                    },
                    {
                      title: "Platform Improvement",
                      items: [
                        "Analyze usage patterns and preferences",
                        "Improve our services and user experience",
                        "Develop new features and functionality",
                        "Ensure platform security and prevent fraud"
                      ]
                    },
                    {
                      title: "Legal Compliance",
                      items: [
                        "Comply with applicable laws and regulations",
                        "Respond to legal requests and court orders",
                        "Protect our rights and interests",
                        "Enforce our terms of service"
                      ]
                    }
                  ].map((section, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">{section.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Lock className="h-8 w-8 text-red-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Information Sharing and Disclosure</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-700 text-lg">
                    We do not sell, trade, or rent your personal information to third parties. 
                    We may share your information in the following limited circumstances:
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      {
                        title: "Public Listings",
                        description: "Information in job postings, business listings, and property listings is publicly visible to help users find relevant opportunities."
                      },
                      {
                        title: "Service Providers",
                        description: "We may share information with trusted third-party service providers who assist us in operating our platform (payment processors, hosting providers, analytics tools)."
                      },
                      {
                        title: "Legal Requirements",
                        description: "We may disclose information when required by law, legal process, or to protect the rights, property, or safety of NewKenyan.com, our users, or others."
                      },
                      {
                        title: "Business Transfers",
                        description: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction."
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-red-500">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-700">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Data Security</h2>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-gray-700 mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure data storage with access controls</li>
                    <li>Regular security audits and updates</li>
                    <li>Employee training on data protection</li>
                    <li>Incident response procedures</li>
                  </ul>
                  <p className="text-gray-600 mt-4 text-sm">
                    While we strive to protect your information, no method of transmission over the internet 
                    or electronic storage is 100% secure. We cannot guarantee absolute security.
                  </p>
                </div>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Your Rights and Choices</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Access and Update",
                      description: "You can access and update your personal information through your account dashboard."
                    },
                    {
                      title: "Data Deletion",
                      description: "You can request deletion of your account and associated data by contacting us."
                    },
                    {
                      title: "Marketing Opt-out",
                      description: "You can unsubscribe from marketing communications at any time using the unsubscribe link."
                    },
                    {
                      title: "Cookie Control",
                      description: "You can control cookies through your browser settings, though this may affect functionality."
                    }
                  ].map((right, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{right.title}</h3>
                      <p className="text-gray-700">{right.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <Clock className="h-8 w-8 text-orange-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Data Retention</h2>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We retain your personal information only as long as necessary to provide our services and comply with legal obligations:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Active accounts:</strong> Data retained while account is active</li>
                    <li><strong>Inactive accounts:</strong> Data may be retained for up to 2 years</li>
                    <li><strong>Published listings:</strong> May remain visible until manually removed</li>
                    <li><strong>Transaction records:</strong> Retained for 7 years for tax and audit purposes</li>
                    <li><strong>Marketing data:</strong> Retained until you opt out</li>
                  </ul>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <p className="text-gray-700">
                    NewKenyan.com is not intended for children under 18 years of age. We do not knowingly collect 
                    personal information from children under 18. If we become aware that we have collected personal 
                    information from a child under 18, we will take steps to delete such information.
                  </p>
                </div>
              </div>

              {/* International Transfers */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">International Data Transfers</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700">
                    Your information may be transferred to and processed in countries other than Kenya. 
                    We ensure that such transfers comply with applicable data protection laws and that 
                    appropriate safeguards are in place to protect your information.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. We will notify you of any material 
                    changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    Your continued use of our services after such modifications constitutes your acknowledgment 
                    of the modified Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-gray-700 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                    data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> <a href="mailto:privacy@newkenyan.com" className="text-green-600 hover:underline">privacy@newkenyan.com</a></p>
                    <p><strong>General Contact:</strong> <a href="mailto:info@newkenyan.com" className="text-green-600 hover:underline">info@newkenyan.com</a></p>
                    <p><strong>Address:</strong> Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}