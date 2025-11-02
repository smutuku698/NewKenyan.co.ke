'use client';

import { useState, useEffect, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import PaymentModal from '@/components/PaymentModal';
import { useUser, SignInButton } from '@clerk/nextjs';
import { 
  CheckCircle, 
  Briefcase, 
  Building2, 
  FileText,
  Mail,
  Calendar,
  ArrowLeft,
  CreditCard,
  UserPlus,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface JobFormData extends Record<string, unknown> {
  job_title: string;
  nature_of_job: string;
  industry: string;
  salary: string;
  job_location: string;
  duties_and_responsibilities: string;
  key_requirements_skills_qualification: string;
  how_to_apply: string;
  company_name: string;
  contact_email: string;
  contact_phone: string;
}

function PostJobForm() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<JobFormData>({
    job_title: '',
    nature_of_job: '',
    industry: '',
    salary: '',
    job_location: '',
    duties_and_responsibilities: '',
    key_requirements_skills_qualification: '',
    how_to_apply: '',
    company_name: '',
    contact_email: '',
    contact_phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');

  const jobTypes = ['FULL TIME', 'PART TIME', 'CASUAL', 'CONTRACT', 'INTERNSHIP', 'FREELANCE'];
  const industries = [
    'HOSPITALITY', 'AGRICULTURE', 'TECHNOLOGY', 'HEALTHCARE', 'FINANCE', 'EDUCATION',
    'CONSTRUCTION', 'MANUFACTURING', 'RETAIL', 'TRANSPORT', 'MEDIA', 'GOVERNMENT',
    'NGO', 'BANKING', 'INSURANCE', 'REAL ESTATE', 'TELECOMMUNICATIONS', 'ENERGY',
    'MINING', 'AUTOMOTIVE', 'FOOD & BEVERAGE', 'TOURISM', 'SECURITY', 'LOGISTICS'
  ];

  const locations = [
    'NAIROBI', 'MOMBASA', 'KISUMU', 'NAKURU', 'ELDORET', 'THIKA', 'MALINDI',
    'KITALE', 'GARISSA', 'KAKAMEGA', 'MACHAKOS', 'MERU', 'NYERI', 'KERICHO',
    'MAASAI MARA', 'KAJIADO', 'KIAMBU', 'MURANG&apos;A', 'EMBU', 'ISIOLO',
    'REMOTE', 'NATIONWIDE'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Check for payment callback
  useEffect(() => {
    const paymentRef = searchParams.get('payment_reference');
    const paymentStatus = searchParams.get('payment_status');
    
    if (paymentRef && paymentStatus === 'success') {
      setPaymentReference(paymentRef);
      // Auto-submit the job after successful payment
      submitJobAfterPayment(paymentRef);
    }
  }, [searchParams]);

  const validateForm = () => {
    const requiredFields = [
      'job_title', 'nature_of_job', 'industry', 'salary', 'job_location',
      'duties_and_responsibilities', 'key_requirements_skills_qualification',
      'how_to_apply', 'company_name', 'contact_email'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof JobFormData]) {
        return false;
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contact_email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if user is signed in
    if (!user) {
      setError('Please sign in to post a job. You need an account to manage your job listings.');
      return;
    }

    // Validate form first
    if (!validateForm()) {
      setError('Please fill in all required fields correctly');
      return;
    }

    // Show payment modal after validation
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (reference: string) => {
    setPaymentReference(reference);
    setShowPaymentModal(false);
    submitJobAfterPayment(reference);
  };

  const submitJobAfterPayment = async (reference: string) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          payment_reference: reference,
          payment_amount: 'KES 300',
          user_id: user?.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || 'Failed to submit job posting');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit job posting. Please try again.';
      setError(errorMessage);
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Posted Successfully!</h1>
              <p className="text-gray-600 mb-4">
                Thank you for posting your job opportunity. We&apos;ll review your submission and add it to our job listings within 24-48 hours.
              </p>
              {paymentReference && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">
                    <strong>Payment Confirmed:</strong> KES 300 
                    <br />
                    <span className="text-xs text-green-600">Reference: {paymentReference}</span>
                  </p>
                </div>
              )}
              <div className="space-y-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white" asChild>
                  <Link href="/dashboard">Go to My Dashboard</Link>
                </Button>
                <div className="flex space-x-3">
                  <Button variant="outline" asChild>
                    <Link href="/jobs-in-kenya/post">Post Another Job</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/jobs-in-kenya">Browse All Jobs</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show authentication gate if user is not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Link href="/" className="hover:text-green-600">Home</Link>
                <span>/</span>
                <Link href="/jobs-in-kenya" className="hover:text-green-600">Jobs in Kenya</Link>
                <span>/</span>
                <span className="text-gray-900">Post Job</span>
              </div>
            </nav>

            {/* Authentication Required */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
                <p className="text-gray-600 mb-6">
                  To post a job listing, you need to sign in to your account. This helps us:
                </p>
                <ul className="text-left text-gray-600 mb-8 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Verify your identity and listing authenticity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Allow you to manage and edit your job posts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Track applications and responses
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Prevent spam and maintain quality
                  </li>
                </ul>
                <div className="space-y-4">
                  <SignInButton mode="modal">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                      <UserPlus className="h-5 w-5 mr-2" />
                      Sign In to Post Job
                    </Button>
                  </SignInButton>
                  <p className="text-sm text-gray-500">
                    Don't have an account? Signing in will create one for you automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Why Post Jobs on NewKenyan.com?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Wide Reach</h3>
                    <p className="text-gray-600 text-sm">Access thousands of qualified candidates across all 47 counties in Kenya.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Trusted Platform</h3>
                    <p className="text-gray-600 text-sm">Kenya's most trusted job board with verified employers and candidates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Affordable Pricing</h3>
                    <p className="text-gray-600 text-sm">Starting at just KSh 100 for 30 days of visibility.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Easy Management</h3>
                    <p className="text-gray-600 text-sm">Manage all your job listings from one convenient dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Link href="/" className="hover:text-green-600">Home</Link>
              <span>/</span>
              <Link href="/jobs-in-kenya" className="hover:text-green-600">Jobs in Kenya</Link>
              <span>/</span>
              <span className="text-gray-900">Post Job</span>
            </div>
          </nav>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Post a Job in Kenya</h1>
                <p className="text-gray-600 mt-2">Reach thousands of qualified candidates across Kenya</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mx-auto mb-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">Posting Fee</p>
                <p className="font-semibold text-gray-900">KES 300</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mx-auto mb-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Quick Review</p>
                <p className="font-semibold text-gray-900">24-48 Hours</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mx-auto mb-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Wide Reach</p>
                <p className="font-semibold text-gray-900">270K+ Views</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* Form Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">📝 Before you start:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• All fields marked with * are required</li>
                <li>• You need to be signed in to post a job</li>
                <li>• A payment of KES 300 is required to publish your job</li>
                <li>• Your job will be reviewed within 24-48 hours</li>
              </ul>
            </div>

            <div className="space-y-8">
              {/* Company Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-green-600" />
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g. Kenya Airways, Safaricom Ltd, ABC Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contact_email"
                      value={formData.contact_email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="hr@company.com or jobs@company.co.ke"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+254 700 000 000 or 0700 000 000"
                  />
                </div>
              </div>

              {/* Job Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                  Job Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g. Marketing Manager, Software Developer, Sales Executive"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Job Type *
                      </label>
                      <select
                        name="nature_of_job"
                        value={formData.nature_of_job}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select job type</option>
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Industry *
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Location *
                      </label>
                      <select
                        name="job_location"
                        value={formData.job_location}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select location</option>
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Salary *
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g. KSH 50,000-80,000, KSH 100,000+ or Negotiable"
                    />
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-purple-600" />
                  Job Description
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duties and Responsibilities *
                    </label>
                    <textarea
                      name="duties_and_responsibilities"
                      value={formData.duties_and_responsibilities}
                      onChange={handleInputChange}
                      required
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Example:
• Develop and implement marketing strategies
• Manage social media campaigns and content
• Analyze market trends and competitor activities
• Coordinate with sales team on lead generation
• Prepare monthly marketing reports"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Key Requirements & Qualifications *
                    </label>
                    <textarea
                      name="key_requirements_skills_qualification"
                      value={formData.key_requirements_skills_qualification}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Example:
• Bachelor's degree in Marketing or related field
• 3+ years experience in digital marketing
• Proficiency in Google Analytics and social media tools
• Excellent written and verbal communication skills
• Strong analytical and project management abilities"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How to Apply *
                    </label>
                    <textarea
                      name="how_to_apply"
                      value={formData.how_to_apply}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Example:
Send your CV and cover letter to hr@company.co.ke with subject 'Marketing Manager Application'. Include your expected salary and availability date. Only shortlisted candidates will be contacted within 2 weeks."
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                    {!user && (
                      <p className="text-sm text-red-600 mt-1">
                        <Link href="/sign-in" className="underline hover:text-red-800">Click here to sign in</Link> or <Link href="/sign-up" className="underline hover:text-red-800">create an account</Link>.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg flex-1"
                >
                  {isSubmitting ? 'Submitting...' : '🎉 Anniversary Special: Pay KES 100 & Post Job'}
                </Button>
                <Button variant="outline" asChild className="px-8 py-3 text-lg">
                  <Link href="/jobs-in-kenya">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Jobs
                  </Link>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={handlePaymentSuccess}
        email={formData.contact_email}
        listingData={formData}
        listingType="job"
      />
    </div>
  );
}

export default function JobPostFormClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostJobForm />
    </Suspense>
  );
}