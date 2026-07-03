import type { NextConfig } from "next";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingRoot: repoRoot,
  turbopack: {
    root: repoRoot
  },
  transpilePackages: [
    "@book-landings/landing-core",
    "@book-landings/landing-seo",
    "@book-landings/landing-ui"
  ]
};

export default nextConfig;
