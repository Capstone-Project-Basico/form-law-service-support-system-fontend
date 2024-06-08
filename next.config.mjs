/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
