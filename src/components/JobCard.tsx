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
    <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge className="bg-blue-100 text-blue-800 text-xs">
              {nature_of_job}
            </Badge>
            <Badge className="bg-green-100 text-green-800 text-xs">
              {industry}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
            {job_title}
          </h3>
        </div>

        <div className="flex space-x-1 ml-4">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="h-4 w-4 mr-2" />
          {job_location}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <DollarSign className="h-4 w-4 mr-2" />
          {salary}
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          {date}
        </div>
      </div>

      {/* Description */}
      <div className="flex-1 mb-6">
        <p className="text-sm text-gray-600 line-clamp-3">
          {getShortDescription(duties_and_responsibilities)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link href={`/jobs-in-kenya/${slugify(job_title)}`} className="flex-1">
          <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-100 text-sm min-w-0">
            <span className="truncate">Learn More</span>
          </Button>
        </Link>
        <Button
          onClick={handleApplyNow}
          className="bg-green-700 hover:bg-green-800 text-white flex-1 text-sm min-w-0"
        >
          <span className="truncate">Apply Now</span>
        </Button>
      </div>
    </div>
  );
};

export default JobCard;