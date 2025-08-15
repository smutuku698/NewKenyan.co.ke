import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const authResult = await auth();
    const { userId } = authResult;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin (temporarily allowing all authenticated users for testing)
    const isAdmin = true; // Change this in production
    
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { propertyId, approve } = await request.json();

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
    }

    // Create admin Supabase client - try with anon key first, fallback to service key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // First get current views count
    const { data: currentProperty } = await supabaseAdmin
      .from('property_listings')
      .select('views_count')
      .eq('id', propertyId)
      .single();

    if (currentProperty) {
      const newViewsCount = approve ? (currentProperty.views_count || 0) + 100 : currentProperty.views_count;

      // Update property approval status with view boost
      const { data, error } = await supabaseAdmin
        .from('property_listings')
        .update({ 
          is_approved: approve,
          views_count: newViewsCount
        })
        .eq('id', propertyId)
        .select('property_title, views_count, is_approved')
        .single();

      if (error) {
        console.error('Error updating property:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        property: data,
        message: approve ? 'Property approved and view boost applied' : 'Property approval revoked'
      });
    } else {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}