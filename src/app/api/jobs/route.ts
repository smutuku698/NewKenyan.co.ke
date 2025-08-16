import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Fetch jobs with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'approved';
    const location = searchParams.get('location');
    const industry = searchParams.get('industry');
    const nature = searchParams.get('nature');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let query = supabase
      .from('jobs')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (location && location !== 'all') {
      query = query.eq('job_location', location.toUpperCase());
    }

    if (industry && industry !== 'all') {
      query = query.eq('industry', industry.toUpperCase());
    }

    if (nature && nature !== 'all') {
      query = query.eq('nature_of_job', nature.toUpperCase());
    }

    if (search) {
      query = query.or(
        `job_title.ilike.%${search}%,company_name.ilike.%${search}%,duties_and_responsibilities.ilike.%${search}%`
      );
    }

    const { data: jobs, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch jobs' },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true })
      .eq('status', status);

    if (location && location !== 'all') {
      countQuery = countQuery.eq('job_location', location.toUpperCase());
    }
    if (industry && industry !== 'all') {
      countQuery = countQuery.eq('industry', industry.toUpperCase());
    }
    if (nature && nature !== 'all') {
      countQuery = countQuery.eq('nature_of_job', nature.toUpperCase());
    }
    if (search) {
      countQuery = countQuery.or(
        `job_title.ilike.%${search}%,company_name.ilike.%${search}%,duties_and_responsibilities.ilike.%${search}%`
      );
    }

    const { count } = await countQuery;

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new job posting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      job_title,
      nature_of_job,
      industry,
      salary,
      job_location,
      duties_and_responsibilities,
      key_requirements_skills_qualification,
      how_to_apply,
      company_name,
      contact_email,
      contact_phone,
      payment_reference,
      payment_amount,
      user_id
    } = body;

    // Validate required fields
    const requiredFields = [
      'job_title', 'nature_of_job', 'industry', 'salary', 'job_location',
      'duties_and_responsibilities', 'key_requirements_skills_qualification',
      'how_to_apply', 'company_name', 'contact_email'
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact_email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Set payment status based on payment reference
    const payment_status = payment_reference ? 'completed' : 'pending';
    const payment_verified = !!payment_reference;

    const { data: job, error } = await supabase
      .from('jobs')
      .insert([{
        job_title,
        nature_of_job: nature_of_job.toUpperCase(),
        industry: industry.toUpperCase(),
        salary,
        job_location: job_location.toUpperCase(),
        duties_and_responsibilities,
        key_requirements_skills_qualification,
        how_to_apply,
        company_name,
        contact_email,
        contact_phone,
        payment_reference,
        payment_amount: payment_amount || 'KES 300',
        payment_status,
        payment_verified,
        status: payment_verified ? 'pending' : 'draft', // Only pending if payment is verified
        user_id
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create job posting' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
      message: 'Job posting created successfully'
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}