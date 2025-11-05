"use client";

import { Clock, MapPin, DollarSign, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';

interface JobCardProps {
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

const JobCard = ({
  id,
  date,
  job_title,
  nature_of_job,
  industry,
  salary,
  job_location,
  duties_and_responsibilities,
}: JobCardProps) => {
  const handleApplyNow = () => {
    // Redirect to original job listing on JobVacancy.co.ke
    const jobSlug = slugify(job_title);
    const jobVacancyUrl = `https://jobvacancy.co.ke/jobs-in-kenya/${jobSlug}`;
    window.open(jobVacancyUrl, '_blank');
  };

  const getShortDescription = (text: string) => {
    if (!text) return 'No description available';
    const firstSentence = text.split('\n')[0];
    return firstSentence.length > 150 ? firstSentence.substring(0, 150) + '...' : firstSentence;
  };

  return (
    <div className="relative rounded-lg p-6 h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-white"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold shadow-sm">
                {nature_of_job}
              </Badge>
              <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-semibold shadow-sm">
                {industry}
              </Badge>
            </div>

            <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-2 group-hover:text-green-700 transition-colors">
              {job_title}
            </h3>
          </div>

          <div className="flex space-x-1 ml-4">
            <Button variant="ghost" size="sm" className="hover:bg-white/60">
              <Heart className="h-4 w-4 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-white/60">
              <Share2 className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Details with enhanced styling */}
        <div className="space-y-3 mb-4 bg-white/50 rounded-lg p-4 backdrop-blur-sm">
          <div className="flex items-center text-gray-700 text-sm font-medium">
            <div className="bg-green-100 p-1.5 rounded-md mr-3">
              <MapPin className="h-4 w-4 text-green-700" />
            </div>
            {job_location}
          </div>

          <div className="flex items-center text-gray-700 text-sm font-medium">
            <div className="bg-blue-100 p-1.5 rounded-md mr-3">
              <DollarSign className="h-4 w-4 text-blue-700" />
            </div>
            {salary}
          </div>

          <div className="flex items-center text-gray-700 text-sm font-medium">
            <div className="bg-orange-100 p-1.5 rounded-md mr-3">
              <Clock className="h-4 w-4 text-orange-700" />
            </div>
            {date}
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-6 bg-white/40 rounded-lg p-4 backdrop-blur-sm">
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {getShortDescription(duties_and_responsibilities)}
          </p>
        </div>

        {/* Actions with enhanced buttons */}
        <div className="flex gap-3">
          <Link href={`/jobs-in-kenya/${slugify(job_title)}`} className="flex-1">
            <Button variant="outline" className="w-full border-2 border-green-600 hover:bg-green-50 text-green-700 font-semibold text-sm min-w-0">
              <span className="truncate">Learn More</span>
            </Button>
          </Link>
          <Button
            onClick={handleApplyNow}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex-1 text-sm min-w-0 font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <span className="truncate">Apply Now</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;