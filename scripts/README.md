# NewKenyan.com Utility Scripts

This directory contains utility scripts for managing the NewKenyan.com platform.

## Image Management Scripts

### `upload-property-images.js`
Uploads property images from local storage to Supabase storage bucket.

**Usage:**
```bash
node scripts/upload-property-images.js
```

**What it does:**
- Reads images from `public/propert images/` directory
- Creates Supabase storage bucket if it doesn't exist
- Uploads images with cleaned filenames (spaces replaced with hyphens)
- Skips files that already exist
- Provides upload summary and sample URLs

**Prerequisites:**
- Images must be in `public/propert images/` folder
- Supabase environment variables configured in `.env.local`
- Service role key required for bucket operations

---

### `update-property-urls.js`
Updates property database records to use Supabase storage URLs instead of local paths.

**Usage:**
```bash
node scripts/update-property-urls.js
```

**What it does:**
- Fetches all properties from `property_listings` table
- Converts local image paths to Supabase storage URLs
- Updates database records with new URLs
- Skips properties already using Supabase URLs
- Provides update summary

**Run this AFTER running `upload-property-images.js`**

---

## Environment Variables Required

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Typical Workflow

1. **Add Images**: Place property images in `public/propert images/`
2. **Upload to Cloud**: `node scripts/upload-property-images.js`
3. **Update Database**: `node scripts/update-property-urls.js`
4. **Deploy**: Push changes to trigger Vercel deployment

## Troubleshooting

### Common Issues:
- **Permission denied**: Check that your service role key is correct
- **Files not found**: Ensure images are in the correct directory
- **Upload fails**: Check file sizes (max 10MB) and formats (webp, jpg, png)
- **Database update fails**: Run upload script first, then update script

### Storage Bucket Structure:
```
property-images/
└── properties/
    ├── image-name-with-hyphens.webp
    └── another-image.webp
```

### URL Format:
- **Local**: `/propert images/bedroom with city view.webp`
- **Supabase**: `https://project-id.supabase.co/storage/v1/object/public/property-images/properties/bedroom-with-city-view.webp`