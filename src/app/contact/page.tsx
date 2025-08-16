import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Mail, 
  MapPin, 
  Clock,
  Send,
  Users,
  Building2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact NewKenyan.com - Get in Touch with Our Team',
  description: 'Contact NewKenyan.com for inquiries, partnerships, advertising opportunities, or support. Reach out to us via email at info@newkenyan.com or phone.',
  keywords: 'contact new kenyan, contact kenya platform, new kenyan support, kenya business contact, advertising opportunities',
  openGraph: {
    title: 'Contact NewKenyan.com - Get in Touch with Our Team',
    description: 'Contact NewKenyan.com for inquiries, partnerships, advertising opportunities, or support. Reach out to us via email at info@newkenyan.com.',
    url: 'https://newkenyan.com/contact',
    siteName: 'NewKenyan.com',
    images: [{
      url: 'https://newkenyan.com/og-contact.jpg',
      width: 1200,
      height: 630,
    }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact NewKenyan.com - Get in Touch with Our Team',
    description: 'Contact NewKenyan.com for inquiries, partnerships, advertising opportunities, or support.',
    images: ['https://newkenyan.com/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://newkenyan.com/contact',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'NewKenyan.com',
      url: 'https://newkenyan.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+254-700-000-000',
          contactType: 'customer service',
          email: 'info@newkenyan.com',
          availableLanguage: ['English', 'Swahili'],
          areaServed: 'Kenya'
        },
        {
          '@type': 'ContactPoint',
          email: 'partnerships@newkenyan.com',
          contactType: 'partnerships',
          availableLanguage: ['English', 'Swahili'],
          areaServed: 'Kenya'
        },
        {
          '@type': 'ContactPoint',
          email: 'advertising@newkenyan.com',
          contactType: 'advertising',
          availableLanguage: ['English', 'Swahili'],
          areaServed: 'Kenya'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nairobi',
        addressCountry: 'Kenya'
      }
    }
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
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                We'd love to hear from you
              </p>
              <p className="text-lg text-green-200 max-w-3xl mx-auto">
                Whether you have questions, partnership opportunities, or need support, 
                our team is here to help. Get in touch with us today.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Contact Cards */}
                <div className="lg:col-span-1">
                  <div className="space-y-6">
                    {/* General Inquiries */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-green-100 p-3 rounded-full mr-4">
                          <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">General Inquiries</h3>
                          <p className="text-gray-600">For any questions or support</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <strong>Email:</strong>{' '}
                          <a href="mailto:info@newkenyan.com" className="text-green-600 hover:underline">
                            info@newkenyan.com
                          </a>
                        </p>
                        <p className="text-gray-700">
                          <strong>Phone:</strong>{' '}
                          <a href="tel:+254700000000" className="text-green-600 hover:underline">
                            +254 700 000 000
                          </a>
                        </p>
                      </div>
                    </div>

                    {/* Partnerships */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Partnerships</h3>
                          <p className="text-gray-600">Business collaborations</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        <strong>Email:</strong>{' '}
                        <a href="mailto:partnerships@newkenyan.com" className="text-blue-600 hover:underline">
                          partnerships@newkenyan.com
                        </a>
                      </p>
                    </div>

                    {/* Advertising */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-yellow-100 p-3 rounded-full mr-4">
                          <Building2 className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Advertising</h3>
                          <p className="text-gray-600">Promote your business</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        <strong>Email:</strong>{' '}
                        <a href="mailto:advertising@newkenyan.com" className="text-yellow-600 hover:underline">
                          advertising@newkenyan.com
                        </a>
                      </p>
                    </div>

                    {/* Location */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-red-100 p-3 rounded-full mr-4">
                          <MapPin className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Location</h3>
                          <p className="text-gray-600">Where to find us</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Nairobi, Kenya<br />
                        East Africa
                      </p>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full mr-4">
                          <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Business Hours</h3>
                          <p className="text-gray-600">When we're available</p>
                        </div>
                      </div>
                      <div className="space-y-1 text-gray-700">
                        <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
                        <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
                        <p><strong>Sunday:</strong> Closed</p>
                        <p className="text-sm text-gray-600 mt-2">All times are East Africa Time (EAT)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-white border border-gray-200 rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h2>
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Your first name"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Your last name"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="+254 700 000 000"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="advertising">Advertising</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          required
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                          I agree to the{' '}
                          <a href="/privacy-policy" className="text-green-600 hover:underline">
                            Privacy Policy
                          </a>{' '}
                          and{' '}
                          <a href="/terms-of-service" className="text-green-600 hover:underline">
                            Terms of Service
                          </a>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Quick answers to common questions
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    question: "How do I post a job on NewKenyan.com?",
                    answer: "Simply visit our 'Post a Job' page, fill in the job details, and complete the payment process. Your job will be reviewed and published within 24 hours."
                  },
                  {
                    question: "How much does it cost to list my business?",
                    answer: "Business listings start from KSh 100. Visit our pricing page for detailed information about features and pricing tiers."
                  },
                  {
                    question: "Can I edit my listing after posting?",
                    answer: "Yes, you can edit your listings through your dashboard. Some changes may require re-approval."
                  },
                  {
                    question: "How do I advertise on NewKenyan.com?",
                    answer: "Contact our advertising team at advertising@newkenyan.com for custom advertising solutions and pricing."
                  },
                  {
                    question: "Do you offer support in Swahili?",
                    answer: "Yes, our customer support team can assist you in both English and Swahili."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}