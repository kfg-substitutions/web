/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.karinthy.hu"],
  },
};

module.exports = nextConfig;
