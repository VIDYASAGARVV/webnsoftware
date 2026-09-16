// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 This force-bundles all static public assets, fonts, and CSS layers inside the build output
  output: 'standalone', 
  images: {
    unoptimized: true, // Prevents custom image hosting crashes on free serverless functions
  },
};

export default nextConfig;
