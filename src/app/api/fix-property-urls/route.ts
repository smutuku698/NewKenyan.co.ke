import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
        
        // Convert local paths to proper public URLs
        // From: "/propert images/image.webp" 
        // To: "/propert%20images/image.webp" (URL encoded for spaces)
        const publicUrls = localImagePaths.map(path => 
          path.replace('/propert images/', '/propert%20images/')
        );

        // Update property with URL-encoded image paths
        const { error: updateError } = await supabaseAdmin
          .from('property_listings')
          .update({ images: publicUrls })
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
            imagesFixed: publicUrls.length
          });
          updatedCount++;
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
      message: `Fixed image URLs for ${updatedCount} properties`,
      updatedCount,
      totalProperties: properties.length,
      results
    });

  } catch (error) {
    console.error('Fix property URLs error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fix property URLs',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}