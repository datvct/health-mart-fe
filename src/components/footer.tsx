"use client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "../constants/images";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      {/* Phần Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📍</span>
            <h1 className="text-lg font-bold text-left">
              Xem hệ thống 1965 nhà thuốc trên toàn quốc
            </h1>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:shadow-md hover:bg-gray-100">
            Xem danh sách nhà thuốc
          </button>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="bg-white text-gray-700 py-6">
        <div className="container mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-6 text-sm">
            {/* Cột 1 - VỀ CHÚNG TÔI */}
            <div className="text-left">
              <h2 className="font-bold mb-4">VỀ CHÚNG TÔI</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Hệ thống cửa hàng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Giấy phép kinh doanh
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Quy chế hoạt động
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách đặt cọc
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách nội dung
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách đối trả thuốc
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách giao hàng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách bảo mật dữ liệu cá nhân khách hàng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách thanh toán
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Kiểm tra hóa đơn điện tử
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách thu thập và xử lý dữ liệu cá nhân
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chính sách hoàn hủy đổi trả Vắc xin
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Thông tin trung tâm bảo hành máy thiết bị y tế từng hãng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 2 - DANH MỤC */}
            <div className="text-left">
              <h2 className="font-bold mb-4">DANH MỤC</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Thực phẩm chức năng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Dược mỹ phẩm
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Thuốc
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Chăm sóc cá nhân
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Trang thiết bị y tế
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Đặt thuốc online
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Trung tâm Tiêm chủng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3 - TÌM HIỂU THÊM */}
            <div className="text-left">
              <h2 className="font-bold mb-4">TÌM HIỂU THÊM</h2>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Góc sức khỏe
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Tra cứu thuốc
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Tra cứu dược chất
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Tra cứu dược liệu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Bệnh thường gặp
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Bệnh viện
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Đội ngũ chuyên môn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Tin tức tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Tin tức sự kiện
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 4 - TỔNG ĐÀI & THANH TOÁN */}
            <div className="text-left">
              <h2 className="font-bold mb-4">TỔNG ĐÀI (8:00-22:00)</h2>
              <ul className="space-y-2">
                <li>Tư vấn mua hàng</li>
                <li>
                  <Link href="tel:18006928" className="hover:underline text-blue-600">
                    18006928 (Nhánh 1)
                  </Link>
                </li>
                <li className="mt-4">Trung tâm Vắc xin</li>
                <li>
                  <Link href="tel:18006928" className="hover:underline text-blue-600">
                    18006928 (Nhánh 2)
                  </Link>
                </li>
                <li className="mt-4">Góp ý, khiếu nại</li>
                <li>
                  <Link href="tel:18006928" className="hover:underline text-blue-600">
                    18006928 (Nhánh 3)
                  </Link>
                </li>

                <h2 className="font-bold mb-4">HỖ TRỢ THANH TOÁN</h2>
                <div className="flex flex-wrap gap-4 justify-start">
                  <Image
                    src={IMAGES.ImageMomo}
                    alt="Momo"
                    width={60}
                    height={40}
                  />
                  <Image
                    src={IMAGES.ImageZaloPay}
                    alt="ZaloPay"
                    width={60}
                    height={40}
                  />
                </div>
              </ul>
            </div>

            {/* Cột 5 - KẾT NỐI VỚI CHÚNG TÔI */}
            <div className="text-left">
              <h2 className="font-bold mb-4">KẾT NỐI VỚI CHÚNG TÔI</h2>
              <div className="flex flex-col space-y-2">
                <Link href="#" className="hover:underline text-blue-600">
                  Facebook
                </Link>
                <Link href="#" className="hover:underline text-blue-600">
                  Zalo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className="bg-white text-gray-700 py-4 block md:hidden">
        <div className="container mx-auto px-4 text-sm space-y-4">
          {/* VỀ CHÚNG TÔI */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              VỀ CHÚNG TÔI
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <ul className="mt-2 ml-4 list-disc">
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Hệ thống cửa hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Giấy phép kinh doanh
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách đặt cọc
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách nội dung
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách đối trả thuốc
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách bảo mật dữ liệu cá nhân khách hàng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách thanh toán
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Kiểm tra hóa đơn điện tử
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chính sách thu thập và xử lý dữ liệu cá nhân
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Chính sách hoàn hủy đổi trả Vắc xin
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Thông tin trung tâm bảo hành máy thiết bị y tế từng hãng
                </Link>
              </li>
            </ul>
          </details>

          {/* DANH MỤC */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              DANH MỤC
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <ul className="mt-2 ml-4 list-disc">
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Thực phẩm chức năng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Dược mỹ phẩm
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Thuốc
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Chăm sóc cá nhân
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Trang thiết bị y tế
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Đặt thuốc online
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Trung tâm Tiêm chủng
                </Link>
              </li>
            </ul>
          </details>

          {/* TÌM HIỂU THÊM */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              TÌM HIỂU THÊM
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <ul className="mt-2 ml-4 list-disc">
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Góc sức khỏe
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Tra cứu thuốc
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Tra cứu dược chất
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Tra cứu dược liệu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Bệnh thường gặp
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Bệnh viện
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Đội ngũ chuyên môn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Tin tức tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  Tin tức sự kiện
                </Link>
              </li>
            </ul>
          </details>

          {/* TỔNG ĐÀI & THANH TOÁN */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              TỔNG ĐÀI (8:00-22:00)
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <ul className="mt-2 ml-4 list-disc">
              <li>Tư vấn mua hàng</li>
              <li>
                <Link href="tel:18006928" className="hover:underline text-blue-600">
                  18006928 (Nhánh 1)
                </Link>
              </li>
              <li className="mt-2">Trung tâm Vắc xin</li>
              <li>
                <Link href="tel:18006928" className="hover:underline text-blue-600">
                  18006928 (Nhánh 2)
                </Link>
              </li>
              <li className="mt-2">Góp ý, khiếu nại</li>
              <li>
                <Link href="tel:18006928" className="hover:underline text-blue-600">
                  18006928 (Nhánh 3)
                </Link>
              </li>
            </ul>
          </details>

          {/* KẾT NỐI VỚI CHÚNG TÔI */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              KẾT NỐI VỚI CHÚNG TÔI
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <div className="mt-2 ml-4">
              <ul className="list-disc">
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-blue-600">
                    Zalo
                  </Link>
                </li>
              </ul>
            </div>
          </details>

          {/* CHỨNG NHẬN BỞI & HỖ TRỢ THANH TOÁN */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              CHỨNG NHẬN BỞI & HỖ TRỢ THANH TOÁN
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <div className="mt-2 ml-4">
              <div className="flex flex-wrap gap-2 justify-start">
                <Image
                  src={IMAGES.ImageIconChungNhan}
                  alt="Chứng nhận"
                  width={60}
                  height={40}
                />
                <Image
                  src={IMAGES.ImageIconChungNhan2}
                  alt="Bảo mật thanh toán"
                  width={80}
                  height={40}
                />
                <Image
                  src={IMAGES.ImageMomo}
                  alt="Momo"
                  width={60}
                  height={40}
                />
                <Image
                  src={IMAGES.ImageZaloPay}
                  alt="ZaloPay"
                  width={60}
                  height={40}
                />
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Footer cuối – thông tin liên hệ */}
      <div className="bg-white text-gray-700 py-4 px-4">
        <div className="container mx-auto text-center text-xs text-gray-600">
          © 2007 - 2025 Công ty Cổ Phần Dược Phẩm FPT Long Châu
          <br />
          Số ĐKKD 0315275368 cấp ngày 17/09/2018 tại Sở Kế hoạch Đầu tư TPHCM
          <div className="mt-3 space-y-1">
            <p>
              Địa chỉ: 379-381 Hai Bà Trưng, P. Võ Thị Sáu, Q.3, TP. HCM
            </p>
            <p>
              Điện thoại:{" "}
              <Link href="tel:02873023456" className="hover:underline text-blue-600">
                02873023456
              </Link>{" "}
              • Email:{" "}
              <Link
                href="mailto:sale@nhathuoclongchau.com.vn"
                className="hover:underline text-blue-600"
              >
                sale@nhathuoclongchau.com.vn
              </Link>
            </p>
            <p>Người quản lý nội dung: Nguyễn Bạch Điệp</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
