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

## 7. 🚀 SEO & Ranking Strategy - NEXT STEPS

### A. 🎯 Additional Important Pages to Create

#### Location-Specific Content Pages
1. **City Guides** (`/city-guides/[city]`)
   - "Living in Nairobi Guide" - neighborhoods, cost of living, transportation
   - "Mombasa Business Directory" - local market insights, opportunities
   - "Kisumu Real Estate Market" - property trends, investment advice

2. **Industry-Specific Pages** (`/industries/[industry]`)
   - `/industries/hospitality-jobs-kenya` - hotels, restaurants, tourism
   - `/industries/tech-jobs-nairobi` - IT, software, digital marketing
   - `/industries/manufacturing-jobs-kenya` - factories, production, logistics
   - `/industries/healthcare-jobs-kenya` - hospitals, clinics, medical

3. **Property Type Pages** (`/property-types/[type]`)
   - `/property-types/apartments-for-rent-nairobi`
   - `/property-types/commercial-office-space-nairobi`
   - `/property-types/land-for-sale-kenya`
   - `/property-types/student-accommodation-nairobi`

4. **Service Category Pages** (`/services/[category]`)
   - `/services/construction-companies-kenya`
   - `/services/digital-marketing-agencies-nairobi`
   - `/services/logistics-companies-mombasa`
   - `/services/financial-services-kenya`

### B. 📊 Content Strategy for Top Rankings

#### High-Impact Blog Topics (Target: 2-3 posts/week)
1. **Market Analysis Content**
   - "Kenya Property Market Report 2024/2025"
   - "Best Neighborhoods for Rent in Nairobi - Price Comparison"
   - "Top Growing Industries in Kenya for Job Seekers"
   - "Small Business Opportunities in Kenyan Counties"

2. **How-To Guides**
   - "How to Find Affordable Houses for Rent in Nairobi"
   - "Complete Guide to Starting a Business in Kenya"
   - "Property Investment Guide for Kenyan Diaspora"
   - "Job Interview Tips for Kenyan Companies"

3. **Local SEO Content**
   - "Best Places to Live in [City Name] - Complete Guide"
   - "Top Employers in [City Name] - Job Opportunities"
   - "[City Name] Real Estate Market Trends"
   - "Starting a Business in [City Name] - Complete Guide"

### C. 🔧 Technical SEO Improvements Needed

#### Priority 1 (Next 2 weeks)
1. **Google My Business**
   - Create GMB listing for NewKenyan.com
   - Add Nairobi location, hours, photos
   - Start collecting reviews

2. **Core Web Vitals Monitoring**
   - Install Google PageSpeed insights tracking
   - Monitor LCP, FID, CLS scores monthly
   - Target: All pages <2.5s load time

3. **Schema Markup Expansion**
   - Add FAQ schema to help pages
   - Property listing schema for each property
   - Job posting schema for job listings
   - Review schema for business listings

#### Priority 2 (Next month)
1. **Link Building Strategy**
   - Partner with Kenyan business associations
   - Guest posting on Kenyan blogs/news sites
   - Directory submissions (Kenya Association of Manufacturers, etc.)
   - Social media profile optimization

2. **Content Hubs**
   - Create comprehensive resource pages
   - Industry reports and white papers
   - Downloadable guides (PDF lead magnets)

### D. 📈 Ranking Targets & Metrics

#### Primary Keywords (Target: Top 5 in 6 months)
- "houses for rent nairobi" (7,200/month)
- "jobs in kenya" (12,000/month)
- "business directory kenya" (2,400/month)
- "apartments for sale nairobi" (3,600/month)

#### Secondary Keywords (Target: Top 10 in 3 months)
- "properties for rent mombasa"
- "office space nairobi"
- "kenya job opportunities"
- "commercial property kenya"

#### Long-tail Keywords (Target: Top 3 in 2 months)
- "affordable houses for rent in nairobi under 20000"
- "tech jobs in nairobi for fresh graduates"
- "best business opportunities in kenya 2024"

### E. 🛠 Implementation Checklist

#### Week 1-2
- [ ] Set up Google My Business
- [ ] Install Google Analytics 4 goals tracking
- [ ] Create content calendar for blog posts
- [ ] Build 5 industry-specific landing pages

#### Month 1
- [ ] Publish 8-10 high-quality blog posts
- [ ] Create 10 city guide pages
- [ ] Submit to 20 Kenyan business directories
- [ ] Start email newsletter for property/job alerts

#### Month 2-3
- [ ] Build 20+ quality backlinks from Kenyan sites
- [ ] Create video content for YouTube SEO
- [ ] Optimize for voice search ("Ok Google, find houses for rent in Nairobi")
- [ ] Launch referral program for user-generated content

### F. 💡 Competitive Advantage Strategies

1. **Real-time Market Data**
   - Property price trends by neighborhood
   - Job market salary insights
   - Business performance metrics

2. **Community Features**
   - User reviews and ratings
   - Success stories and testimonials
   - Neighborhood insights from residents

3. **Mobile-first Experience**
   - Progressive Web App (PWA) features
   - Offline property browsing
   - Push notifications for new listings

4. **Local Partnerships**
   - Real estate agencies integration
   - HR company partnerships
   - Business chamber memberships

### G. 🎯 Success Metrics (6-month targets)

- **Organic Traffic**: 50,000+ monthly visitors
- **Keyword Rankings**: 100+ keywords in top 10
- **Local Pack Rankings**: Top 3 for major city searches
- **Conversion Rate**: 5%+ (inquiries/visits)
- **Page Load Speed**: <2 seconds average
- **Mobile Core Web Vitals**: All green scores

**Budget Allocation Recommendation:**
- Content Creation: 40%
- Link Building: 30% 
- Technical SEO: 20%
- Tools & Analytics: 10%