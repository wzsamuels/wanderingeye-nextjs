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
  }
}

module.exports = nextConfig
