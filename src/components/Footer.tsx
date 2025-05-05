import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FOOTER } from '../constants/images';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { productApi } from '../lib/apis/product';

const Footer = async () => {
  let data = null;

  try {
    const response = await productApi.getListPharmacyStocks();
    data = response.data;
  } catch (error) {
    console.log('Failed to fetch pharmacy stocks:', error);
  }

  const pharmacyCount = data?.length ?? 0;
  return (
    <footer className="bg-blue-600 text-white text-sm">
      {/* Phần Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt />
            <h1 className="text-lg font-bold text-left">
              Xem hệ thống {pharmacyCount} nhà thuốc trên toàn quốc
            </h1>
          </div>
          <Link className="mt-4 md:mt-0 bg-white text-blue-600 py-2 px-4 rounded-3xl font-medium hover:shadow-md hover:bg-gray-100" href="/he-thong-cua-hang">
            Xem danh sách nhà thuốc
          </Link>
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

                <h2 className="font-bold mb-4">CHỨNG NHẬN BỞI</h2>
                <div className="flex flex-wrap justify-start gap-1 items-center">
                  <Image
                    src={FOOTER.Certificate.Footer_Certificate_1}
                    alt="Connect methods"
                    width={25}
                    height={10}
                    className="cursor-pointer"
                  />
                  <Image
                    src={FOOTER.Certificate.Footer_Certificate_2}
                    alt="Connect methods"
                    width={42}
                    height={10}
                    className="cursor-pointer"
                  />
                  <Image
                    src={FOOTER.Certificate.Footer_Certificate_3}
                    alt="Connect methods"
                    width={90}
                    height={33}
                    className="cursor-pointer"
                  />
                </div>

                <h2 className="font-bold mb-4">HỖ TRỢ THANH TOÁN</h2>
                <div className="flex flex-wrap gap-4 justify-start">
                  {FOOTER.Payment.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt="Connect methods"
                      width={36}
                      height={19}
                      className="cursor-pointer"
                    />
                  ))}
                </div>
              </ul>
            </div>

            {/* Cột 5 - KẾT NỐI VỚI CHÚNG TÔI */}
            <div className="text-left">
              <h2 className="font-bold mb-4">KẾT NỐI VỚI CHÚNG TÔI</h2>
              <div className="flex gap-2">
                {FOOTER.Connect.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt="Connect methods"
                    width={28}
                    height={28}
                    className="cursor-pointer"
                  />
                ))}
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
            <ul className="mt-2 flex justify-between">
              <div>
                <li>Tư vấn mua hàng</li>
                <li className="mt-2">Trung tâm Vắc xin</li>
                <li className="mt-2">Góp ý, khiếu nại</li>
              </div>
              <div>
                <li>
                  <Link href="tel:18006928" className="hover:underline text-blue-600">
                    18006928 (Nhánh 1)
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="tel:18006928" className="hover:underline text-blue-600">
                    18006928 (Nhánh 2)
                  </Link>
                </li>
                <li className="mt-2">
                  <Link href="tel:18006928" className="hover:underline text-blue-600">
                    18006928 (Nhánh 3)
                  </Link>
                </li>
              </div>
            </ul>
          </details>

          {/* KẾT NỐI VỚI CHÚNG TÔI */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              KẾT NỐI VỚI CHÚNG TÔI
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <div className="mt-2 flex gap-2">
              {FOOTER.Connect.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Connect methods"
                  width={28}
                  height={28}
                  className="cursor-pointer"
                />
              ))}
            </div>
          </details>

          {/* CHỨNG NHẬN BỞI & HỖ TRỢ THANH TOÁN */}
          <details className="border-b pb-2">
            <summary className="flex justify-between items-center text-left font-bold cursor-pointer">
              CHỨNG NHẬN BỞI & HỖ TRỢ THANH TOÁN
              <ChevronDown className="transform transition-transform duration-300" size={20} />
            </summary>
            <div className="mt-2">
              <div className="grid grid-cols-3 gap-2 place-items-center">
                <Image
                  src={FOOTER.Certificate.Footer_Certificate_1}
                  alt="Connect methods"
                  width={96}
                  height={56}
                  className="cursor-pointer"
                />
                <Image
                  src={FOOTER.Certificate.Footer_Certificate_2}
                  alt="Connect methods"
                  width={96}
                  height={56}
                  className="cursor-pointer"
                />
                <Image
                  src={FOOTER.Certificate.Footer_Certificate_3}
                  alt="Connect methods"
                  width={96}
                  height={56}
                  className="cursor-pointer"
                />
                {FOOTER.Payment.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt="Connect methods"
                    width={36}
                    height={19}
                    className="cursor-pointer"
                  />
                ))}
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
            <p>Địa chỉ: 379-381 Hai Bà Trưng, P. Võ Thị Sáu, Q.3, TP. HCM</p>
            <p>
              Điện thoại:{' '}
              <Link href="tel:02873023456" className="hover:underline text-blue-600">
                02873023456
              </Link>{' '}
              • Email:{' '}
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
