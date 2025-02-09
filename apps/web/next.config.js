/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    externalDir: true // 모노레포에서 외부 의존성을 허용
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
