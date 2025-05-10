'use client';

import { Input, Modal, message } from 'antd';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SvgBackground1 from '../../../components/SvgBackground1';
import SvgBackground2 from '../../../components/SvgBackground2';
import { IMAGES } from '../../../constants/images';
import { userApi } from '../../../lib/apis/user';
import { auth } from '../../../lib/firebase';
import '../../../styles/animation.css';

const SignupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [emailInput, setEmailInput] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    avatar: 'https://example.com/avatar.png',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
  });
  const [loading, setLoading] = useState(false);

  const sendEmailVerification = async () => {
    if (!emailInput) return message.warning('Vui lòng nhập email.');

    try {
      await sendSignInLinkToEmail(auth, emailInput, {
        url: window.location.href,
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', emailInput);
      setIsModalVisible(true);
      message.success('Đã gửi liên kết xác minh đến email');
    } catch (err) {
      console.error(err);
      message.error('Gửi email thất bại');
    }
  };

  const confirmVerification = async () => {
    const storedEmail = window.localStorage.getItem('emailForSignIn');
    if (!storedEmail) return message.error('Không tìm thấy email để xác minh');

    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, storedEmail, window.location.href);
        setFormData((prev) => ({ ...prev, email: storedEmail }));
        setEmailVerified(true);
        setIsModalVisible(false);
        message.success('Xác minh email thành công');
      } else {
        message.error('Liên kết xác minh không hợp lệ');
      }
    } catch (err) {
      console.error(err);
      message.error('Xác minh thất bại');
    }
  };

  useEffect(() => {
    const mode = searchParams.get('mode');
    const oobCode = searchParams.get('oobCode');
    const storedEmail = window.localStorage.getItem('emailForSignIn');

    if (mode === 'signIn' && oobCode && storedEmail) {
      signInWithEmailLink(auth, storedEmail, window.location.href)
        .then(() => {
          setFormData((prev) => ({ ...prev, email: storedEmail }));
          setEmailVerified(true);
          message.success('Xác minh email thành công');
        })
        .catch((err) => {
          console.error(err);
          message.error('Xác minh thất bại');
        });
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await userApi.registerUser(formData);

      if (res.statusCode !== 201) {
        message.error(res.message || 'Đăng ký thất bại!');
        return;
      }

      message.success(res.message || 'Đăng ký thành công');
      router.push('/sign-in');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại!';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-row w-full min-h-screen justify-center bg-gradient-to-r from-orange-100 to-orange-50">
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={confirmVerification}
        okText="Xác minh"
        cancelText="Đóng"
        centered
      >
        <p>Hãy click vào liên kết xác minh đã được gửi đến email của bạn.</p>
      </Modal>

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

          {!emailVerified ? (
            <>
              <label className="block w-full text-sm font-semibold mb-2 text-black">
                Email để xác minh
              </label>
              <Input
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-3 border !rounded-[12px] text-[#33343E] placeholder-[#33343E] focus:outline-none focus:ring-2 focus-within:border-orange-400 focus:ring-orange-400 mb-4"
              />
              <button
                onClick={sendEmailVerification}
                className="w-full bg-orange-500 text-white py-3 rounded-[12px] hover:bg-orange-600 transition"
              >
                Gửi mã xác nhận
              </button>
            </>
          ) : (
            <>
              {[
                { label: 'Họ và tên', name: 'fullName' },
                { label: 'Số điện thoại', name: 'phone' },
                { label: 'Mật khẩu', name: 'password' },
              ].map(({ label, name }) => (
                <div key={name} className="w-full mb-4">
                  <label className="block w-full text-sm font-semibold mb-2 text-black">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name={name}
                    type={name === 'password' ? 'password' : 'text'}
                    value={formData[name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={`Nhập ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border !rounded-[12px] text-[#33343E] placeholder-[#33343E] focus:outline-none focus:ring-2 focus-within:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              ))}
              <button
                onClick={handleSignup}
                className="w-full bg-orange-500 text-white py-3 rounded-[12px] hover:bg-orange-600 transition"
              >
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </>
          )}

          <p className="text-center text-sm text-black mt-4">
            Bạn đã có tài khoản?{' '}
            <Link href="/sign-in" className="text-orange-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden sm:flex w-[8%] lg:w-[10%]">
        <div className="absolute bottom-[100px] left-[100px] w-full">
          <div className="animate-slide-up">
            <SvgBackground2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
