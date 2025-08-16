import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gsdctfcfkrtuxnwapjcj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/directory',
        destination: '/business-directory',
        permanent: true,
      },
    ];
  },
  // Skip API routes during static generation to avoid build-time environment issues
  trailingSlash: true,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  }
};

export default nextConfig;
