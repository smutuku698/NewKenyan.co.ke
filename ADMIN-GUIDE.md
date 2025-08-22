# Clerk + Supabase Integration Guide

## Quick Reference for Future Projects

### 1. Middleware Setup
- **Location**: Move `middleware.ts` to `src/middleware.ts` (required by Clerk)
- **Content**: 
```ts
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();
export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
```

### 2. API Routes Authentication
- Always use `auth()` from `@clerk/nextjs/server` in API routes
- Check `userId` exists before proceeding
```ts
const authResult = await auth();
const { userId } = authResult;
if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

### 3. Supabase Storage + File Uploads
- **Problem**: Direct client uploads fail with RLS errors even in public buckets
- **Solution**: Create API endpoint using service role key

**File Upload API Pattern** (`/api/upload-images/route.ts`):
```ts
import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

**Client Side**:
```ts
const uploadImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const response = await fetch('/api/upload-images', {
    method: 'POST',
    body: formData,
  });
  
  const result = await response.json();
  return result.success ? result.urls : [];
};
```

### 4. Form Validation & UX
- Use Zod for validation with proper error handling
- Add character counters for required fields:
```tsx
<p className={`text-xs ${length < minimum ? 'text-red-500' : 'text-gray-500'}`}>
  {length}/{max} characters (minimum {minimum})
</p>
```

### 5. Next.js Image Configuration
- Configure remote patterns for Supabase images:
```ts
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-project.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
},
```
- Always add `sizes` prop to avoid warnings

### 6. Supabase Storage Setup
- Create public buckets for file uploads
- Set bucket policies if RLS needed:
  - INSERT: `(bucket_id = 'bucket-name'::text) AND (auth.uid() IS NOT NULL)`
  - SELECT: `bucket_id = 'bucket-name'::text`
- For Clerk + Supabase: Use service role key in API routes instead of client RLS

### 7. Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### 8. Key Architectural Decisions
- **File Uploads**: Always use API routes with service role key
- **Authentication**: Clerk handles auth, Supabase handles data
- **Middleware**: Must be in `src/` directory for Clerk
- **Validation**: Client + server validation with detailed error messages
- **Images**: Use Next.js Image component with proper configuration

### 9. Common Issues & Solutions
- **"clerkMiddleware() was not run"**: Move middleware to `src/middleware.ts`
- **RLS violations on uploads**: Use service role key in API routes
- **Image not loading**: Check Next.js image configuration and add `sizes` prop
- **Form validation silent failures**: Add proper error logging and display

### 10. Admin Functions
- Property approval: Use service role key to bypass RLS
- User management: Access via Clerk dashboard
- Storage management: Monitor via Supabase dashboard

## Final Architecture
```
Frontend (Next.js + Clerk) 
    ↓
API Routes (Clerk auth + Supabase service role)
    ↓
Supabase Database/Storage
```

This pattern ensures proper authentication, avoids RLS issues, and maintains security.


Changes Live:

  - Tailwind Config: Mobile-first responsive container padding
  - Global CSS: Mobile-specific optimizations
  - Key Pages: Homepage, Blog, Header updated for better mobile spacing
  - Result: Eliminates excessive mobile margins for full-width professional appearance   
  