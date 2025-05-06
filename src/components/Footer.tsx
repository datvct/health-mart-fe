import { Collapse } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FOOTER } from '../constants/images';
import { policyApi } from '../lib/apis/policy';
import { productApi } from '../lib/apis/product';
import { Policy } from '../lib/types/policies/type';

const Footer = async () => {
  const dataPolicy = await policyApi.getListPolicy();

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
          <Link
            className="mt-4 md:mt-0 bg-white text-blue-600 py-2 px-4 rounded-3xl font-medium hover:shadow-md hover:bg-gray-100"
            href="/he-thong-cua-hang"
          >
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
                {dataPolicy.map((item: Policy) => (
                  <li key={item.slug}>
                    <Link
                      href={`/chinh-sach/${item.slug}`}
                      className="hover:underline text-blue-600"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
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
          <Collapse
            ghost
            expandIconPosition="end"
            items={[
              {
                key: '1',
                label: 'VỀ CHÚNG TÔI',
                children: (
                  <ul className="ml-4 list-disc">
                    {dataPolicy.map((item: Policy) => (
                      <li key={item.slug}>
                        <Link
                          href={`/chinh-sach/${item.slug}`}
                          className="hover:underline text-blue-600"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: '2',
                label: 'DANH MỤC',
                children: (
                  <ul className="ml-4 list-disc space-y-1">
                    {[
                      'Thực phẩm chức năng',
                      'Dược mỹ phẩm',
                      'Thuốc',
                      'Chăm sóc cá nhân',
                      'Trang thiết bị y tế',
                      'Đặt thuốc online',
                      'Trung tâm Tiêm chủng',
                    ].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:underline text-blue-600">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: '3',
                label: 'TÌM HIỂU THÊM',
                children: (
                  <ul className="ml-4 list-disc space-y-1">
                    {[
                      'Góc sức khỏe',
                      'Tra cứu thuốc',
                      'Tra cứu dược chất',
                      'Tra cứu dược liệu',
                      'Bệnh thường gặp',
                      'Bệnh viện',
                      'Đội ngũ chuyên môn',
                      'Tin tức tuyển dụng',
                      'Tin tức sự kiện',
                    ].map((item) => (
                      <li key={item}>
                        <Link href="#" className="hover:underline text-blue-600">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                key: '4',
                label: 'TỔNG ĐÀI (8:00-22:00)',
                children: (
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <div>Tư vấn mua hàng</div>
                      <div className="space-y-2 text-blue-600">
                        <Link href="tel:18006928">18006928 (Nhánh 1)</Link>
                      </div>
                      <div>Trung tâm Vắc xin</div>
                      <div className="space-y-2 text-blue-600">
                        <Link href="tel:18006928">18006928 (Nhánh 2)</Link>
                      </div>
                      <div>Góp ý, khiếu nại</div>
                      <div className="space-y-2 text-blue-600">
                        <Link href="tel:18006928">18006928 (Nhánh 3)</Link>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: '5',
                label: 'KẾT NỐI VỚI CHÚNG TÔI',
                children: (
                  <div className="flex gap-2">
                    {FOOTER.Connect.map((img, index) => (
                      <Image key={index} src={img} alt="Connect" width={28} height={28} />
                    ))}
                  </div>
                ),
              },
              {
                key: '6',
                label: 'CHỨNG NHẬN & THANH TOÁN',
                children: (
                  <div className="grid grid-cols-3 gap-2 place-items-center">
                    <Image
                      src={FOOTER.Certificate.Footer_Certificate_1}
                      alt=""
                      width={96}
                      height={56}
                    />
                    <Image
                      src={FOOTER.Certificate.Footer_Certificate_2}
                      alt=""
                      width={96}
                      height={56}
                    />
                    <Image
                      src={FOOTER.Certificate.Footer_Certificate_3}
                      alt=""
                      width={96}
                      height={56}
                    />
                    {FOOTER.Payment.map((img, index) => (
                      <Image key={index} src={img} alt="Payment" width={36} height={19} />
                    ))}
                  </div>
                ),
              },
            ]}
          />
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
