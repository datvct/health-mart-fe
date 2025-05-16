'use client';

import { Button, Input, Modal, Upload } from 'antd';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SvgBackground1 from '../../../components/SvgBackground1';
import { IMAGES } from '../../../constants/images';
import { userApi } from '../../../lib/apis/user';
import { auth } from '../../../lib/firebase';
import '../../../styles/animation.css';
import '@ant-design/v5-patch-for-react-19';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fileList, setFileList] = useState<any[]>([]);

  const [emailInput, setEmailInput] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    avatar: fileList ?? 'https://example.com/avatar.png',
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const sendEmailVerification = async () => {
    if (!emailInput) return toast.warning('Vui lòng nhập email.');

    try {
      await sendSignInLinkToEmail(auth, emailInput, {
        url: window.location.href,
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', emailInput);
      setIsModalVisible(true);
      toast.success('Đã gửi liên kết xác minh đến email');

      setTimeout(() => {
        window.open('https://mail.google.com', '_blank');
        setIsModalVisible(false);
      }, 1000);
    } catch {
      toast.error('Email này không tồn tại!!!');
    }
  };

  const confirmVerification = async () => {
    const storedEmail = window.localStorage.getItem('emailForSignIn');
    if (!storedEmail) return toast.error('Không tìm thấy email để xác minh');

    try {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        await signInWithEmailLink(auth, storedEmail, window.location.href);
        setFormData((prev) => ({ ...prev, email: storedEmail }));
        setEmailVerified(true);
        setIsModalVisible(false);
        toast.success('Xác minh email thành công');
      } else {
        toast.error('Liên kết xác minh không hợp lệ');
      }
    } catch {
      toast.error('Xác minh thất bại');
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
          toast.success('Xác minh email thành công');
        })
        .catch(() => {
          toast.error('Xác minh thất bại');
        });
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^(0|\+84)[0-9]{9}$/; // kiểm tra số điện thoại VN có 10 số bắt đầu bằng 0 hoặc +84
    return re.test(phone);
  };

  const handleSignup = async () => {
    if (!formData.fullName || !formData.phone || !formData.password) {
      toast.warning('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.warning('Email không hợp lệ!');
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.warning('Số điện thoại không hợp lệ!');
      return;
    }
    try {
      setLoading(true);

      const form = new FormData();
      form.append('fullName', formData.fullName);
      form.append('email', formData.email);
      form.append('phone', formData.phone);
      form.append('password', formData.password);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        const file = fileList[0].originFileObj as File;
        form.append('avatar', file);
      }

      const res = await userApi.registerUser(form);

      if (res.statusCode !== 201) {
        toast.error(res.message || 'Đăng ký thất bại!');
        return;
      }

      toast.success(res.message || 'Đăng ký thành công');
      router.push('/sign-in');
    } catch (error: unknown) {
      let errorMessage = 'Đăng ký thất bại, vui lòng thử lại!';
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      }
      toast.error(errorMessage);
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
        okText="Gmail của bạn"
        cancelText="Đóng"
        centered
      >
        <p>Email xác nhận đã được gửi về Email của bạn nhập</p>
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

              <div className="w-full mb-4">
                <label className="block w-full text-sm font-semibold mb-2 text-black">
                  Ảnh đại diện
                </label>
                <Upload
                  listType="picture"
                  fileList={fileList}
                  maxCount={1}
                  beforeUpload={() => false}
                  showUploadList={{ showRemoveIcon: true }}
                  onChange={({ fileList: newFileList }) => {
                    setFileList(newFileList.slice(-1));
                  }}
                >
                  {fileList.length >= 1 ? null : <Button>Chọn ảnh</Button>}
                </Upload>
              </div>

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
    </div>
  );
};

export default SignupPage;
