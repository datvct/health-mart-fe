import Image from "next/image";
import { IMAGES } from "../../constants/images";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-50">
      {/* Hình ảnh nền */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={IMAGES.BackgroundLogin} 
          alt="FPT Service Experience" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-100" // Điều chỉnh độ trong suốt nếu cần
        />
      </div>

      {/* Nội dung đăng nhập */}
      <div className="relative w-full max-w-sm bg-transparent rounded-lg overflow-hidden z-10 p-10 ml-auto mr-[300px]">

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Image src={IMAGES.FPTIDLogo} alt="FPT ID" width={70} height={70} />
            <Image src={IMAGES.SwapIcon} alt="Swap Icon" width={30} height={30} />
            <Image src={IMAGES.LongChauLogo} alt="Nhà thuốc Long Châu" width={70} height={70} />
          </div>
          <p className="text-center text-sm text-[#33343E] mb-6 flex items-center justify-center gap-2">
            Tài khoản sử dụng mọi dịch vụ  
            <Image src={IMAGES.FPTLogoSmall} alt="FPT Logo" width={20} height={20} />
          </p>
          <label className="block w-full text-sm font-semibold mb-2 text-black">
            Tên đăng nhập <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            className="w-full px-4 py-3 border rounded-lg text-[#33343E] placeholder-[#33343E] focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
          />
          <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition">
            Tiếp tục
          </button>
          <p className="text-center text-xs text-black mt-4">
            Bằng cách tiếp tục, bạn đồng ý với <br />
            <a href="#" className="underline text-black">Điều khoản</a> và 
            <a href="#" className="underline text-black"> Chính sách bảo mật</a> <br /> của FPT ID
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
