/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "echosafe-images-bucket.s3.sa-east-1.amazonaws.com",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
      },
      {
        protocol: "https",
        hostname: "i.imgflip.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
};

export default config;
