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
import { generateJobSlug } from '@/lib/slugify';
import JobActions from '@/components/JobActions';
import MoreJobsSection from '@/components/MoreJobsSection';
import JobsFAQSection from '@/components/JobsFAQSection';

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for SEO and crawlability
export async function generateStaticParams() {
  return jobsData.jobs.map((job) => ({
    slug: generateJobSlug(job.job_title, job.job_location, job.id),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: JobDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobsData.jobs.find(j => generateJobSlug(j.job_title, j.job_location, j.id) === slug);
  
  if (!job) {
    return {
      title: 'Job Not Found - Jobs in Kenya | NewKenyan.com',
      description: 'The requested job listing could not be found. Browse other jobs in Kenya on NewKenyan.com.',
    };
  }

  const title = `${job.job_title} Job in ${job.job_location} - Jobs in Kenya | NewKenyan.com`;
  const description = `${job.job_title} position available in ${job.job_location}, Kenya. ${job.nature_of_job} role in ${job.industry} industry. Apply now for jobs in Kenya on NewKenyan.com.`;

  return {
    title,
    description,
    keywords: `jobs in kenya, ${job.job_title.toLowerCase()}, ${job.job_location.toLowerCase()}, ${job.industry.toLowerCase()}, kenya jobs, employment kenya`,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://newkenyan.com/jobs-in-kenya/${slug}`,
      siteName: 'NewKenyan.com',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://newkenyan.com/jobs-in-kenya/${slug}`,
    },
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;
  const job = jobsData.jobs.find(j => generateJobSlug(j.job_title, j.job_location, j.id) === slug);

  if (!job) {
    notFound();
  }

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
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            {/* Breadcrumb Navigation */}
            <nav className="mb-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Link href="/" className="hover:text-green-600">Home</Link>
                <span>/</span>
                <Link href="/jobs-in-kenya" className="hover:text-green-600">Jobs in Kenya</Link>
                <span>/</span>
                <span className="text-gray-900">{job.job_title}</span>
              </div>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Job Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0 flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-3">
                        {job.job_title} - Jobs in Kenya
                      </h1>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Briefcase className="h-6 w-6 mr-3 text-green-600" />
                      Job Duties and Responsibilities
                    </h2>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Shield className="h-6 w-6 mr-3 text-blue-600" />
                      Key Requirements & Qualifications
                    </h2>
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
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Apply for this Job in Kenya</h2>
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
        
        {/* More Jobs Section */}
        <MoreJobsSection currentJobId={job.id} />
        
        {/* Jobs FAQ Section */}
        <JobsFAQSection />
        
        <Footer />
      </div>
    </>
  );
}