import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 Property approval API called');

    // Check if user is authenticated
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;
    console.log('👤 User ID:', userId);

    if (!userId) {
      console.log('❌ No user ID - unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin (temporarily allowing all authenticated users for testing)
    const isAdmin = true; // Change this in production
    console.log('👑 Admin check:', isAdmin);

    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { propertyId, approve } = body;
    console.log('📝 Request body:', { propertyId, approve });

    if (!propertyId) {
      console.log('❌ No property ID provided');
      return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
    }

    // Create admin Supabase client - try with service key first
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log('🔑 Has service role key:', hasServiceKey);
    
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    console.log('🔧 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('🔧 Using service key:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);

    // First get current views count
    console.log('🔍 Fetching property:', propertyId);
    const { data: currentProperty, error: fetchError } = await supabaseAdmin
      .from('property_listings')
      .select('views_count')
      .eq('id', propertyId)
      .single();

    console.log('📊 Current property data:', currentProperty);
    console.log('❗ Fetch error:', fetchError);

    if (currentProperty) {
      const newViewsCount = approve ? (currentProperty.views_count || 0) + 100 : currentProperty.views_count;
      console.log('📈 New views count:', newViewsCount);

      // Update property approval status with view boost
      console.log('💾 Updating property...');
      const { data, error } = await supabaseAdmin
        .from('property_listings')
        .update({ 
          is_approved: approve,
          views_count: newViewsCount
        })
        .eq('id', propertyId)
        .select('property_title, views_count, is_approved')
        .single();

      console.log('✅ Update result:', data);
      console.log('❗ Update error:', error);

      if (error) {
        console.error('💥 Error updating property:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log('🎉 Property approval successful');
      return NextResponse.json({ 
        success: true, 
        property: data,
        message: approve ? 'Property approved and view boost applied' : 'Property approval revoked'
      });
    } else {
      console.log('❌ Property not found');
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}