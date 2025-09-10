/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {},
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
