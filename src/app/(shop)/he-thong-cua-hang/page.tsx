"use client";

import { Button, GetProps, Input, Radio, RadioChangeEvent, Select } from 'antd';
import Search from 'antd/es/input/Search';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AntdBreadcrumb from '../../../components/Breadcrumb';
import { PHARMACY_SHOP } from '../../../constants/images';
import { productApi } from '../../../lib/apis/product';

interface District {
  name: string;
  code: number;
}

interface Province {
  name: string;
  code: number;
  districts: District[];
}

interface Pharmacy {
  pharmacy_id: number;
  name: string;
  address_street: string;
  ward: string;
  district: string;
  city: string;
}

const NhaThuocPage = () => {
  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  // State cho danh sách nhà thuốc (pharmacy stocks)
  const [pharmacyOptions, setPharmacyOptions] = useState<Pharmacy[]>([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null);

  const onRadioChange = (e: RadioChangeEvent) => {
    setSelectedPharmacy(e.target.value);
  };

  useEffect(() => {
    // Lấy danh sách Tỉnh/Thành theo API hiện có từ open-api.vn
    fetch('https://provinces.open-api.vn/api/?depth=2')
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      });
  }, []);

  useEffect(() => {
    // Gọi API getListPharmacyStocks để lấy danh sách nhà thuốc
    const fetchPharmacies = async () => {
      try {
        const data = await productApi.getListPharmacyStocks();
        // Dữ liệu trả về ở key data là mảng các pharmacy
        if (data && Array.isArray(data)) {
          setPharmacyOptions(data);
        } else {
          // Nếu dữ liệu trả về là đối tượng chứa mảng,
          // ví dụ: { data: [...], message: "", statusCode: 200 }
          setPharmacyOptions(data.data || []);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà thuốc:', error);
      }
    };
    fetchPharmacies();
  }, []);

  const handleProvinceChange = (provinceCode: number) => {
    setSelectedProvinceCode(provinceCode);
    const selectedProvince = provinces.find((p) => p.code === provinceCode);
    setDistricts(selectedProvince?.districts || []);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="p-10">
      <AntdBreadcrumb
        slug={['he-thong-cua-hang']}
        customTitles={{ 'he-thong-cua-hang': 'Hệ thống cửa hàng' }}
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Hệ thống nhà thuốc trên toàn quốc</h1>
          <p className="text-[#4a4f63] text-sm">
            Thời gian hoạt động: 6:00 - 23:00 hằng ngày (Thay đổi tùy theo từng nhà thuốc)
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white w-1/3 p-5 rounded-2xl flex flex-col gap-2">
            <p className="font-medium text-[#020b27] border-b">Tìm kiếm nhà thuốc</p>
            <Search
              placeholder="Tìm bằng tên đường và tỉnh thành"
              onSearch={onSearch}
              enterButton
            />
            <div className="flex items-center justify-center gap-2">
              <div className="border w-2/3"></div>
              <p className="text-center text-sm">Hoặc</p>
              <div className="border w-2/3"></div>
            </div>
            <Select
              placeholder="Chọn Tỉnh/Thành"
              onChange={handleProvinceChange}
              options={provinces.map((province) => ({
                label: province.name,
                value: province.code,
              }))}
            />
            <Select
              placeholder="Chọn Quận/Huyện"
              disabled={!selectedProvinceCode}
              options={districts.map((district) => ({
                label: district.name,
                value: district.code,
              }))}
            />
            <div>
              <p>Nhà thuốc gợi ý</p>
              <Radio.Group
                onChange={onRadioChange}
                value={selectedPharmacy}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                {pharmacyOptions.slice(0, visibleCount).map((pharmacy) => (
                  <Radio key={pharmacy.pharmacy_id} value={pharmacy.pharmacy_id}>
                    <div className="flex flex-col mt-1">
                      <span>{pharmacy.address_street}, {pharmacy.ward}, {pharmacy.district}, {pharmacy.city}</span>
                    </div>
                  </Radio>
                ))}
                {visibleCount < pharmacyOptions.length && (
                  <Button type="link" onClick={handleLoadMore} style={{ padding: 0 }}>
                    Xem thêm nhà thuốc
                  </Button>
                )}
              </Radio.Group>
            </div>
          </div>
          <div className="bg-white w-2/3 p-5 rounded-2xl text-[#4a4f63] text-sm flex flex-col gap-4">
            <p>
              Long Châu là hệ thống nhà thuốc bán lẻ & phân phối trải khắp 63 tỉnh thành luôn luôn
              mở rộng để phục vụ Khách hàng trên toàn quốc, cung cấp dịch vụ bán hàng và phục vụ
              hàng đầu:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex gap-2 items-start">
                <Image
                  src={PHARMACY_SHOP.PHARMACY_SHOP_1}
                  alt="nhà thuốc icon"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-semibold">Nhà thuốc chính hãng</h3>
                  <p>Sở hữu danh mục thuốc chính hãng vừa đa dạng, phong phú lại vừa chuyên sâu.</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Image
                  src={PHARMACY_SHOP.PHARMACY_SHOP_2}
                  alt="nhà thuốc icon"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-semibold">Chuyên thuốc theo toa</h3>
                  <p>
                    Long Châu có đầy đủ các loại thuốc để có thể đáp ứng đầy đủ nhu cầu của người dùng.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Image
                  src={PHARMACY_SHOP.PHARMACY_SHOP_3}
                  alt="nhà thuốc icon"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-semibold">Dược sĩ tư vấn tại chỗ</h3>
                  <p>
                    Với kinh nghiệm và chuyên môn cao với 4 tiêu chí: đúng thuốc, đúng liều, đúng cách và đúng
                    giá.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Image
                  src={PHARMACY_SHOP.PHARMACY_SHOP_4}
                  alt="nhà thuốc icon"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-semibold">Mua lẻ với giá sỉ</h3>
                  <p>
                    Sản phẩm đúng chất lượng với giá thấp hơn so với thị trường chung, tương đương với giá bán sỉ.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Image
                  src={PHARMACY_SHOP.PHARMACY_SHOP_5}
                  alt="nhà thuốc icon"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-semibold">Giao hàng tận nơi</h3>
                  <p>
                    Giao hàng cực nhanh trong khu vực Tp.HCM và chuyển hàng đến tận nhà tại các tỉnh thành khác.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Image
                  src={PHARMACY_SHOP.PHARMACY_SHOP_6}
                  alt="nhà thuốc icon"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="font-semibold">Đổi trả nguyên giá</h3>
                  <p>
                    Chỉ cần đọc SĐT hoặc giữ lại hóa đơn, bạn sẽ được đổi trả/hoàn tiền đã mua trong vòng 30 ngày.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhaThuocPage;
