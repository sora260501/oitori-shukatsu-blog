import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["remark-gfm", "mdast-util-gfm", "mdast-util-gfm-table", "micromark-extension-gfm-table"],
};

export default nextConfig;
