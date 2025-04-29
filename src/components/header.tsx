'use client';

import Image from 'next/image';
import { IMAGES } from '../constants/images';
import { Button, GetProps, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { HiUser } from 'react-icons/hi2';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosMenu } from 'react-icons/io';
import { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import Link from 'next/link';

const Header = () => {
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
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const toggleDropdown = () => {
    setIsOpenMenu((prev) => !prev);
  };

  return (
    <header>
      <div
        className={`hidden md:flex lg:flex xl:flex 2xl:flex py-10 px-10 justify-center gap-10 items-center bg-[url(/images/header/image-header.png)] bg-cover bg-center`}
      >
        <a href="">
          <Image src={IMAGES.ImageLogo} alt="Logo" />
        </a>
        <Search
          className="w-[650px]"
          placeholder="Tìm tên thuốc, bệnh lý, TCNP,..."
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={onSearch}
        />
        <div className="flex gap-5">
          <div className="flex items-center gap-2 cursor-pointer group w-[120px]">
            <HiUser className="text-white group-hover:text-black" />
            <a href="#" className="text-white font-medium group-hover:text-black">
              Đăng nhập
            </a>
          </div>
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
          <a href="">
            <Image src={IMAGES.ImageLogo} alt="Logo" />
          </a>
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
            <span className="group-hover:text-[#1250dc] text-[#020b27] font-medium">
              Thực phẩm chức năng
            </span>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out  group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
            <div className="bg-[#767d91] w-[100%] absolute top-10 left-0 p-4 cursor-pointer opacity-50 z-0 inset-0 h-[100vh] hidden group-hover:flex"></div>
            <div className="bg-[white] z-10 top-10 absolute w-[91%] group-hover:flex p-4 rounded-b-2xl hidden">
              <div className="w-1/4 flex flex-col">
                <div className="flex gap-2 items-center rounded-l-xl bg-[#ffffff] hover:bg-[#EDF0F3] p-3 hover:border border-[#dce0e4] cursor-pointer">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png"
                    alt="Vitamin Khoáng Chất"
                    width={24} // Đặt chiều rộng hình ảnh
                    height={24} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin & khoáng chất</p>
                </div>
                <div className="flex gap-2 items-center bg-[#ffffff] p-3 cursor-pointer hover:border border-[#dce0e4] hover:bg-[#EDF0F3]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png"
                    alt="Vitamin Khoáng Chất"
                    width={24} // Đặt chiều rộng hình ảnh
                    height={24} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin & khoáng chất</p>
                </div>
                <div className="flex gap-2 items-center bg-[#ffffff] p-3 cursor-pointer hover:border border-[#dce0e4] hover:bg-[#EDF0F3]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/tpcn_vitamin_khoang_chat_level_2_91b99b5a64.png"
                    alt="Vitamin Khoáng Chất"
                    width={24} // Đặt chiều rộng hình ảnh
                    height={24} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin & khoáng chất</p>
                </div>
              </div>
              <div className="bg-[#edf0f3] w-3/4 rounded-r-xl grid grid-cols-3 gap-4 p-4">
                <div className="bg-[#fff] flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-[#d7d5d5]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/bo_sung_canxi_vitamin_d_level_3_1cac767906.png"
                    alt="Vitamin Khoáng Chất"
                    width={40} // Đặt chiều rộng hình ảnh
                    height={40} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin tổng hợp</p>
                </div>
                <div className="bg-[#fff] flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-[#d7d5d5]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/bo_sung_canxi_vitamin_d_level_3_1cac767906.png"
                    alt="Vitamin Khoáng Chất"
                    width={40} // Đặt chiều rộng hình ảnh
                    height={40} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin tổng hợp</p>
                </div>
                <div className="bg-[#fff] flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-[#d7d5d5]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/bo_sung_canxi_vitamin_d_level_3_1cac767906.png"
                    alt="Vitamin Khoáng Chất"
                    width={40} // Đặt chiều rộng hình ảnh
                    height={40} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin tổng hợp</p>
                </div>
                <div className="bg-[#fff] flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-[#d7d5d5]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/bo_sung_canxi_vitamin_d_level_3_1cac767906.png"
                    alt="Vitamin Khoáng Chất"
                    width={40} // Đặt chiều rộng hình ảnh
                    height={40} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin tổng hợp</p>
                </div>
                <div className="bg-[#fff] flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-[#d7d5d5]">
                  <Image
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/40x40/https://cms-prod.s3-sgn09.fptcloud.com/bo_sung_canxi_vitamin_d_level_3_1cac767906.png"
                    alt="Vitamin Khoáng Chất"
                    width={40} // Đặt chiều rộng hình ảnh
                    height={40} // Đặt chiều cao hình ảnh
                  />
                  <p>Vitamin tổng hợp</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
            <span className="group-hover:text-[#1250dc] text-[#020b27] font-medium">
              Dược mỹ phẩm
            </span>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
            <span className="group-hover:text-[#1250dc] text-[#020b27] font-medium">Thuốc</span>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
            <span className="group-hover:text-[#1250dc] text-[#020b27] font-medium">
              Chăm sóc cá nhân
            </span>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
            <span className="group-hover:text-[#1250dc] text-[#020b27] font-medium">
              Thiết bị y tế
            </span>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center cursor-pointer group hover:shadow-[inset_0_-2px_0_0] hover:shadow-[#1250dc]">
            <span className="group-hover:text-[#1250dc] text-[#020b27] font-medium">
              Hệ thống nhà thuốc
            </span>
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
          <div className="flex items-center gap-2">
            <Button className="bg-[#eaeffa] text-[#1250dc] rounded-2xl font-medium">
              Đăng nhập
            </Button>
            <Button className="bg-[linear-gradient(315deg,#1250dc_0%,#306de4_100%)] text-white rounded-2xl font-medium">
              Đăng ký
            </Button>
          </div>
        </div>

        <ul className="p-4 space-y-2">
          <div className="flex flex-col group">
            <div className="flex items-center justify-between" onClick={toggleDropdown}>
              <li className="font-semibold p-2">Thực phẩm chức năng</li>
              <MdKeyboardArrowDown
                size={25}
                className={`transition-transform duration-300 ease-in-out ${
                  isOpenMenu ? 'rotate-180 text-[#1250dc]' : ''
                }`}
              />
            </div>
            {isOpenMenu && (
              <div className="bg-[#eaeffa] flex flex-col mx-4 rounded-xl">
                <div className="p-2  border-b">
                  <Link href="/">Vitamin & khoáng chất</Link>
                </div>
                <div className="p-2  border-b">
                  <Link href="/">Vitamin & khoáng chất</Link>
                </div>
                <div className="p-2">
                  <Link href="/">Vitamin & khoáng chất</Link>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <li className="font-semibold p-2">Dược mỹ phẩm</li>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center justify-between">
            <li className="font-semibold p-2">Thuốc</li>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center justify-between">
            <li className="font-semibold p-2">Chăm sóc cá nhân</li>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <div className="flex items-center justify-between">
            <li className="font-semibold p-2">Thiết bị y tế</li>
            <MdKeyboardArrowDown
              size={25}
              className="transition-transform duration-300 ease-in-out group-hover:rotate-180 group-hover:text-[#1250dc]"
            />
          </div>
          <li className="font-semibold p-2">Hệ thống nhà nước</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
