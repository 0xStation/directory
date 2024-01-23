/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // support images from all domains, needed because user pfps can come from all URLs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
    // enable SVGs
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: "/api/ponder/:path*",
        // destination: "http://localhost:42069/:path*", // Proxy to Backend
        destination: "https://ponder-production-3dc7.up.railway.app/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
