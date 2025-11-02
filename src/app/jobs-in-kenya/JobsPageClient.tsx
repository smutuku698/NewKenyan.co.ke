'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import localJobsData from '../../../local-jobs.json';
import { Search, MapPin, Building2, Users, ChevronDown, Briefcase, Filter, X } from 'lucide-react';
import { slugify } from '@/lib/slugify';

interface Job {
  id: number;
  date: string;
  job_title: string;
  nature_of_job: string;
  industry: string;
  salary: string;
  job_location: string;
  duties_and_responsibilities: string;
  key_requirements_skills_qualification: string;
  how_to_apply: string;
}

export default function JobsPageClient() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [salaryRange, setSalaryRange] = useState<string>('');

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Parse date to sort jobs (most recent first)
  const parseJobDate = (dateStr: string): Date => {
    // Handle format like "31 October 2025"
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? new Date(0) : date;
  };

  // Sort jobs by date (most recent first)
  const sortedJobs = useMemo(() => {
    return [...localJobsData.jobs].sort((a, b) => {
      const dateA = parseJobDate(a.date);
      const dateB = parseJobDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  // Get unique filter options
  const locations = useMemo(() => {
    const locs = new Set(sortedJobs.map(job => job.job_location));
    return Array.from(locs).sort();
  }, [sortedJobs]);

  const industries = useMemo(() => {
    const inds = new Set(sortedJobs.map(job => job.industry));
    return Array.from(inds).sort();
  }, [sortedJobs]);

  const jobTypes = useMemo(() => {
    const types = new Set(sortedJobs.map(job => job.nature_of_job));
    return Array.from(types).sort();
  }, [sortedJobs]);

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return sortedJobs.filter(job => {
      const matchesSearch = !searchTerm ||
        job.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.job_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.industry.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = !selectedLocation || job.job_location === selectedLocation;
      const matchesIndustry = !selectedIndustry || job.industry === selectedIndustry;
      const matchesJobType = !selectedJobType || job.nature_of_job === selectedJobType;

      return matchesSearch && matchesLocation && matchesIndustry && matchesJobType;
    });
  }, [sortedJobs, searchTerm, selectedLocation, selectedIndustry, selectedJobType]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedIndustry('');
    setSelectedJobType('');
    setSalaryRange('');
  };

  // Filter jobs by location for specific sections
  const nairobiJobs = sortedJobs.filter(job => job.job_location.toLowerCase().includes('nairobi')).slice(0, 6);
  const mombasaJobs = sortedJobs.filter(job => job.job_location.toLowerCase().includes('mombasa')).slice(0, 3);
  const ngoJobs = sortedJobs.filter(job =>
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
      answer: "Yes! We have hundreds of <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>job vacancies in Nairobi</a> from top companies. Browse positions in technology, finance, healthcare, marketing, and many other industries in Kenya's capital city."
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
      answer: "We list <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>jobs in Mombasa</a> and other coastal cities. Find opportunities in tourism, logistics, marine industries, and business services along Kenya's coast."
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
          <h1 className="text-5xl font-bold mb-6 !text-white">
            Jobs in Kenya - Find Job Vacancies in Nairobi, Mombasa & NGO Jobs
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto !text-white">
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
          
          {/* All Jobs Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">All Job Opportunities in Kenya</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Browse through {localJobsData.total_jobs}+ verified job vacancies across Kenya. From entry-level positions to executive roles, find your perfect career opportunity.
              </p>
            </div>

            {/* Filter Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  {(selectedLocation || selectedIndustry || selectedJobType || searchTerm) && (
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <X className="h-4 w-4" />
                      Clear All
                    </Button>
                  )}
                </div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
                </p>
              </div>

              {/* Collapsible Filters */}
              {showFilters && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="h-4 w-4 inline mr-1" />
                        Location
                      </label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">All Locations</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Industry Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Building2 className="h-4 w-4 inline mr-1" />
                        Industry
                      </label>
                      <select
                        value={selectedIndustry}
                        onChange={(e) => setSelectedIndustry(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">All Industries</option>
                        {industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Job Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Briefcase className="h-4 w-4 inline mr-1" />
                        Job Type
                      </label>
                      <select
                        value={selectedJobType}
                        onChange={(e) => setSelectedJobType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">All Job Types</option>
                        {jobTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Search className="h-4 w-4 inline mr-1" />
                        Keyword Search
                      </label>
                      <Input
                        placeholder="Job title, location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Jobs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    date={job.date}
                    job_title={job.job_title}
                    nature_of_job={job.nature_of_job}
                    industry={job.industry}
                    salary={job.salary}
                    job_location={job.job_location}
                    duties_and_responsibilities={job.duties_and_responsibilities}
                    key_requirements_skills_qualification={job.key_requirements_skills_qualification}
                    how_to_apply={job.how_to_apply}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">
                    No jobs found matching your filters. Try adjusting your search criteria.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Jobs by Location */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Jobs by Location</h2>
            
            {/* Nairobi Jobs */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Job Vacancies in Nairobi</h3>
                <Link href="/jobs-in-kenya?location=nairobi" className="text-green-600 hover:underline">
                  View all Nairobi jobs →
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nairobiJobs.map((job, index) => (
                  <JobCard 
                    key={index} 
                    id={job.id}
                    date={job.date}
                    job_title={job.job_title}
                    nature_of_job={job.nature_of_job}
                    industry={job.industry}
                    salary={job.salary}
                    job_location={job.job_location}
                    duties_and_responsibilities={job.duties_and_responsibilities}
                    key_requirements_skills_qualification={job.key_requirements_skills_qualification}
                    how_to_apply={job.how_to_apply}
                  />
                ))}
              </div>
            </div>

            {/* Mombasa Jobs */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold">Jobs in Mombasa</h3>
                <Link href="/jobs-in-kenya?location=mombasa" className="text-green-600 hover:underline">
                  View all Mombasa jobs →
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mombasaJobs.map((job, index) => (
                  <JobCard 
                    key={index} 
                    id={job.id}
                    date={job.date}
                    job_title={job.job_title}
                    nature_of_job={job.nature_of_job}
                    industry={job.industry}
                    salary={job.salary}
                    job_location={job.job_location}
                    duties_and_responsibilities={job.duties_and_responsibilities}
                    key_requirements_skills_qualification={job.key_requirements_skills_qualification}
                    how_to_apply={job.how_to_apply}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* NGO Jobs Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">NGO Jobs in Kenya</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find meaningful career opportunities with non-profit organizations and NGOs across Kenya. Make a difference while building your career.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {ngoJobs.map((job, index) => (
                <JobCard 
                  key={index} 
                  id={job.id}
                  date={job.date}
                  job_title={job.job_title}
                  nature_of_job={job.nature_of_job}
                  industry={job.industry}
                  salary={job.salary}
                  job_location={job.job_location}
                  duties_and_responsibilities={job.duties_and_responsibilities}
                  key_requirements_skills_qualification={job.key_requirements_skills_qualification}
                  how_to_apply={job.how_to_apply}
                />
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                View All NGO Jobs
              </Button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="mb-16 bg-green-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Job Market Statistics</h2>
              <p className="text-gray-600">See why NewKenyan.com is Kenya's leading job platform</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">{localJobsData.total_jobs}+</h3>
                <p className="text-gray-600">Active Job Listings</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">500+</h3>
                <p className="text-gray-600">Hiring Companies</p>
              </div>

              <div className="text-center">
                <div className="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">10,000+</h3>
                <p className="text-gray-600">Job Seekers</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-600 mb-2">47</h3>
                <p className="text-gray-600">Counties Covered</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about finding jobs in Kenya through NewKenyan.com
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 transform transition-transform ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4">
                      <div 
                        className="text-gray-600"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-green-600 text-white rounded-lg p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Job?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of Kenyans who have found their perfect career opportunities through NewKenyan.com
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                Browse All Jobs
              </Button>
              <Link href="/jobs-in-kenya/post">
                <Button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                  Post a Job
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}