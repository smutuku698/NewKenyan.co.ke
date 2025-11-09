/**
 * Dynamic Open Graph Image Utility
 *
 * Intelligently selects OG images based on page content:
 * 1. Uses first image from property/blog/business if available
 * 2. Falls back to default site OG image
 * 3. Provides proper dimensions and alt text for SEO
 */

export interface DynamicOGImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

const DEFAULT_OG_IMAGE = 'https://newkenyan.com/og-image.jpg';
const DEFAULT_OG_WIDTH = 1200;
const DEFAULT_OG_HEIGHT = 630;

/**
 * Get OG image from content images or fallback to default
 */
export function getDynamicOGImage(
  contentImages?: string[] | null,
  title?: string,
  fallbackAlt?: string
): DynamicOGImage {
  // If content has images, use the first one
  if (contentImages && contentImages.length > 0) {
    const firstImage = contentImages[0];

    return {
      url: firstImage,
      width: DEFAULT_OG_WIDTH,
      height: DEFAULT_OG_HEIGHT,
      alt: title || fallbackAlt || 'Property image from NewKenyan.com'
    };
  }

  // Fallback to default OG image
  return {
    url: DEFAULT_OG_IMAGE,
    width: DEFAULT_OG_WIDTH,
    height: DEFAULT_OG_HEIGHT,
    alt: fallbackAlt || 'NewKenyan.com - Kenya\'s Premier Opportunity Platform'
  };
}

/**
 * Get multiple OG images (for property galleries, etc.)
 */
export function getDynamicOGImages(
  contentImages?: string[] | null,
  title?: string,
  maxImages: number = 4
): DynamicOGImage[] {
  if (!contentImages || contentImages.length === 0) {
    return [getDynamicOGImage(null, title)];
  }

  return contentImages.slice(0, maxImages).map((image, index) => ({
    url: image,
    width: DEFAULT_OG_WIDTH,
    height: DEFAULT_OG_HEIGHT,
    alt: `${title || 'Property'} - Image ${index + 1}`
  }));
}

/**
 * Generate Twitter card image metadata
 */
export function getTwitterCardImage(
  contentImages?: string[] | null,
  title?: string
): string {
  const ogImage = getDynamicOGImage(contentImages, title);
  return ogImage.url;
}

/**
 * Extract first image from various content types
 */
export function extractFirstImage(content: {
  images?: string[] | null;
  image?: string | null;
  thumbnail?: string | null;
  cover_image?: string | null;
  featured_image?: string | null;
}): string | null {
  // Check all possible image fields
  if (content.images && content.images.length > 0) {
    return content.images[0];
  }

  if (content.featured_image) {
    return content.featured_image;
  }

  if (content.cover_image) {
    return content.cover_image;
  }

  if (content.thumbnail) {
    return content.thumbnail;
  }

  if (content.image) {
    return content.image;
  }

  return null;
}

/**
 * Helper to get OG image for property listings
 */
export function getPropertyOGImage(property: {
  images?: string[] | null;
  property_title?: string;
  city?: string;
}): DynamicOGImage {
  const title = property.property_title
    ? `${property.property_title}${property.city ? ` in ${property.city}` : ''}`
    : undefined;

  return getDynamicOGImage(property.images, title);
}

/**
 * Helper to get OG image for blog posts
 */
export function getBlogOGImage(post: {
  featured_image?: string | null;
  cover_image?: string | null;
  images?: string[] | null;
  title?: string;
}): DynamicOGImage {
  const firstImage = extractFirstImage(post);
  return getDynamicOGImage(firstImage ? [firstImage] : null, post.title);
}

/**
 * Helper to get OG image for business listings
 */
export function getBusinessOGImage(business: {
  logo?: string | null;
  images?: string[] | null;
  cover_image?: string | null;
  company_name?: string;
}): DynamicOGImage {
  const firstImage = extractFirstImage({
    ...business,
    image: business.logo
  });

  return getDynamicOGImage(
    firstImage ? [firstImage] : null,
    business.company_name
  );
}

/**
 * Generate complete OpenGraph metadata object
 */
export function generateOpenGraphMetadata(params: {
  title: string;
  description: string;
  url: string;
  images?: string[] | null;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
}): {
  title: string;
  description: string;
  url: string;
  siteName: string;
  type: string;
  locale: string;
  images: DynamicOGImage[];
} {
  const ogImages = getDynamicOGImages(params.images, params.title);

  return {
    title: params.title,
    description: params.description,
    url: params.url,
    siteName: params.siteName || 'NewKenyan.com',
    type: params.type || 'website',
    locale: 'en_KE',
    images: ogImages
  };
}

/**
 * Generate complete Twitter card metadata
 */
export function generateTwitterMetadata(params: {
  title: string;
  description: string;
  images?: string[] | null;
  creator?: string;
}): {
  card: 'summary_large_image';
  title: string;
  description: string;
  images: string[];
  site: string;
  creator: string;
} {
  const twitterImage = getTwitterCardImage(params.images, params.title);

  return {
    card: 'summary_large_image',
    title: params.title,
    description: params.description,
    images: [twitterImage],
    site: '@newkenyan',
    creator: params.creator || '@newkenyan'
  };
}
