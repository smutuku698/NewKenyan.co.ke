"use client";

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const JobsFAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const jobsFaqData = [
    {
      question: "How do I find jobs that pay through M-Pesa in Kenya?",
      answer: "Many employers in Kenya now pay salaries through M-Pesa for convenience. When browsing jobs on our platform, look for job descriptions that mention 'M-Pesa payments' or contact employers directly to inquire about payment methods. Freelance and casual jobs often use M-Pesa for quick payments."
    },
    {
      question: "What are the highest paying jobs in Kenya right now?",
      answer: "Based on current market trends, some of the highest paying jobs in Kenya include IT specialists, digital marketing managers, financial analysts, project managers, medical professionals, and senior management positions. Check our <a href='/jobs-in-kenya' class='text-green-600 hover:underline'>latest job listings</a> for specific salary ranges."
    },
    {
      question: "How do I apply for government jobs in Kenya?",
      answer: "Government jobs in Kenya are typically advertised on the Public Service Commission website and major newspapers. We also feature government job opportunities on our platform. Look for positions marked as 'Government' or 'Public Service' in the industry filter."
    },
    {
      question: "What documents do I need when applying for jobs in Kenya?",
      answer: "Essential documents include: CV/Resume, cover letter, copies of academic certificates, ID copy, testimonials/recommendation letters, and professional certificates if applicable. Some employers may also request a certificate of good conduct and medical certificate."
    },
    {
      question: "Are there remote work opportunities available in Kenya?",
      answer: "Yes! Remote work is growing in Kenya, especially in tech, customer service, content writing, digital marketing, and virtual assistance. Filter jobs by 'Remote' or 'Work from Home' on our platform to find these opportunities."
    },
    {
      question: "How can I find entry-level jobs in Kenya with no experience?",
      answer: "Look for positions marked as 'Entry Level', 'Internship', 'Graduate Trainee', or 'No Experience Required'. Many companies offer training programs for fresh graduates. Consider starting with internships to gain experience and build your network."
    },
    {
      question: "What is the average salary for jobs in Nairobi?",
      answer: "Salaries in Nairobi vary widely by industry and experience level. Entry-level positions typically range from KES 25,000-50,000, mid-level KES 50,000-150,000, and senior positions KES 150,000+. Check individual job listings for specific salary information."
    },
    {
      question: "How do I avoid job scams when looking for employment in Kenya?",
      answer: "Be cautious of jobs requiring upfront payments, promising unrealistic salaries, or conducted entirely via WhatsApp/SMS. Verify company legitimacy, meet employers in person when possible, and never share personal documents before confirming job authenticity. Report suspicious listings to us immediately."
    },
    {
      question: "Can I find part-time and casual jobs in Kenya?",
      answer: "Absolutely! We have numerous part-time, casual, and flexible job opportunities. These include weekend jobs, evening shifts, project-based work, and seasonal employment. Filter by 'Part-Time' or 'Casual' to find these positions."
    },
    {
      question: "How often are new jobs posted on your platform?",
      answer: "We update our job listings daily with new opportunities across all industries and locations in Kenya. Set up job alerts or check back regularly to see the latest postings. We currently have 270+ active job listings and growing."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <HelpCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions About Jobs in Kenya</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about finding employment, salary expectations, and job applications in Kenya
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {jobsFaqData.map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors rounded-lg"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                <ChevronDown 
                  className={`h-5 w-5 text-gray-500 transform transition-transform flex-shrink-0 ${
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

        <div className="text-center">
          <div className="bg-green-50 rounded-xl p-8 border border-green-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Still Have Questions About Jobs in Kenya?</h3>
            <p className="text-gray-600 mb-6">
              Our team is here to help you find the perfect job opportunity in Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white" asChild>
                <Link href="mailto:hr@newkenyan.com">Email Our Job Team</Link>
              </Button>
              <Button className="bg-green-700 hover:bg-green-800 text-white" asChild>
                <Link href="/jobs-in-kenya">Browse All Jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsFAQSection;