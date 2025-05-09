import type { NextConfig } from "next";

import UnoCSS from "@unocss/webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, context) => {
    config.plugins.push(UnoCSS());
    config.cache = false;
    return config;
  },
};

export default nextConfig;
