/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MY_SECRET_API_KEY: process.env.MY_SECRET_API_KEY,
    ANOTHER_SECRET: process.env.ANOTHER_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
