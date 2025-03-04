function Header() {
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
                <a href="#" className="hover:underline text-blue-600">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Hệ thống cửa hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Giấy phép kinh doanh
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Quy chế hoạt động
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách đặt cọc
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách nội dung
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách đổi trả thuốc
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách giao hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách bảo mật dữ liệu cá nhân khách hàng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách thanh toán
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Kiểm tra hóa đơn điện tử
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách thu thập và xử lý dữ liệu cá nhân
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chính sách hoàn hủy đổi trả Vắc xin
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Thông tin trung tâm bảo hành máy thiết bị y tế từng hãng
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h2 className="font-bold mb-4">DANH MỤC</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Thực phẩm chức năng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Dược mỹ phẩm
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Thuốc
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Chăm sóc cá nhân
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Trang thiết bị y tế
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Đặt thuốc online
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Trung tâm Tiêm chủng
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h2 className="font-bold mb-4">TÌM HIỂU THÊM</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Góc sức khỏe
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Tra cứu thuốc
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Tra cứu dược chất
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Tra cứu dữ liệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Bệnh thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Bệnh viện
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Đội ngũ chuyên môn
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Hoạt động xã hội
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Tin tức tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  Tin tức sự kiện
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div>
            <h2 className="font-bold mb-4">TỔNG ĐÀI (8:00-22:00)</h2>
            <ul className="space-y-2">
              <li>Tư vấn mua hàng</li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  18006928 (Nhánh 1)
                </a>
              </li>
              <li>Trung tâm Vắc xin</li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  18006928 (Nhánh 2)
                </a>
              </li>
              <li>Góp ý, khiếu nại</li>
              <li>
                <a href="#" className="hover:underline text-blue-600">
                  18006928 (Nhánh 3)
                </a>
              </li>
            </ul>
            <h2 className="font-bold mt-4">CHỨNG NHẬN BỞI</h2>
            <div className="mt-2 flex items-center space-x-4">
              <img src="/img/iconchungnhan.png" alt="DMCA Protected" className="w-15" />
              <img src="/img/iconchungnhan2.png" alt="Supported Payment Methods" className="w-20" />
            </div>
            <h2 className="font-bold mt-4">HỖ TRỢ THANH TOÁN</h2>
            <div className="mt-2 flex items-center space-x-4">
              <img src="/img/momo.png" alt="Momo" className="w-15" />
              <img src="/img/zalopay.png" alt="ZaloPay" className="w-15" />
            </div>
          </div>

          {/* Cột 5 */}
          <div>
            <h2 className="font-bold mb-4">KẾT NỐI VỚI CHÚNG TÔI</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Zalo
                </a>
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
          <a href="tel:02873023456" className="text-blue-600 hover:underline">
            02873023456
          </a>{" "}
          &nbsp; • &nbsp; Email:{" "}
          <a href="mailto:sale@nhathuoclongchau.com.vn" className="text-blue-600 hover:underline">
            sale@nhathuoclongchau.com.vn
          </a>{" "}
          &nbsp; • &nbsp; Người quản lý nội dung: Nguyễn Bạch Điệp
        </div>
      </div>
    </footer>
  )
}

export default Header
