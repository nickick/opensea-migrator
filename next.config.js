/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: [
      'pages',
      'src'
    ]
  },
  images: {
    domains: ['i.seadn.io']
  }
};

module.exports = nextConfig;
