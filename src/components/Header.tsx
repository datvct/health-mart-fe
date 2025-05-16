'use client';

import { AudioOutlined } from '@ant-design/icons';
import '@ant-design/v5-patch-for-react-19';
import { Button, Dropdown, GetProps, Input, MenuProps } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { HiUser } from 'react-icons/hi2';
import { IoIosMenu } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGES } from '../constants/images';
import { authApi } from '../lib/apis/auth';
import { productApi } from '../lib/apis/product';
import { RootState } from '../lib/store';
import { logout } from '../lib/store/authSlice';
import { Category } from '../lib/types/products/type';
import LogoutConfirmModal from './ModalLogout';
import { toast } from 'react-toastify';

const Header = () => {
  const router = useRouter();
  const [categoriesRoot, setCategoriesRoot] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeCategoryLV2, setActiveCategoryLV2] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productApi.getListCategoriesRoot();
        setCategoriesRoot(data.data);
      } catch (error) {
        toast.error('Lỗi khi lấy danh mục gốc:' + error);
      }
    };

    fetchCategories();
  }, []);

  type SearchProps = GetProps<typeof Input.Search>;

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1677ff',
      }}
    />
  );

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const { Search } = Input;

  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});

  const toggleDropdown = (index: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle trạng thái
    }));
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      if (!user) return;
      await authApi.logout({ userId: user?.id.toString() });
    } catch (err) {
      toast.warn('Logout API failed:' + err);
    } finally {
      dispatch(logout());
      toast.success('Đã đăng xuất');
      setIsLogoutModalOpen(false);
      router.push('/');
    }
  };
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const userMenu: MenuProps = {
    items: [
      {
        type: 'group',
        label: (
          <div className="flex items-center gap-2">
            <Image
              src={user?.avatar || '/images/default-avatar.png'}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full border md:!w-7 md:h-7 lg:!w-10 lg:h-10 xl:!w-10 xl:h-10 2xl:!w-10 2xl:h-10 object-cover"
            />
            <p className="font-semibold text-[#000]">{user?.fullName}</p>
          </div>
        ),
        children: [
          {
            key: 'profile',
            label: <Link href="/profile">Trang cá nhân</Link>,
          },
          {
            key: 'logout',
            label: <span onClick={() => setIsLogoutModalOpen(true)}>Đăng xuất</span>,
          },
        ],
      },
    ],
  };

  return (
    <>
      <header>
        <div
          className={`hidden md:flex lg:flex xl:flex 2xl:flex py-10 px-10 justify-center gap-10 items-center bg-[url(/images/header/image-header.png)] bg-cover bg-center`}
        >
          <Link href="/">
            <Image src={IMAGES.ImageLogo} alt="Logo" />
          </Link>
          <Search
            className="w-[650px]"
            placeholder="Tìm tên thuốc, bệnh lý, TCNP,..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
          <div className="flex gap-5 w-[20%] items-center justify-end">
            {user ? (
              <Dropdown menu={userMenu} trigger={['click']}>
                <Image
                  src={user?.avatar || '/images/default-avatar.png'}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full border md:!w-7 md:h-7 lg:!w-10 lg:h-10 xl:!w-10 xl:h-10 2xl:!w-10 2xl:h-10 object-cover"
                />
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer group w-[120px]">
                <HiUser className="text-white group-hover:text-black" />
                <Link href="/sign-in" className="text-white font-medium group-hover:text-black">
                  Đăng nhập
                </Link>
              </div>
            )}
            <Button
              className="bg-[#1250DC] text-white border-[#1250DC] font-semibold"
              icon={<FaShoppingCart />}
            >
              Giỏ hàng
            </Button>
          </div>
        </div>
        <div
          className={`flex md:hidden lg:hidden xlhiddenx 2xl:hidden flex-col justify-center gap-2 items-center bg-[url(/images/header/image-header.png)] bg-cover bg-center p-2`}
        >
          <div className="flex items-center justify-between w-full">
            <Button
              icon={<IoIosMenu size={30} />}
              className="bg-transparent text-white border-transparent"
              onClick={() => {
                setIsOpen(true);
              }}
            />
            <Link href="/">
              <Image src={IMAGES.ImageLogo} alt="Logo" />
            </Link>
            <Button
              className="bg-[#1250DC] text-white border-[#1250DC] font-semibold rounded-full"
              icon={<FaShoppingCart />}
            ></Button>
          </div>
          <Search
            className="w-full"
            placeholder="Tìm tên thuốc, bệnh lý, TCNP,..."
            enterButton="Search"
            size="large"
            suffix={suffix}
            onSearch={onSearch}
          />
        </div>
        <div className="hidden md:block lg:block xl:block 2xl:block">
          <div className="flex justify-around py-2 px-4 h-[50px] relative">
            <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
              <div
                className="flex"
                onMouseEnter={() => {
                  setActiveCategory(categoriesRoot[0]);
                  setActiveCategoryLV2(categoriesRoot[0]?.children?.[0] || null);
                }}
                onClick={() => {
                  router.push(`/${categoriesRoot[0]?.slug}`);
                }}
              >
                <span
                  className={`text-[#020b27] font-medium ${
                    activeCategory === categoriesRoot[0] ? 'text-[#1250dc]' : ''
                  }`}
                >
                  {categoriesRoot[0]?.name}
                </span>
                <MdKeyboardArrowDown
                  size={25}
                  className={`transition-transform duration-300 ease-in-out ${
                    activeCategory === categoriesRoot[0] ? 'rotate-180 text-[#1250dc]' : ''
                  }`}
                />
              </div>
              <div
                className={`bg-[white] z-10 top-10 absolute w-[91%] group-hover:flex p-4 rounded-b-2xl ${
                  activeCategory === null ? 'hidden' : 'flex'
                }`}
                onMouseLeave={() => {
                  setActiveCategory(null);
                }}
              >
                <div className="w-1/4 flex flex-col">
                  {activeCategory?.children?.map((children) => (
                    <div
                      key={children.category_id}
                      className="flex gap-2 items-center rounded-l-xl bg-[#ffffff] hover:bg-[#EDF0F3] p-3 hover:border border-[#dce0e4] cursor-pointer"
                      onMouseEnter={() => setActiveCategoryLV2(children)}
                      onClick={() => {
                        router.push(`/${activeCategory.slug}/${children.slug}`);
                      }}
                    >
                      <Image
                        src={children.image || 'http://example.image'}
                        alt={children.name}
                        width={24}
                        height={24}
                      />
                      <p>{children.name}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#edf0f3] w-3/4 rounded-r-xl grid grid-cols-3 gap-4 p-4">
                  {activeCategoryLV2?.children?.map((childrenLV3, index) => (
                    <div
                      key={index}
                      className="bg-[#fff] flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-[#d7d5d5]"
                      onClick={() => {
                        router.push(
                          `${activeCategory?.slug}/${activeCategoryLV2.slug}/${childrenLV3.slug}`,
                        );
                      }}
                    >
                      <Image
                        src={childrenLV3.image || 'http://example.image'}
                        alt={childrenLV3.name}
                        width={40} // Đặt chiều rộng hình ảnh
                        height={40} // Đặt chiều cao hình ảnh
                      />
                      <p>{childrenLV3.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {categoriesRoot
              .filter((_, index) => index !== 0 && index !== 4)
              .map((category) => (
                <div
                  key={category.category_id}
                  className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]"
                  onMouseEnter={() => {
                    setActiveCategory(category);
                    setActiveCategoryLV2(category?.children?.[0] || null);
                  }}
                  onClick={() => {
                    router.push(`/${category?.slug}`);
                  }}
                >
                  <span
                    className={`group-hover:text-[#1250dc] text-[#020b27] font-medium ${
                      activeCategory === category ? 'text-[#1250dc]' : ''
                    }`}
                  >
                    {category.name}
                  </span>
                  <MdKeyboardArrowDown
                    size={25}
                    className={`transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc] ${
                      activeCategory === category ? 'rotate-180 text-[#1250dc]' : ''
                    }`}
                  />
                </div>
              ))}
            <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
              <Link
                className="group-hover:text-[#1250dc] text-[#020b27] font-medium"
                href="/he-thong-cua-hang"
              >
                {categoriesRoot[4]?.name}
              </Link>
            </div>
          </div>
        </div>
        {/* Overlay xám mờ */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)} // click vào overlay là đóng
          />
        )}
        {/* Sidebar trượt ra */}
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } overflow-y-auto`}
        >
          <div className="px-4 pt-4 flex justify-between items-center bg-[#3a73e6]">
            <div>
              <Link href="/">
                <Image src={IMAGES.ImageLogo} alt="Logo" />
              </Link>
            </div>
            <button className="text-white font-semibold" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>
          <div className="bg-[#3a73e6] border-b p-4 flex items-center flex-col gap-2">
            <p className="text-sm text-justify text-white">
              Đăng nhập để hưởng những đặc quyền riêng cho thành viên
            </p>
            {user ? (
              <Dropdown menu={userMenu} trigger={['click']}>
                <div className="w-full flex items-center font-bold gap-2 cursor-pointer">
                  <Image
                    src={user.avatar || '/images/default-avatar.png'}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full w-10 h-10"
                  />
                  <span>{user.fullName}</span>
                </div>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Button className="bg-[#eaeffa] text-[#1250dc] rounded-2xl font-medium">
                  Đăng nhập
                </Button>
                <Button className="bg-[linear-gradient(315deg,#1250dc_0%,#306de4_100%)] text-white rounded-2xl font-medium">
                  Đăng ký
                </Button>
              </div>
            )}
          </div>

          <ul className="p-4 space-y-2">
            {categoriesRoot
              .filter((_, index) => index !== 4)
              .map((category, index) => (
                <div key={index} className="flex flex-col group">
                  <div
                    className="flex items-center justify-between"
                    onClick={() => toggleDropdown(index)}
                  >
                    <li className="font-semibold p-2">{category.name}</li>
                    <MdKeyboardArrowDown
                      size={25}
                      className={`transition-transform duration-300 ease-in-out ${
                        openMenus[index] ? 'rotate-180 text-[#1250dc]' : ''
                      }`}
                    />
                  </div>
                  {openMenus[index] && (
                    <div className="bg-[#eaeffa] flex flex-col mx-4 rounded-xl">
                      {category.children?.map((child, index) => (
                        <div key={index} className="p-2  border-b">
                          <Link href="/">{child.name}</Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            <li className="font-semibold p-2">
              <Link href="/he-thong-cua-hang">Hệ thống nhà nước</Link>
            </li>
          </ul>
        </div>
      </header>
      <LogoutConfirmModal
        open={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Header;
