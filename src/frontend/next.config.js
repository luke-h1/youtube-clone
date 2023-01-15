/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // experimental: {
  //   externalDir: true,
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['common'],
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, 'node_modules/react'),
    };
    return config;
  },
};

module.exports = nextConfig;
