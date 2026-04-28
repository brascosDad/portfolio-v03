import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/homedepot", destination: "/work/homedepot", permanent: true },
      { source: "/homedepot/full", destination: "/work/homedepot/full", permanent: true },
      { source: "/akqaqt", destination: "/work/akqaqt", permanent: true },
      { source: "/cdlxqt", destination: "/work/cdlxqt", permanent: true },
      { source: "/atqt", destination: "/work/atqt", permanent: true },
    ];
  },
};

export default nextConfig;
