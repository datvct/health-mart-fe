import Image from 'next/image';
import Link from 'next/link';
import { IMAGES } from '../../constants/images';

const EmptyCart = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center pb-6">
      <Image
        src={IMAGES.ImageCartEmpty}
        alt="Giỏ hàng trống"
        width={300}
        height={200}
        className="w-[300px] h-[200px]"
      />
      <div className="mt-3">
        <div className="text-lg font-semibold text-gray-700">Chưa có sản phẩm nào trong giỏ</div>
        <div className="mt-1 text-sm text-gray-500">
          Cùng khám phá hàng ngàn sản phẩm
          <div>tại Nhà thuốc FPT Long Châu nhé!</div>
        </div>
      </div>
      <Link
        href="/"
        className="inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed 
        bg-blue-600 text-white hover:bg-blue-700 py-[12px] px-[24px] h-[48px] rounded-[42px] text-sm mt-4"
      >
        Khám phá ngay
      </Link>
    </div>
  );
};
export default EmptyCart;
