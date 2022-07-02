/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['live.staticflickr.com', 'res.cloudinary.com'],
  }
}

module.exports = nextConfig
