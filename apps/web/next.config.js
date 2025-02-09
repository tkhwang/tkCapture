/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: [], // 모노레포에서 공유하는 패키지가 있다면 여기에 추가
  reactStrictMode: true,
};

module.exports = nextConfig;
