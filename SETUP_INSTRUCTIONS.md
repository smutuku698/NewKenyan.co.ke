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