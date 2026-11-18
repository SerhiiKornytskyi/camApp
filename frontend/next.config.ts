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
          destination: `${process.env.TEMP_RPI_LINK}:${process.env.TEMP_API_PORT}/api/:path*`,
          // destination: "http://localhost:3000/api/:path*",
        }
      ];
    },
};

export default nextConfig;
