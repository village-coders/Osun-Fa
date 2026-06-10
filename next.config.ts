import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow both remote images from Cloudinary AND local images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    // Local images are allowed by default, but you might need to specify unoptimized if having issues
    unoptimized: false, // Keep false for production optimization
  },
};

export default nextConfig;