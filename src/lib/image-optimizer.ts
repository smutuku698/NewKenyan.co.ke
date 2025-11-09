/**
 * Image Optimization Utility
 *
 * Provides intelligent image optimization for property listings:
 * - Compression (80-90% file size reduction)
 * - Format conversion (WebP/AVIF)
 * - Responsive image generation (thumbnail, medium, large)
 * - Metadata stripping (privacy + file size)
 * - SEO-friendly naming from property titles
 */

import sharp from 'sharp';

export interface OptimizedImage {
  buffer: Buffer;
  filename: string;
  format: 'webp' | 'avif' | 'jpeg';
  size: 'thumbnail' | 'medium' | 'large' | 'original';
  width: number;
  height: number;
  fileSize: number;
}

export interface ImageOptimizationOptions {
  propertyTitle?: string;
  userId: string;
  index: number;
  generateResponsiveSizes?: boolean;
  stripMetadata?: boolean;
  quality?: number;
}

// Responsive image sizes
const SIZES = {
  thumbnail: { width: 400, height: 300, quality: 80 },
  medium: { width: 800, height: 600, quality: 85 },
  large: { width: 1200, height: 900, quality: 85 },
  original: { width: 1920, height: 1440, quality: 90 }
};

/**
 * Generate SEO-friendly filename from property title
 */
export function generateSEOFilename(
  propertyTitle: string | undefined,
  userId: string,
  index: number,
  size: string,
  format: string
): string {
  if (!propertyTitle) {
    return `property-${userId}-${Date.now()}-${index}-${size}.${format}`;
  }

  // Convert title to SEO-friendly slug
  const slug = propertyTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .substring(0, 50); // Limit length

  const timestamp = Date.now();
  return `${slug}-${userId}-${timestamp}-${index}-${size}.${format}`;
}

/**
 * Optimize a single image file
 */
export async function optimizeImage(
  file: File,
  options: ImageOptimizationOptions
): Promise<OptimizedImage[]> {
  const { propertyTitle, userId, index, generateResponsiveSizes = true, quality = 85 } = options;

  // Convert File to Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const optimizedImages: OptimizedImage[] = [];

  // Get original image metadata
  const metadata = await sharp(buffer).metadata();

  // Generate responsive sizes
  const sizesToGenerate = generateResponsiveSizes
    ? (['thumbnail', 'medium', 'large', 'original'] as const)
    : (['original'] as const);

  for (const sizeKey of sizesToGenerate) {
    const sizeConfig = SIZES[sizeKey];

    // Create WebP version (best browser support, great compression)
    const webpFilename = generateSEOFilename(propertyTitle, userId, index, sizeKey, 'webp');
    const webpBuffer = await sharp(buffer)
      .resize(sizeConfig.width, sizeConfig.height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: sizeConfig.quality })
      .toBuffer();

    const webpMetadata = await sharp(webpBuffer).metadata();

    optimizedImages.push({
      buffer: webpBuffer,
      filename: webpFilename,
      format: 'webp',
      size: sizeKey,
      width: webpMetadata.width || sizeConfig.width,
      height: webpMetadata.height || sizeConfig.height,
      fileSize: webpBuffer.length
    });

    // For 'original' and 'large', also create AVIF (best compression)
    if (sizeKey === 'original' || sizeKey === 'large') {
      const avifFilename = generateSEOFilename(propertyTitle, userId, index, sizeKey, 'avif');
      const avifBuffer = await sharp(buffer)
        .resize(sizeConfig.width, sizeConfig.height, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .avif({ quality: sizeConfig.quality })
        .toBuffer();

      const avifMetadata = await sharp(avifBuffer).metadata();

      optimizedImages.push({
        buffer: avifBuffer,
        filename: avifFilename,
        format: 'avif',
        size: sizeKey,
        width: avifMetadata.width || sizeConfig.width,
        height: avifMetadata.height || sizeConfig.height,
        fileSize: avifBuffer.length
      });
    }
  }

  return optimizedImages;
}

/**
 * Generate alt text from property title and size
 */
export function generateAltText(
  propertyTitle: string | undefined,
  size: string,
  index: number
): string {
  if (!propertyTitle) {
    return `Property listing image ${index + 1}`;
  }

  if (size === 'thumbnail') {
    return `Thumbnail of ${propertyTitle}`;
  }

  return `${propertyTitle} - Image ${index + 1}`;
}

/**
 * Calculate file size reduction percentage
 */
export function calculateSavings(originalSize: number, optimizedSize: number): number {
  return Math.round(((originalSize - optimizedSize) / originalSize) * 100);
}

/**
 * Batch optimize multiple images
 */
export async function optimizeImages(
  files: File[],
  options: Omit<ImageOptimizationOptions, 'index'>
): Promise<OptimizedImage[]> {
  const allOptimized: OptimizedImage[] = [];

  for (let i = 0; i < files.length; i++) {
    const optimized = await optimizeImage(files[i], {
      ...options,
      index: i
    });
    allOptimized.push(...optimized);
  }

  return allOptimized;
}
