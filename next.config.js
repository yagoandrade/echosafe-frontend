/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "echosafe-images-bucket.s3.sa-east-1.amazonaws.com",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "http.cat",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
