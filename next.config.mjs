// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ваша конфігурація
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.prom.ua'],
  },
};

export default nextConfig;
