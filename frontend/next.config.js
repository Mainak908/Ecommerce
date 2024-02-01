/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    REACT_APP_STRIPE_SECRETF:
      "pk_test_51O07tpSC4QlQZ4KyvCIAcKoXHmhRZt4zXs1c03fAPYkErsN4SJ6LNtJpM13jJBvKOxaNwP9NeXGHTiANIZokrYtU00axKLOBrx",
  },
};

module.exports = nextConfig;
