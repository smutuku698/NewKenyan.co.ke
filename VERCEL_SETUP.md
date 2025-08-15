# Vercel Environment Variables Setup

Add these exact environment variables in your Vercel dashboard:

## Environment Variables
Go to your Vercel project settings → Environment Variables and add:

### 1. Supabase Variables
```
NEXT_PUBLIC_SUPABASE_URL
Value: https://gsdctfcfkrtuxnwapjcj.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzZGN0ZmNma3J0dXhud2FwamNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMzQ4MzAsImV4cCI6MjA3MDcxMDgzMH0.hknSwHKvGu84Bg4oBnF1jEsiNBg-vTF8SmoWiQFyzEg
```

### 2. Clerk Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
Value: pk_test_Y2hlZXJmdWwtbGxhbWEtMTEuY2xlcmsuYWNjb3VudHMuZGV2JA

CLERK_SECRET_KEY
Value: sk_test_E3oMI35y07d5WoW7rBeSBSVasoNpnUiipmhmXR7bJc
```

## Important Notes:
- Make sure to add each variable separately in Vercel
- DO NOT include the variable name in the value (just the actual key)
- Apply to all environments (Production, Preview, Development)
- Redeploy after adding variables

## After Adding Variables:
1. Go to Deployments tab in Vercel
2. Click "Redeploy" on the latest deployment
3. The build should succeed