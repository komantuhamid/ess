/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Allow images from your public folder
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig;
