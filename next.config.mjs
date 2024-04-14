/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable:
    process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    domains: ["i.scdn.co"],
  },
};

export default withPWA(nextConfig);
