'use client';
import { Input } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgBackground1 from '../../../components/SvgBackground1';
import { IMAGES } from '../../../constants/images';
import { authApi } from '../../../lib/apis/auth';
import { AppDispatch } from '../../../lib/store';
import { setAuth } from '../../../lib/store/authSlice';
import '../../../styles/animation.css';
import '@ant-design/v5-patch-for-react-19';
import { ErrorResponse } from '../../../lib/types/common/type';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }
    try {
      setLoading(true);
      const res = await authApi.login({ email, password, remember });
      const { user, token, refreshToken } = res.data;

      if (user.role === 'customer') {
        dispatch(setAuth({ user, token, refreshToken, remember }));
        toast.success('Đăng nhập thành công');
        router.push('/');
      } else {
        toast.error('Tài khoản không có quyền');
      }
    } catch (err: unknown) {
      const error = err as ErrorResponse;
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen justify-center bg-gradient-to-r from-orange-100 to-orange-50">
      <div className="hidden w-[30%] sm:flex items-center">
        <div className="animate-slide-in-left">
          <Image
            src={IMAGES.ImageBannerLeftLogin}
            alt="FPT Service Experience"
            sizes="100vw"
            className="opacity-100 w-[600px]"
          />
        </div>
      </div>
      <div className="w-[20%] hidden sm:block lg:ml-[20px] mt-[-100px]">
        <div className="animate-slide-down">
          <SvgBackground1 color="#f88005" />
        </div>
      </div>
      <div className="w-full sm:w-[40%] flex items-center max-w-sm bg-transparent rounded-lg overflow-hidden z-10">
        <div className="flex flex-col items-center justify-center w-full px-2">
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
          <Input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập gmail của bạn"
            className="w-full px-4 py-3 border !rounded-[12px] text-[#33343E] placeholder-[#33343E] focus:outline-none focus:ring-2 focus-within:border-orange-400 focus:ring-orange-400 mb-4"
          />
          <label className="block w-full text-sm font-semibold mb-2 text-black">
            Mật khẩu <span className="text-red-500">*</span>
          </label>

          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            className="w-full px-4 py-3 border !rounded-[12px] text-[#33343E] placeholder-[#33343E] focus:outline-none focus:ring-2 focus-within:border-orange-400 focus:ring-orange-400 mb-4"
          />
          <div className="flex items-center mb-4 w-full">
            <input
              type="checkbox"
              onClick={() => setRemember(!remember)}
              id="remember"
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-[#33343E]">
              Ghi nhớ tài khoản
            </label>
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 text-white py-3 rounded-[12px] hover:bg-orange-600 transition"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>

          <p className="text-center text-sm text-black mt-4">
            Nếu bạn chưa có tài khoản hệ thống xin hãy đăng ký tại đây{' '}
            <Link href="/sign-up" className="text-orange-500">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
