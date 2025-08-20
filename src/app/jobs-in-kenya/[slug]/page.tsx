import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Building2, 
  DollarSign, 
  Calendar,
  CheckCircle,
  Shield,
  Briefcase
} from 'lucide-react';
import jobsData from '@/data/jobs.json';
import { 
  generateJobSlug, 
  generateJobMetaTags, 
  generateJobHeadings 
} from '@/lib/utils';
import Breadcrumb from '@/components/Breadcrumb';
import JobActions from '@/components/JobActions';
import MoreJobsSection from '@/components/MoreJobsSection';
import JobsFAQSection from '@/components/JobsFAQSection';

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SEO and crawlability
export async function generateStaticParams() {
  return jobsData.jobs.map((job) => ({
    slug: generateJobSlug(job.job_title, 'NewKenyan', job.job_location),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: JobDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobsData.jobs.find(j => generateJobSlug(j.job_title, 'NewKenyan', j.job_location) === slug);
  
  if (!job) {
    return {
      title: 'Job Not Found - Jobs in Kenya | NewKenyan.com',
      description: 'The requested job listing could not be found. Browse other jobs in Kenya on NewKenyan.com.',
    };
  }

  const metaTags = generateJobMetaTags(
    job.job_title,
    'NewKenyan',
    job.job_location,
    job.salary
  );

  const canonicalSlug = generateJobSlug(job.job_title, 'NewKenyan', job.job_location);

  return {
    title: metaTags.title,
    description: metaTags.description,
    keywords: metaTags.keywords,
    openGraph: {
      title: metaTags.title,
      description: metaTags.description,
      type: 'article',
      url: `https://newkenyan.com/jobs-in-kenya/${canonicalSlug}`,
      siteName: 'NewKenyan.com',
      locale: 'en_KE',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTags.title,
      description: metaTags.description,
    },
    alternates: {
      canonical: `https://newkenyan.com/jobs-in-kenya/${canonicalSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;
  const job = jobsData.jobs.find(j => generateJobSlug(j.job_title, 'NewKenyan', j.job_location) === slug);

  if (!job) {
    notFound();
  }

  // Generate SEO-optimized headings
  const headings = generateJobHeadings(
    job.job_title,
    'NewKenyan',
    job.job_location
  );

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: 'Jobs in Kenya', href: '/jobs-in-kenya' },
    { label: job.job_location, href: `/jobs-in-kenya?location=${job.job_location}` },
    { label: job.job_title }
  ];

  const currentUrl = `https://newkenyan.com/jobs-in-kenya/${slug}`;
  const shareText = `${job.job_title} job in ${job.job_location} - Jobs in Kenya`;

  // Process how_to_apply text to replace emails with hr@newkenyan.com
  const processedHowToApply = job.how_to_apply.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    'hr@newkenyan.com'
  );

  // Generate JSON-LD schema markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.job_title,
    "description": job.duties_and_responsibilities,
    "identifier": {
      "@type": "PropertyValue",
      "name": "NewKenyan.com",
      "value": job.id.toString()
    },
    "datePosted": job.date,
    "employmentType": job.nature_of_job,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "NewKenyan.com",
      "sameAs": "https://newkenyan.com",
      "url": "https://newkenyan.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.job_location,
        "addressCountry": "Kenya"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "KES",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "DAILY"
      }
    },
    "industry": job.industry,
    "qualifications": job.key_requirements_skills_qualification,
    "applicationContact": {
      "@type": "ContactPoint",
      "email": "hr@newkenyan.com"
    },
    "keywords": ["jobs in kenya", job.job_title.toLowerCase(), job.job_location.toLowerCase(), job.industry.toLowerCase()],
    "url": currentUrl
  };

  return (
    <>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Breadcrumb items={breadcrumbItems} className="mb-6" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Job Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0 flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {headings.h1}
                      </h1>
                      <h2 className="text-xl text-gray-600 mb-4">
                        {headings.h2}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-blue-100 text-blue-800 px-3 py-1">{job.nature_of_job}</Badge>
                        <Badge className="bg-green-100 text-green-800 px-3 py-1">{job.industry}</Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{job.job_location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{job.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-600">Salary</p>
                      <p className="font-semibold text-gray-900">{job.salary}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600">Job Type</p>
                      <p className="font-semibold text-gray-900">{job.nature_of_job}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                        <Building2 className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-600">Industry</p>
                      <p className="font-semibold text-gray-900">{job.industry}</p>
                    </div>
                  </div>
                </div>

                {/* Job Description Sections */}
                <div className="space-y-8">
                  {/* Duties and Responsibilities */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Briefcase className="h-6 w-6 mr-3 text-green-600" />
                      Job Duties and Responsibilities
                    </h3>
                    <div className="space-y-3">
                      {job.duties_and_responsibilities.split('\n').map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-blue-600" />
                      Key Requirements & Qualifications
                    </h3>
                    <div className="space-y-3">
                      {job.key_requirements_skills_qualification.split('\n').map((item, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How to Apply */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Apply for this Job in Kenya</h3>
                    <div className="space-y-3 mb-6">
                      {processedHowToApply.split('\n').map((item, index) => (
                        <p key={index} className="text-gray-700 leading-relaxed">
                          {item}
                        </p>
                      ))}
                    </div>
                    <JobActions 
                      job={{ id: job.id, job_title: job.job_title, job_location: job.job_location }}
                      currentUrl={currentUrl}
                      shareText={shareText}
                      showInlineButton={true}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <JobActions 
                  job={{ id: job.id, job_title: job.job_title, job_location: job.job_location }}
                  currentUrl={currentUrl}
                  shareText={shareText}
                />
                
                {/* Back to Jobs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                  <Link href="/jobs-in-kenya">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to All Jobs in Kenya
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Local SEO Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mt-12 mb-8">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              About {job.job_title} Jobs in {job.job_location}, Kenya
            </h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                {job.job_location} offers excellent career opportunities for {job.job_title} positions with companies 
                like NewKenyan providing {job.nature_of_job} roles. This {job.job_title} position offers 
                {job.salary && ` a salary of ${job.salary}`} and focuses on {job.industry.toLowerCase()} industry experience.
              </p>
              
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Why Choose {job.job_title} Jobs in {job.job_location}:</h4>
                <ul className="list-disc pl-6">
                  <li>Growing {job.industry.toLowerCase()} sector in {job.job_location}</li>
                  <li>Competitive salary packages for {job.job_title} roles</li>
                  <li>Professional development opportunities</li>
                  <li>Central location with good transport links</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">
                  Other {job.job_title} Opportunities in Kenya
                </h4>
                <p>
                  Looking for more {job.job_title} positions in Kenya? Browse our comprehensive 
                  job listings to find similar opportunities across different cities and companies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions about {job.job_title} Jobs
          </h2>
          <div className="space-y-4">
            {[
              {
                question: `What does a ${job.job_title} do in ${job.job_location}?`,
                answer: `A ${job.job_title} in ${job.job_location} ${job.duties_and_responsibilities.split('\n')[0] || 'performs various duties related to their role'}. This ${job.nature_of_job} position focuses on ${job.industry.toLowerCase()} sector responsibilities.`
              },
              {
                question: `What qualifications do I need for ${job.job_title} jobs?`,
                answer: `For ${job.job_title} positions, you typically need: ${job.key_requirements_skills_qualification.split('\n').slice(0, 2).join(', ')}. Check the specific requirements for each job listing.`
              },
              {
                question: `What is the salary range for ${job.job_title} jobs in ${job.job_location}?`,
                answer: job.salary ? `${job.job_title} positions in ${job.job_location} offer competitive salaries. This particular role offers ${job.salary}. Salaries may vary based on experience and company.` : `${job.job_title} salaries in ${job.job_location} vary based on experience, qualifications, and company. Contact employers directly for specific salary information.`
              },
              {
                question: `How do I apply for ${job.job_title} jobs in Kenya?`,
                answer: `To apply for ${job.job_title} jobs in Kenya, send your CV and cover letter to hr@newkenyan.com. Make sure your application highlights relevant experience and qualifications for the ${job.job_title} role.`
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* More Jobs Section */}
        <MoreJobsSection currentJobId={job.id} />
        
        {/* Jobs FAQ Section */}
        <JobsFAQSection />

        {/* Enhanced JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": job.job_title,
              "description": job.duties_and_responsibilities,
              "identifier": {
                "@type": "PropertyValue",
                "name": "NewKenyan.com Job ID",
                "value": job.id.toString()
              },
              "datePosted": job.date,
              "employmentType": job.nature_of_job,
              "hiringOrganization": {
                "@type": "Organization",
                "name": "NewKenyan",
                "sameAs": "https://newkenyan.com",
                "url": "https://newkenyan.com",
                "logo": "https://newkenyan.com/logo.png"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": job.job_location,
                  "addressCountry": "KE"
                }
              },
              "baseSalary": job.salary ? {
                "@type": "MonetaryAmount",
                "currency": "KES",
                "value": {
                  "@type": "QuantitativeValue",
                  "value": job.salary,
                  "unitText": "MONTHLY"
                }
              } : undefined,
              "industry": job.industry,
              "qualifications": job.key_requirements_skills_qualification,
              "responsibilities": job.duties_and_responsibilities,
              "applicationContact": {
                "@type": "ContactPoint",
                "email": "hr@newkenyan.com",
                "name": "NewKenyan HR Team"
              },
              "keywords": [
                "jobs in kenya", 
                job.job_title.toLowerCase(), 
                job.job_location.toLowerCase(), 
                job.industry.toLowerCase(),
                "kenya employment",
                "career opportunities kenya"
              ],
              "url": currentUrl,
              "workHours": job.nature_of_job,
              "jobBenefits": "Competitive salary, professional development, career growth opportunities"
            })
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": `What does a ${job.job_title} do in ${job.job_location}?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `A ${job.job_title} in ${job.job_location} ${job.duties_and_responsibilities.split('\n')[0] || 'performs various duties related to their role'}. This ${job.nature_of_job} position focuses on ${job.industry.toLowerCase()} sector responsibilities.`
                  }
                },
                {
                  "@type": "Question", 
                  "name": `What qualifications do I need for ${job.job_title} jobs?`,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `For ${job.job_title} positions, you typically need: ${job.key_requirements_skills_qualification.split('\n').slice(0, 2).join(', ')}. Check the specific requirements for each job listing.`
                  }
                }
              ]
            })
          }}
        />
        
        <Footer />
      </div>
    </>
  );
}