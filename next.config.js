/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = { layers: true, topLevelAwait: true };

    return config;
  },
};
