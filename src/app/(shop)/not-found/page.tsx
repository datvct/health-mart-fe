'use client';

import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IMAGES } from '../../../constants/images';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <main>
        <section className="flex flex-col justify-center items-center p-10 m-auto gap-5 bg-[#edf0f3]">
          <Image src={IMAGES.ImageError} alt="hình xin lỗi" />
          <h1 className="font-semibold text-3xl text-center">
            Đường dẫn đã hết hạn truy cập hoặc không tồn tại
          </h1>
          <p className="text-center">
            Quý khách có thể liên hệ tổng đài miễn phí{' '}
            <span className="text-[#1205DC] font-medium">1800 6928</span> để được hỗ trợ
          </p>
          <Button
            className="bg-[linear-gradient(315deg,#1250dc_0%,#306de4_100%)] text-white font-semibold"
            style={{ padding: '20px', borderRadius: '42px' }}
            onClick={() => router.push('/')}
          >
            Về trang chủ
          </Button>
        </section>
      </main>
    </>
  );
}
