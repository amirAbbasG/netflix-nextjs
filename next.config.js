/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ytimg.com"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/login",
  //       permanent: false,
  //     },
  //     {
  //       source: "/login",
  //       destination: "/",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
