export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function generateJobSlug(jobTitle: string, jobLocation: string, jobId: number): string {
  const titleSlug = slugify(jobTitle);
  const locationSlug = slugify(jobLocation);
  return `${titleSlug}-${locationSlug}-${jobId}`;
}