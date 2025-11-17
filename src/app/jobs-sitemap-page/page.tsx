import jobsData from '@/data/jobs.json'
import Link from 'next/link'
import { generateJobSlug } from '@/lib/utils'

export default function JobsSitemapPage() {
  // Group jobs by month
  const jobsByMonth = jobsData.jobs.reduce((acc, job) => {
    const date = new Date(job.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

    if (!acc[monthKey]) {
      acc[monthKey] = {
        label: monthLabel,
        jobs: []
      }
    }

    acc[monthKey].jobs.push(job)
    return acc
  }, {} as Record<string, { label: string; jobs: typeof jobsData.jobs }>)

  // Sort months in descending order (newest first)
  const sortedMonths = Object.entries(jobsByMonth).sort((a, b) => b[0].localeCompare(a[0]))

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Jobs Sitemap</h1>
          <p className="text-gray-600 mb-8">
            Browse all {jobsData.jobs.length.toLocaleString()} job listings on NewKenyan.com
          </p>

          {/* Back to main sitemap */}
          <div className="mb-6">
            <Link
              href="/sitemap-page"
              className="text-green-600 hover:text-green-700 hover:underline"
            >
              &larr; Back to main sitemap
            </Link>
          </div>

          {/* Jobs by Month */}
          <div className="space-y-8">
            {sortedMonths.map(([monthKey, { label, jobs }]) => (
              <section key={monthKey} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  {label} ({jobs.length} jobs)
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {jobs.map((job, index) => {
                    const slug = generateJobSlug(job.job_title, 'NewKenyan', job.job_location)
                    return (
                      <li key={`${slug}-${index}`} className="border-b border-gray-100 pb-3">
                        <Link
                          href={`/jobs-in-kenya/${slug}`}
                          className="block hover:bg-gray-50 p-2 rounded transition-colors"
                        >
                          <h3 className="text-green-600 hover:text-green-700 font-medium">
                            {job.job_title}
                          </h3>
                          {job.job_location && (
                            <p className="text-sm text-gray-500 mt-1">
                              {job.job_location}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            Posted: {new Date(job.date).toLocaleDateString()}
                          </p>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>

          {/* XML Sitemap Link */}
          <section className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">XML Sitemap</h2>
            <p className="text-gray-600 mb-4">
              For search engines and developers
            </p>
            <a
              href="/jobs-sitemap.xml"
              className="text-green-600 hover:text-green-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jobs Sitemap (XML)
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}
