import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';

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
    
    if (!files.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadPromises = files.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}-${index}.${fileExt}`;
      
      const { error } = await supabaseAdmin.storage
        .from('property-images')
        .upload(fileName, file);

      if (error) {
        console.error('Storage upload error:', error);
        return null;
      }

      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('property-images')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    const results = await Promise.all(uploadPromises);
    const uploadedUrls = results.filter(url => url !== null);

    return NextResponse.json({ 
      success: true, 
      urls: uploadedUrls 
    });

  } catch (error) {
    console.error('Image upload API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}