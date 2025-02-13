/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MY_SECRET_API_KEY: process.env.MY_SECRET_API_KEY,
    ANOTHER_SECRET: process.env.ANOTHER_SECRET,
  },
  images: {
    domains: ['cdn.weatherapi.com'],
  },
};

module.exports = nextConfig;
