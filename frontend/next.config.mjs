/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgur.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tenor.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
    ],
  },
  env: {
    API_ORIGIN: process.env.API_ORIGIN,
  },
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.devtool = "source-map";
    }
    return config;
  },
};

export default nextConfig;
