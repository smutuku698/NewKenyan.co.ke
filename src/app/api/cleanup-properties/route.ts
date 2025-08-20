import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    console.log('🧹 Starting property cleanup...');

    // First, find properties without images or with sample/placeholder images
    const { data: propertiesToDelete, error: fetchError } = await supabase
      .from('property_listings')
      .select('id, property_title, images')
      .or('images.is.null,images.eq.{},images.eq.{""},images.like.%sample%,images.like.%placeholder%,images.like.%test%');

    if (fetchError) {
      console.error('Error fetching properties to delete:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }

    if (!propertiesToDelete || propertiesToDelete.length === 0) {
      return NextResponse.json({ 
        message: 'No properties without images found to delete',
        deletedCount: 0 
      });
    }

    console.log(`Found ${propertiesToDelete.length} properties without valid images:`, 
      propertiesToDelete.map(p => ({ id: p.id, title: p.property_title, images: p.images })));

    // Delete properties without images
    const propertyIds = propertiesToDelete.map(p => p.id);
    
    const { error: deleteError } = await supabase
      .from('property_listings')
      .delete()
      .in('id', propertyIds);

    if (deleteError) {
      console.error('Error deleting properties:', deleteError);
      return NextResponse.json({ error: 'Failed to delete properties' }, { status: 500 });
    }

    console.log(`✅ Successfully deleted ${propertiesToDelete.length} properties without images`);

    return NextResponse.json({
      message: `Successfully deleted ${propertiesToDelete.length} properties without images`,
      deletedCount: propertiesToDelete.length,
      deletedProperties: propertiesToDelete.map(p => ({
        id: p.id,
        title: p.property_title,
        images: p.images
      }))
    });

  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during cleanup' 
    }, { status: 500 });
  }
}

// Also provide a GET route to preview what would be deleted
export async function GET() {
  try {
    const { data: properties, error } = await supabase
      .from('property_listings')
      .select('id, property_title, images, created_at')
      .or('images.is.null,images.eq.{},images.eq.{""},images.like.%sample%,images.like.%placeholder%,images.like.%test%');

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }

    return NextResponse.json({
      message: `Found ${properties?.length || 0} properties without valid images`,
      count: properties?.length || 0,
      properties: properties?.map(p => ({
        id: p.id,
        title: p.property_title,
        images: p.images,
        created_at: p.created_at
      })) || []
    });

  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json({ 
      error: 'Internal server error during preview' 
    }, { status: 500 });
  }
}