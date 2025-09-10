const createMDX = require("@next/mdx");

const withMDX = createMDX({
  extension: /\.mdx?$/, // allow .md & .mdx
});

const { withNetlify } = require("@netlify/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [], // add external image domains if needed
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // include md/mdx as pages
};

module.exports = withMDX(nextConfig);
