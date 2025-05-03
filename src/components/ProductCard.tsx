import { Button } from 'antd';
import Image from 'next/image';

const ProductCard = () => {
  return (
    <div className="bg-white rounded-2xl flex flex-col relative p-4 hover:border hover:border-[#1250dc] cursor-pointer">
      <div className="bg-[linear-gradient(295deg,#CD1A0C_0%,#FF5246_98.45%)] absolute rounded-tl-xl rounded-br-xl p-1 top-0 left-0">
        <p className="text-white text-sm font-bold">-19.000đ</p>
      </div>
      <div className="pt-4 px-2 pb-2 flex flex-col gap-1">
        <div className='flex justify-center items-center'>
          <Image
            src={
              'https://cdn.nhathuoclongchau.com.vn/unsafe/256x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/00016524_nepro_1_gold_400g_5081_5e78_large_17ca9ce857.JPG'
            }
            alt="hình ảnh sản phẩm"
            className="mb-3"
            width={140}
            height={140}
          />
        </div>
        <p className="line-clamp-3 text-sm font-semibold">
          Sữa bột Nepro 1 Gold VitaDairy bổ sung dinh dưỡng giảm protein dành cho người bệnh đái
          tháo đường (400g)
        </p>
        <div className="flex w-full bg-[#f6f7f9] rounded-xl text-sm text-[#4a4f63]">
          <div className="flex-1 bg-white text-[#1250DC] border border-[#1250DC] text-center rounded-xl">
            <p>Hộp</p>
          </div>
          <div className="flex-1 text-center hover:bg-[#eaeffa] hover:text-[#1250DC]">
            <p>Vỉ</p>
          </div>
          <div className="flex-1 text-center hover:bg-[#eaeffa] hover:text-[#1250DC]">
            <p>Ống</p>
          </div>
        </div>
        <p className="font-bold text-[#1250DC]">165.000đ/ Hộp</p>
        <p className="line-through text-sm text-[#657384]">184.000đ</p>
        <div className="text-sm text-[#4a4f63] inline-flex w-auto">
          <p className="bg-[#f6f7f9] p-2 rounded-xl text-center">chai</p>
        </div>
        <Button className="bg-[#1250DC] text-white font-medium text-sm w-full rounded-2xl mt-2">
          Chọn mua
        </Button>
      </div>
    </div>
  );
};

export { ProductCard };
