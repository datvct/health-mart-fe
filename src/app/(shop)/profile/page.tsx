'use client';

import { Button, message, Upload } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import AntdBreadcrumb from '../../../components/Breadcrumb';
import LogoutConfirmModal from '../../../components/ModalLogout';
import { authApi } from '../../../lib/apis/auth';
import { userApi } from '../../../lib/apis/user';
import { RootState } from '../../../lib/store';
import { logout, updateProfile } from '../../../lib/store/authSlice';
import { IMAGES } from '../../../constants/images';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    avatar: user?.avatar || '',
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: user?.password || '',
    role: user?.role || '',
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        avatar: user.avatar || '',
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        password: user.password || '',
        role: user.role || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      if (!user) return;

      const form = new FormData();
      form.append('fullName', formData.fullName);
      if (avatarFile) {
        form.append('avatar', avatarFile);
      }

      const res = await userApi.updateUser(user.id, form);
      dispatch(updateProfile(res.data));
      console.log(res);

      // localStorage.setItem('user', JSON.stringify(res.data));
      // dispatch({ type: 'auth/setUser', payload: res.data });
      message.success('Cập nhật thông tin thành công');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      message.error('Cập nhật thất bại');
    }
  };

  const handleLogout = async () => {
    try {
      if (!user) return;
      await authApi.logout({ userId: user?.id.toString() });
    } catch (err) {
      console.warn('Logout API failed:', err);
    } finally {
      dispatch(logout());
      message.success('Đã đăng xuất');
      setIsLogoutModalOpen(false);
      router.push('/');
    }
  };

  return (
    <>
      <div className="p-6 md:p-10 bg-[#f1f3f5] min-h-scree container">
        <AntdBreadcrumb slug={['profile']} customTitles={{ profile: 'Thông tin cá nhân' }} />
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="w-full md:w-1/4">
            <div className="bg-gradient-to-b from-[#2a65f2] to-[#295de0] text-white rounded-xl p-5 text-center">
              <Image
                src={
                  formData.avatar ? formData.avatar : IMAGES.ImageAvtarDefault // ảnh fallback mặc định
                }
                alt="avatar"
                width={64}
                height={64}
                className="mx-auto mb-2 w-20 h-20 rounded-full object-cover"
              />
              <p className="font-semibold">Họ và tên: {user?.fullName}</p>
              <p className="text-sm">Số điện thoại {user?.phone}</p>
            </div>
            <div className="bg-white mt-4 rounded-xl divide-y">
              {[
                {
                  icon: <FaSignOutAlt />,
                  label: 'Đăng xuất',
                  onClick: () => setIsLogoutModalOpen(true),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-100 hover:border hover:rounded-xl hover:border-gray-300"
                  onClick={item.onClick}
                >
                  <span className="text-blue-600">{item.icon}</span>
                  <span className="text-sm text-gray-800 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-3/4 bg-white rounded-xl p-6">
            <h2 className="text-base font-semibold text-[#020b27] border-b pb-3 hidden md:block">
              Thông tin cá nhân
            </h2>

            {isEditing ? (
              <div className="flex flex-col items-center py-6">
                <Image
                  src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatar}
                  alt="avatar"
                  width={96}
                  height={96}
                  className="mb-4 w-[96px] h-[96px] rounded-full object-cover"
                />

                <Upload
                  accept="image/*"
                  maxCount={1}
                  showUploadList={false}
                  beforeUpload={(file) => {
                    setAvatarFile(file);
                    return false;
                  }}
                >
                  <Button>Chọn ảnh mới</Button>
                </Upload>

                <div className="w-full max-w-md text-sm space-y-4 mt-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Họ và tên</label>
                    <input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-[16px] px-4 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                      type="text"
                      placeholder="Họ và tên"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Số điện thoại</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      disabled
                      className="w-full border bg-gray-200 text-gray-500 rounded-[16px] px-4 py-2 outline-none"
                      type="text"
                    />
                  </div>

                  <Button
                    onClick={handleUpdate}
                    className="w-full bg-[#165DFF] hover:bg-[#3c7bff] text-white font-medium py-2 rounded-full"
                  >
                    Cập nhật thông tin
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <Image
                  src={user?.avatar || IMAGES.ImageAvtarDefault}
                  alt="avatar"
                  width={96}
                  height={96}
                  className="mb-4 w-[96px] h-[96px] rounded-full object-cover"
                />
                <div className="w-full max-w-md text-sm">
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-500">Họ và tên</span>
                    <span className="text-gray-800">{user?.fullName}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-500">Số điện thoại</span>
                    <span className="text-gray-800">{user?.phone}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b">
                    <span className="text-gray-500">Email</span>
                    <span className="text-gray-800">{user?.email}</span>
                  </div>
                </div>
                <Button
                  className="mt-6 bg-[#edf1ff] text-blue-600 font-medium px-6 py-1.5 rounded-xl"
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa thông tin
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutConfirmModal
        open={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default ProfilePage;
