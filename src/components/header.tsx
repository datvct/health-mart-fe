'use client';

import Image from 'next/image';
import { IMAGES } from '../constants/images';
import { Button, GetProps, Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { HiUser } from 'react-icons/hi2';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';

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

  return (
    <header>
      <div
        className={`flex py-10 px-10 justify-center gap-10 items-center bg-[url(/images/header/image-header.png)] bg-cover bg-centen`}
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
            icon={<FaShoppingCart/>}
          >
            Giỏ hàng
          </Button>
        </div>
      </div>
      <div>
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
    </header>
  );
};

export default Header;
