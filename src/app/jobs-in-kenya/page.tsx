import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import jobsData from '@/data/jobs.json';

export default function JobsInKenyaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Jobs in Kenya</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore career opportunities with Kenya&apos;s top companies and startups
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobsData.jobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Post a Job Opening</h3>
              <p className="text-gray-600 mb-6">
                Reach thousands of qualified Kenyan professionals looking for their next opportunity.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-3 rounded-md">
                Post Job Now
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}