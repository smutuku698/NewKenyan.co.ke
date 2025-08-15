"use client";

import { Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import JobCard from './JobCard';
import jobsData from '@/data/jobs.json';

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

interface MoreJobsSectionProps {
  currentJobId: number;
}

const MoreJobsSection = ({ currentJobId }: MoreJobsSectionProps) => {
  // Get 10 random jobs excluding the current job
  const availableJobs = jobsData.jobs.filter((job: Job) => job.id !== currentJobId);
  const randomJobs = availableJobs
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">More Job Opportunities in Kenya</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore additional job opportunities across various industries in Kenya. From entry-level positions to executive roles.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {randomJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg" asChild>
            <Link href="/jobs-in-kenya">
              View All {jobsData.total_jobs}+ Jobs in Kenya
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MoreJobsSection;