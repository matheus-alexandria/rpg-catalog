/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rpg-catalog-bucket.s3.amazonaws.com',
        port: '',
        pathname: '/upload/**'
      }
    ]
  }
};

export default nextConfig;
