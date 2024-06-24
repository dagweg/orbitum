/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["imgur.com", "tenor.com", "i.pinimg.com"],
  },
  env: {
    API_ORIGIN: process.env.API_ORIGIN,
  },
};

export default nextConfig;
