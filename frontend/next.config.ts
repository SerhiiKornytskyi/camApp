import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // This is a workaround for the issue where the frontend is running on port 3001 
  // and the backend is running on port 3000. This allows the frontend to make requests to the backend without CORS issues.
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "http://192.168.1.104:3000/api/:path*",
          //destination: "http://localhost:3000/api/:path*",
        }
      ];
    },
};

export default nextConfig;
