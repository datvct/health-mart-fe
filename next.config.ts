import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'cdn.nhathuoclongchau.com.vn',
      'hoanghamobile.com',
      'example.com',
      'bucket-ktpm.s3.ap-southeast-1.amazonaws.com',
      'example.image',
      's3-sgn09.fptcloud.com'
    ],
  },
};

export default nextConfig;
