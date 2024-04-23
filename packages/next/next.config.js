/** @type {import('next').NextConfig} */
const nextConfig = {
  // connectkit/walletconnect requirement
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
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
        destination:
          (process.env.NEXT_PUBLIC_PONDER_PUBLIC_URL ??
            "http://localhost:42069") + "/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
