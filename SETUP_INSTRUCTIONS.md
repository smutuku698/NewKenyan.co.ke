# Business Listing Platform Setup Instructions

## 1. ✅ Completed Steps
- [x] Clerk API keys added to .env.local
- [x] Supabase credentials configured
- [x] Dependencies installed

## 2. 🔧 Remaining Setup Steps

### A. Create Supabase Storage Bucket
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Navigate to your project: `gsdctfcfkrtuxnwapjcj`
3. Go to **Storage** in the left sidebar
4. Click **Create Bucket**
5. Name it: `business-images`
6. Make it **Public** (so images can be displayed)
7. Click **Create bucket**

### B. Run Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase_schema.sql` file
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema
5. This will create all tables, policies, and sample data

### C. Test the Application
1. Run `npm run dev` to start the development server
2. Go to http://localhost:3000
3. Test user registration and login
4. Try submitting a business listing
5. Check admin dashboard at http://localhost:3000/admin

## 3. 🎯 Key Features Ready
- User registration/login with Clerk
- Business listing submission form
- Admin approval system (your email: spartasimon51@gmail.com)
- Rating & review system
- Search and filtering
- Working call/WhatsApp buttons

## 4. 📝 Admin Access
- Admin email: `spartasimon51@gmail.com`
- Admin dashboard: `/admin`
- Can approve/reject pending listings

## 5. 🔒 Security Features
- Input sanitization with DOMPurify
- Form validation with Zod
- Row Level Security policies
- Image upload restrictions (5MB, JPG/PNG/WebP)

Your business listing platform is ready to use once you complete steps A and B above!

## 6. 💰 Customizing M-Pesa Listing Costs

You can easily change the pricing for job, property, and business listings by modifying the following files:

### Main Pricing Configuration
**File:** `src/components/PaymentModal.tsx` (Lines 28-47)
```javascript
const PRICING = {
  job: { 
    amount: 100,           // Anniversary price in KES
    originalAmount: 2000,  // Original price shown for comparison
    label: 'Job Listing', 
    description: 'Get CVs delivered to your email' 
  },
  property: { 
    amount: 100,           // Anniversary price in KES
    originalAmount: 5000,  // Original price shown for comparison
    label: 'Property Listing', 
    description: 'Reach thousands of potential tenants/buyers' 
  },
  business: { 
    amount: 100,           // Anniversary price in KES
    originalAmount: 3000,  // Original price shown for comparison
    label: 'Business Listing', 
    description: 'Boost your business visibility' 
  }
};
```

### Job Posting Page
**File:** `src/app/jobs-in-kenya/post/page.tsx`
- Line 157: `payment_amount: 'KES 300',` (change to match your pricing)
- Line 195: Payment confirmation text showing "KES 300"
- Line 367: Pricing display showing "KES 300"
- Line 634: Button text showing "Pay KES 100"

### API Route
**File:** `src/app/api/jobs/route.ts`
- Line 166: `payment_amount: payment_amount || 'KES 300',` (default fallback)

### Database Schema
**File:** `jobs_schema.sql`
- Line 27: `payment_amount VARCHAR(20) DEFAULT 'KES 300',` (database default)

### Admin Dashboard Revenue Calculation
**File:** `src/components/AdminDashboard.tsx`
- Line 384: `totalRevenue: jobListings.filter(l => l.payment_verified).length * 300,` (change 300 to match your job pricing)

### Anniversary Banner (Homepage)
**File:** `src/app/page.tsx`
- Line 74: Anniversary pricing text and amounts

### Form Components
**Files:** `src/components/AddListingForm.tsx`, `src/components/AddPropertyForm.tsx`
- Search for "Anniversary Special" text and pricing amounts

### To Change Pricing:
1. **Update main pricing** in `PaymentModal.tsx` 
2. **Update job-specific prices** in `jobs-in-kenya/post/page.tsx`
3. **Update API defaults** in `api/jobs/route.ts`
4. **Update admin calculations** in `AdminDashboard.tsx`
5. **Update marketing text** in homepage and form components
6. **Update database schema** if creating new tables

**Note:** The current setup shows "Anniversary Special" pricing of KES 100 for all listings, down from original prices of KES 2000-5000. Remove anniversary messaging and adjust prices as needed for regular operations.