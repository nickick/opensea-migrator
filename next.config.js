/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
  images: {
    domains: ['i.seadn.io', 'testnets-api.opensea.io', 'arweave.net'],
  },
};

module.exports = nextConfig;
