import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Create admin Supabase client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get all properties with local image paths
    const { data: properties, error: fetchError } = await supabaseAdmin
      .from('property_listings')
      .select('*')
      .like('images', '%/propert images/%');

    if (fetchError) {
      throw new Error(`Failed to fetch properties: ${fetchError.message}`);
    }

    if (!properties || properties.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No properties found with local image paths'
      });
    }

    let updatedCount = 0;
    const results = [];

    for (const property of properties) {
      try {
        const localImagePaths = property.images as string[];
        const uploadedUrls: string[] = [];

        // Upload each image to Supabase storage
        for (const [index, imagePath] of localImagePaths.entries()) {
          try {
            // Convert local path to actual file path
            const fileName = imagePath.replace('/propert images/', '');
            const localFilePath = join(process.cwd(), 'public', 'propert images', fileName);
            
            // Read the file
            const imageBuffer = await readFile(localFilePath);
            
            // Generate unique filename for Supabase
            const fileExt = fileName.split('.').pop();
            const uniqueFileName = `property-${property.id}-${index}-${Date.now()}.${fileExt}`;
            
            // Upload to Supabase storage
            const { error: uploadError } = await supabaseAdmin.storage
              .from('property-images')
              .upload(uniqueFileName, imageBuffer, {
                contentType: `image/${fileExt}`,
                upsert: false
              });

            if (uploadError) {
              console.error(`Failed to upload ${fileName}:`, uploadError);
              continue;
            }

            // Get public URL
            const { data: { publicUrl } } = supabaseAdmin.storage
              .from('property-images')
              .getPublicUrl(uniqueFileName);

            uploadedUrls.push(publicUrl);
            
          } catch (error) {
            console.error(`Error processing image ${imagePath}:`, error);
            continue;
          }
        }

        // Update property with new image URLs
        if (uploadedUrls.length > 0) {
          const { error: updateError } = await supabaseAdmin
            .from('property_listings')
            .update({ images: uploadedUrls })
            .eq('id', property.id);

          if (updateError) {
            results.push({ 
              success: false, 
              property: property.property_title, 
              error: updateError.message 
            });
          } else {
            results.push({ 
              success: true, 
              property: property.property_title,
              imagesUploaded: uploadedUrls.length
            });
            updatedCount++;
          }
        } else {
          results.push({ 
            success: false, 
            property: property.property_title, 
            error: 'No images were successfully uploaded' 
          });
        }

      } catch (error) {
        results.push({ 
          success: false, 
          property: property.property_title, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedCount} properties with uploaded images`,
      updatedCount,
      totalProperties: properties.length,
      results
    });

  } catch (error) {
    console.error('Fix property images error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fix property images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}