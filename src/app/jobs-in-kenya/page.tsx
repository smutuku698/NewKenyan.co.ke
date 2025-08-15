'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import jobsData from '@/data/jobs.json';
import { Search, MapPin, Building2, Users, ChevronDown, Briefcase, Mail, Phone } from 'lucide-react';

export default function JobsInKenyaPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Filter jobs by location for specific sections
  const nairobiJobs = jobsData.jobs.filter(job => job.job_location.toLowerCase().includes('nairobi')).slice(0, 6);
  const mombasaJobs = jobsData.jobs.filter(job => job.job_location.toLowerCase().includes('mombasa')).slice(0, 3);
  const ngoJobs = jobsData.jobs.filter(job => 
    job.industry.toLowerCase().includes('ngo') || 
    job.industry.toLowerCase().includes('foundation') ||
    job.job_title.toLowerCase().includes('ngo') ||
    job.duties_and_responsibilities.toLowerCase().includes('non-profit')
  ).slice(0, 4);

  const faqData = [
    {
      question: "How do I find jobs in Kenya on NewKenyan.com?",
      answer: "Browse our extensive <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>jobs in Kenya</a> section. Use search filters to find opportunities by location, industry, and experience level. We feature jobs in Nairobi, Mombasa, Nakuru, and across Kenya."
    },
    {
      question: "Are there job vacancies in Nairobi available on your platform?",
      answer: "Yes! We have hundreds of <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>job vacancies in Nairobi</a> from top companies. Browse positions in technology, finance, healthcare, marketing, and many other industries in Kenya&apos;s capital city."
    },
    {
      question: "Do you have online jobs in Kenya listings?",
      answer: "Absolutely! Find <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>online jobs in Kenya</a> including remote work opportunities, freelance positions, and digital marketing roles. Perfect for professionals seeking flexible work arrangements."
    },
    {
      question: "Can I find NGO jobs in Kenya on your website?",
      answer: "Yes, we feature numerous <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>NGO jobs in Kenya</a> from international and local non-profit organizations. Find opportunities in development, humanitarian work, research, and advocacy."
    },
    {
      question: "Are there jobs in Mombasa and other coastal cities?",
      answer: "We list <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>jobs in Mombasa</a> and other coastal cities. Find opportunities in tourism, logistics, marine industries, and business services along Kenya&apos;s coast."
    },
    {
      question: "How do I find jobs in Nakuru and other upcountry towns?",
      answer: "Search for <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>jobs in Nakuru</a> and other upcountry locations. We feature opportunities in agriculture, manufacturing, education, and local business sectors across Kenya."
    },
    {
      question: "How often are new job vacancies posted?",
      answer: "New job vacancies in Kenya are posted daily. Check our <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>latest jobs</a> section regularly for fresh opportunities from companies across Nairobi, Mombasa, and other Kenyan cities."
    },
    {
      question: "How do I apply for jobs through NewKenyan.com?",
      answer: "Click on any job listing to view full details and application instructions. Most jobs include direct contact information or application links. Create your profile to save favorite jobs and get notifications for new opportunities."
    }
  ];

  return (
    <>
      <Head>
        <title>Jobs in Kenya - Job Vacancies in Nairobi, Mombasa & NGO Jobs</title>
        <meta name="description" content="Find jobs in Kenya, job vacancies in Nairobi, online jobs in Kenya, jobs in Mombasa, jobs in Nakuru, NGO jobs. Browse thousands of career opportunities across Kenya." />
        <meta name="keywords" content="jobs in kenya, jobs in nairobi, job vacancies in kenya, online jobs in kenya, jobs in mombasa, jobs in nakuru, ngo jobs, job opportunities kenya, career opportunities kenya" />
        <meta property="og:title" content="Jobs in Kenya - Job Vacancies in Nairobi, Mombasa & NGO Jobs" />
        <meta property="og:description" content="Find jobs in Kenya, job vacancies in Nairobi, online jobs in Kenya, jobs in Mombasa, NGO jobs. Browse career opportunities across Kenya." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jobs in Kenya - Job Vacancies in Nairobi & Mombasa" />
        <meta name="twitter:description" content="Find jobs in Kenya, job vacancies in Nairobi, online jobs, NGO jobs. Browse career opportunities." />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": "Jobs in Kenya - Career Opportunities",
              "description": "Find job vacancies in Kenya including positions in Nairobi, Mombasa, Nakuru, and NGO jobs across the country",
              "hiringOrganization": {
                "@type": "Organization",
                "name": "NewKenyan.com",
                "sameAs": "https://newkenyan.com"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "KE",
                  "addressRegion": "Kenya"
                }
              },
              "url": "https://newkenyan.com/jobs-in-kenya",
              "datePosted": new Date().toISOString(),
              "applicationContact": {
                "@type": "ContactPoint",
                "telephone": "+254736407642",
                "email": "hr@newkenyan.com"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-office.jpg"
              alt="Jobs in Kenya - Office Environment"
              fill
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gray-900/50" />
          </div>
          
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Jobs in Kenya - Find Job Vacancies in Nairobi, Mombasa & NGO Jobs
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover thousands of job opportunities in Kenya. Find jobs in Nairobi, Mombasa, Nakuru, online jobs in Kenya, NGO jobs, and career opportunities across all industries.
            </p>
            
            {/* Search Form */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-lg">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs in Kenya, Nairobi, Mombasa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-gray-900"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                  <Search className="h-4 w-4 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </section>

        <main className="py-12">
          <div className="container mx-auto px-4">
            
            {/* Jobs Statistics */}
            <section className="mb-16">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{jobsData.jobs.length}+</div>
                  <div className="text-sm text-gray-600">Jobs in Kenya</div>
                </div>
                
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 mb-1">{nairobiJobs.length}+</div>
                  <div className="text-sm text-gray-600">Jobs in Nairobi</div>
                </div>
                
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">{mombasaJobs.length}+</div>
                  <div className="text-sm text-gray-600">Jobs in Mombasa</div>
                </div>
                
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">{ngoJobs.length}+</div>
                  <div className="text-sm text-gray-600">NGO Jobs</div>
                </div>
              </div>
            </section>

            {/* Jobs in Nairobi Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Jobs in Nairobi - Latest Vacancies</h2>
                  <p className="text-gray-600">Find the best job opportunities in Kenya&apos;s capital city</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/jobs-in-kenya">View All Jobs in Nairobi</Link>
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {nairobiJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            </section>

            {/* NGO Jobs Section */}
            <section className="mb-16 bg-gray-50 p-8 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">NGO Jobs in Kenya - Non-Profit Opportunities</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore meaningful career opportunities with NGOs, foundations, and international organizations operating in Kenya
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                {ngoJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
              
              <div className="text-center">
                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/jobs-in-kenya">View All NGO Jobs</Link>
                </Button>
              </div>
            </section>

            {/* Jobs in Mombasa Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Jobs in Mombasa - Coastal Opportunities</h2>
                  <p className="text-gray-600">Discover career opportunities in Kenya&apos;s coastal region</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/jobs-in-kenya">View All Jobs in Mombasa</Link>
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {mombasaJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            </section>

            {/* All Jobs Section */}
            <section className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">All Job Vacancies in Kenya</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Browse all available positions including online jobs in Kenya, jobs in Nakuru, and opportunities across all Kenyan cities
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {jobsData.jobs.slice(0, 9).map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                  Load More Job Vacancies
                </Button>
              </div>
            </section>

            {/* Call to Action */}
            <section className="mb-16 bg-green-50 p-8 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Post Your Job Vacancy in Kenya</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Reach thousands of qualified professionals looking for jobs in Kenya. Post your job vacancy and find the best talent in Nairobi, Mombasa, and across Kenya.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white px-8" asChild>
                    <Link href="/add-listing">Post Job Vacancy</Link>
                  </Button>
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8" asChild>
                    <Link href="/directory">Browse Companies</Link>
                  </Button>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Contact us: <a href="mailto:hr@newkenyan.com" className="text-green-600 hover:underline">hr@newkenyan.com</a> | <a href="tel:+254736407642" className="text-green-600 hover:underline">+254 736 407 642</a></p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions - Jobs in Kenya</h2>
                  <p className="text-gray-600">
                    Get answers to common questions about finding jobs in Kenya, Nairobi, Mombasa, and NGO opportunities
                  </p>
                </div>

                <div className="space-y-4">
                  {faqData.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                        <ChevronDown 
                          className={`h-5 w-5 text-gray-500 transform transition-transform ${
                            openFAQ === index ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      {openFAQ === index && (
                        <div className="px-6 pb-4">
                          <div 
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <p className="text-gray-600 mb-4">
                    Need help finding specific job opportunities in Kenya?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                      <Link href="mailto:hr@newkenyan.com">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Support
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-2 border-gray-300 hover:bg-gray-100" asChild>
                      <Link href="tel:+254736407642">
                        <Phone className="h-4 w-4 mr-2" />
                        Call +254 736 407 642
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}