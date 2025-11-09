import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { optimizeImages, calculateSavings } from '@/lib/image-optimizer';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = user.id;

    // Create admin Supabase client with service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const propertyTitle = formData.get('propertyTitle') as string | null;

    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    console.log(`📸 Optimizing ${files.length} images for property: ${propertyTitle || 'Untitled'}`);

    // Calculate original total size
    const originalTotalSize = files.reduce((sum, file) => sum + file.size, 0);

    // Optimize all images (generates WebP + AVIF in multiple sizes)
    const optimizedImages = await optimizeImages(files, {
      propertyTitle: propertyTitle || undefined,
      userId,
      generateResponsiveSizes: true,
      stripMetadata: true,
      quality: 85
    });

    console.log(`✅ Generated ${optimizedImages.length} optimized versions`);

    // Upload all optimized versions to Supabase
    const uploadPromises = optimizedImages.map(async (img) => {
      const { error } = await supabaseAdmin.storage
        .from('property-images')
        .upload(img.filename, img.buffer, {
          contentType: `image/${img.format}`,
          cacheControl: '31536000', // 1 year cache
          upsert: false
        });

      if (error) {
        console.error(`Storage upload error for ${img.filename}:`, error);
        return null;
      }

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('property-images')
        .getPublicUrl(img.filename);

      return {
        url: publicUrl,
        filename: img.filename,
        format: img.format,
        size: img.size,
        width: img.width,
        height: img.height,
        fileSize: img.fileSize
      };
    });

    const results = await Promise.all(uploadPromises);
    const uploadedImages = results.filter(img => img !== null);

    // Calculate total optimized size
    const optimizedTotalSize = optimizedImages.reduce((sum, img) => sum + img.fileSize, 0);
    const savings = calculateSavings(originalTotalSize, optimizedTotalSize);

    console.log(`💾 File size reduced by ${savings}% (${(originalTotalSize / 1024 / 1024).toFixed(2)}MB → ${(optimizedTotalSize / 1024 / 1024).toFixed(2)}MB)`);

    // Group URLs by size for easy access
    const urlsBySize = {
      thumbnail: uploadedImages.filter(img => img.size === 'thumbnail').map(img => img.url),
      medium: uploadedImages.filter(img => img.size === 'medium').map(img => img.url),
      large: uploadedImages.filter(img => img.size === 'large').map(img => img.url),
      original: uploadedImages.filter(img => img.size === 'original').map(img => img.url)
    };

    return NextResponse.json({
      success: true,
      urls: urlsBySize.original, // Return original size URLs for backward compatibility
      urlsBySize, // Provide all sizes for responsive images
      images: uploadedImages,
      stats: {
        originalSize: originalTotalSize,
        optimizedSize: optimizedTotalSize,
        savings: `${savings}%`,
        totalImages: uploadedImages.length
      }
    });

  } catch (error) {
    console.error('Image upload API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}