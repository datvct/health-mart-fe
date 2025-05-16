import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.nhathuoclongchau.com.vn',
      'hoanghamobile.com',
      'example.com',
      'bucket-ktpm.s3.ap-southeast-1.amazonaws.com',
    ],
  },
};

export default nextConfig;
