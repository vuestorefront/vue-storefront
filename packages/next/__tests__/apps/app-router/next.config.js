/** @type {import('next').NextConfig} */
const nextConfig = {
  // With swcMinify set to true, the build will fail because of some transpilation error, probably an issue on Next.js side
  swcMinify: true,
};

module.exports = nextConfig;
