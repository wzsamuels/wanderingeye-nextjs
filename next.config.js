/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: 'images.pexels.com'
      }
    ]
  },
  webpack: (config) => {
    config.experiments = {
      "topLevelAwait": true
    }
    return config
  }
}

module.exports = nextConfig
