import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      companyName,
      companyType,
      description,
      address,
      city,
      phone,
      email,
      website,
      whatsapp,
      services,
      specializations,
      yearEstablished,
      employeeCount,
      googleMapsLink,
      logo,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      instagramUrl,
    } = body;

    // Validate required fields
    if (!companyName || !companyType || !description || !address || !city || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one service' },
        { status: 400 }
      );
    }

    if (!specializations || specializations.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one specialization' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data, error } = await supabase
      .from('real_estate_companies')
      .insert([
        {
          company_name: companyName,
          company_type: companyType,
          description: description,
          address: address,
          city: city,
          phone: phone,
          email: email,
          website: website || null,
          whatsapp_number: whatsapp || phone,
          services: services,
          specializations: specializations,
          year_established: yearEstablished ? parseInt(yearEstablished) : null,
          employee_count: employeeCount ? parseInt(employeeCount) : null,
          google_maps_link: googleMapsLink || null,
          logo: logo || null,
          social_media: {
            facebook: facebookUrl || null,
            twitter: twitterUrl || null,
            linkedin: linkedinUrl || null,
            instagram: instagramUrl || null,
          },
          is_approved: false, // Requires admin approval
          is_verified: false,
          rating: 0,
          review_count: 0,
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit company listing' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Company submitted successfully and is pending approval',
        data: data[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch approved companies from database
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('real_estate_companies')
      .select('*')
      .eq('is_approved', true)
      .order('rating', { ascending: false })
      .order('review_count', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch companies' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      companies: data || [],
      total: data?.length || 0,
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
