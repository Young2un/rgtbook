/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net", // ✅ 허용할 이미지 도메인 추가
      },
    ],
  },
};
export default nextConfig;
