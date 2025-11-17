import { NextResponse } from 'next/server';
import localJobsData from '../../../local-jobs.json';
import { slugify } from '@/lib/slugify';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour for fresh job listings

function generateJobSlugFromTitle(jobTitle: string): string {
  return slugify(jobTitle);
}

export async function GET() {
  const baseUrl = 'https://newkenyan.com';
  const currentDate = new Date().toISOString();

  // Generate job URLs with proper lastmod dates
  const jobUrls = localJobsData.jobs.map((job) => {
    const slug = generateJobSlugFromTitle(job.job_title);
    // Parse the job date properly
    const jobDate = new Date(job.date);
    const lastmod = isNaN(jobDate.getTime()) ? currentDate : jobDate.toISOString();

    return `
  <url>
    <loc>${baseUrl}/jobs-in-kenya/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Main Jobs Page - High Priority for Google Jobs -->
  <url>
    <loc>${baseUrl}/jobs-in-kenya</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Individual Job Listings - ${localJobsData.total_jobs} jobs total -->
  ${jobUrls}

</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'index, follow',
    },
  });
}
