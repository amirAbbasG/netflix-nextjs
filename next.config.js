/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
