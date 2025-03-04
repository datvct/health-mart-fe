import Image from "next/image"
import Link from "next/link"
import { IMAGES } from "../constants/images"

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      {/* Phần Header chính */}
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl">📍</span>
          <h1 className="text-lg font-bold">Xem hệ thống 1965 nhà thuốc trên toàn quốc</h1>
        </div>
        <button className="bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:shadow-md hover:bg-gray-100">
          Xem danh sách nhà thuốc
        </button>
      </div>

      {/* Phần chữ bên dưới */}
      <div className="bg-white text-gray-700 py-6">
        <div className="container mx-auto grid grid-cols-5 gap-6 text-sm">
          {/* Cột 1 */}
          <div>
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
                  Chính sách đổi trả thuốc
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

          {/* Cột 2 */}
          <div>
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

          {/* Cột 3 */}
          <div>
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
                  Tra cứu dữ liệu
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
                  Hoạt động xã hội
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

          {/* Cột 4 */}
          <div>
            <h2 className="font-bold mb-4">TỔNG ĐÀI (8:00-22:00)</h2>
            <ul className="space-y-2">
              <li>Tư vấn mua hàng</li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  18006928 (Nhánh 1)
                </Link>
              </li>
              <li>Trung tâm Vắc xin</li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  18006928 (Nhánh 2)
                </Link>
              </li>
              <li>Góp ý, khiếu nại</li>
              <li>
                <Link href="#" className="hover:underline text-blue-600">
                  18006928 (Nhánh 3)
                </Link>
              </li>
            </ul>
            <h2 className="font-bold mt-4">CHỨNG NHẬN BỞI</h2>
            <div className="mt-2 flex items-center space-x-4">
              <Image src={IMAGES.ImageIconChungNhan} alt="DMCA Protected" className="w-15" width={60} />
              <Image src={IMAGES.ImageIconChungNhan2} alt="Supported Payment Methods" className="w-20" width={80} />
            </div>
            <h2 className="font-bold mt-4">HỖ TRỢ THANH TOÁN</h2>
            <div className="mt-2 flex items-center space-x-4">
              <Image src={IMAGES.ImageMomo} alt="Momo" className="w-15" width={60} />
              <Image src={IMAGES.ImageZaloPay} alt="ZaloPay" className="w-15" width={60} />
            </div>
          </div>

          {/* Cột 5 */}
          <div>
            <h2 className="font-bold mb-4">KẾT NỐI VỚI CHÚNG TÔI</h2>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-600 hover:underline">
                  Zalo
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white text-gray-700 py-6">
        <div className="container mx-auto text-center text-xs text-gray-600">
          © 2007 - 2025 Công ty Cổ Phần Dược Phẩm FPT Long Châu Số ĐKKD 0315275368 cấp ngày 17/09/2018 tại Sở Kế hoạch
          Đầu tư TPHCM
          <br />
          Địa chỉ: 379-381 Hai Bà Trưng, P. Võ Thị Sáu, Q.3, TP. HCM. &nbsp; • &nbsp; Số điện thoại:{" "}
          <Link href="tel:02873023456" className="text-blue-600 hover:underline">
            02873023456
          </Link>{" "}
          &nbsp; • &nbsp; Email:{" "}
          <Link href="mailto:sale@nhathuoclongchau.com.vn" className="text-blue-600 hover:underline">
            sale@nhathuoclongchau.com.vn
          </Link>{" "}
          &nbsp; • &nbsp; Người quản lý nội dung: Nguyễn Bạch Điệp
        </div>
      </div>
    </footer>
  )
}

export default Footer
