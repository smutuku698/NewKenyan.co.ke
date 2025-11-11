import { NextResponse } from 'next/server';
import localJobsData from '../../../local-jobs.json';
import { slugify } from '@/lib/slugify';

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

function generateJobSlugFromTitle(jobTitle: string): string {
  return slugify(jobTitle);
}

export async function GET() {
  const baseUrl = 'https://newkenyan.com';

  // Generate job URLs
  const jobUrls = localJobsData.jobs.map((job) => {
    const slug = generateJobSlugFromTitle(job.job_title);
    const lastmod = new Date(job.date).toISOString();

    return `
  <url>
    <loc>${baseUrl}/jobs-in-kenya/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Main Jobs Page -->
  <url>
    <loc>${baseUrl}/jobs-in-kenya</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Individual Job Listings -->
  ${jobUrls}

</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
