import { Phone, Search, ShoppingCart, Smartphone, User } from "lucide-react"
import Image from "next/image"
import { IMAGES } from "../constants/images"

const Header = () => {
  return (
    <header className="custom-background-header  text-white">
      {/* Thanh trên cùng */}
      <div className="container flex justify-between items-center px-6 py-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <Image src={IMAGES.IconLoudSpeaker} alt="Nhà thuốc Long Châu" width={20} height={20} />
            <span className="text-sm text-white font-bold">Trung tâm tiêm chủng Long Châu</span>
          </div>
          <a href="#" className="underline text-sm text-white font-bold">
            Xem chi tiết
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="flex items-center gap-2">
            <Smartphone size={20} />
            <span className="text-sm text-white font-bold">Tải ứng dụng</span>
          </a>
          <a href="#" className="flex items-center gap-2">
            <Phone size={20} />
            <span className="text-sm text-white font-bold">Tư vấn ngay: 1800 6928</span>
          </a>
        </div>
      </div>

      <div className="container flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
          <Image src={IMAGES.ImageLogo} alt="Nhà thuốc Long Châu" width={160} height={50} />
        </div>

        <div className="flex items-center w-1/2 bg-white rounded-[25px] overflow-hidden">
          <input
            type="text"
            placeholder="Tìm tên thuốc, bệnh lý, thực phẩm chức năng..."
            className="w-full px-4 py-2 text-black focus:outline-none"
          />
          <button className="bg-[#0094FF] px-4 py-3">
            <Search className="text-white" size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="flex items-center space-x-2">
            <User size={20} />
            <span>Đăng nhập</span>
          </a>
          <a href="#" className="flex items-center space-x-2 relative bg-[#1250DC] p-3 rounded-[25px]">
            <ShoppingCart size={24} />
            <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs px-2 rounded-full">2</span>
            <span>Giỏ hàng</span>
          </a>
        </div>
      </div>

      {/* Menu chính */}
      <nav className="bg-white text-black py-3">
        <ul className="flex justify-center space-x-6 text-sm font-semibold">
          <li className="group relative">
            <a href="#" className="hover:text-blue-500">
              Thực phẩm chức năng ▼
            </a>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 p-3 w-48">
              <a href="#" className="block py-1 hover:bg-gray-100">
                Vitamin
              </a>
              <a href="#" className="block py-1 hover:bg-gray-100">
                Dinh dưỡng
              </a>
            </div>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Dược mỹ phẩm
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Thuốc
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Chăm sóc cá nhân
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Thiết bị y tế
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Tiêm chủng
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500">
              Bệnh
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
