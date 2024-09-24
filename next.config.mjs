/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "placehold.co",
      "images.pexels.com",
      "lh3.googleusercontent.com",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
