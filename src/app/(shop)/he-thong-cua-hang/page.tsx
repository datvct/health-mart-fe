'use client';
import { Button, GetProps, Input, Radio, RadioChangeEvent, Select } from 'antd';
import Search from 'antd/es/input/Search';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AntdBreadcrumb from '../../../components/Breadcrumb';
import { PHARMACY_SHOP } from '../../../constants/images';

interface District {
  name: string;
  code: number;
}

interface Province {
  name: string;
  code: number;
  districts: District[];
}

const allOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' },
  { value: 6, label: 'Option 6' },
  { value: 7, label: 'Option 7' },
  { value: 8, label: 'Option 8' },
  { value: 9, label: 'Option 9' },
  { value: 10, label: 'Option 10' },
  { value: 11, label: 'Option 11' },
  { value: 12, label: 'Option 12' },
  // ... add more as needed
];

const NhaThuocPage = () => {
  type SearchProps = GetProps<typeof Input.Search>;
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState<number | null>(null);
  const [value, setValue] = useState(1);
  const [visibleCount, setVisibleCount] = useState(5);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/?depth=2')
      .then((res) => res.json())
      .then((data) => {
        setProvinces(data);
      });
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
      <h1>Hệ thống nhà thuốc trên toàn quốc</h1>
      <p>Thời gian hoạt động: 6:00 - 23:00 hằng ngày (Thay đổi tùy theo từng nhà thuốc)</p>
      <div className="flex gap-4">
        <div className="bg-white w-1/3 p-5 rounded-2xl">
          <p>Tìm kiếm nhà thuốc</p>
          <Search placeholder="Tìm bằng tên đường và tỉnh thành" onSearch={onSearch} enterButton />
          <div>
            <div></div>
            <p>Hoặc</p>
            <div></div>
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
              onChange={onChange}
              value={value}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              {allOptions.slice(0, visibleCount).map((opt) => (
                <Radio key={opt.value} value={opt.value}>
                  {opt.label}
                </Radio>
              ))}

              {visibleCount < allOptions.length && (
                <Button>
                  <span onClick={handleLoadMore} style={{ cursor: 'pointer', color: '#1890ff' }}>
                    Xem thêm nhà thuốc
                  </span>
                </Button>
              )}
            </Radio.Group>
          </div>
        </div>
        <div className="bg-white w-2/3 p-5 rounded-2xl">
          <p>
            Long Châu là hệ thống nhà thuốc bán lẻ & phân phối trải khắp 63 tỉnh thành luôn luôn mở
            rộng để phục vụ Khách hàng trên toàn quốc, cung cấp dịch vụ bán hàng và phục vụ hàng
            đầu:
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2 items-start">
              <Image
                src={PHARMACY_SHOP.PHARMACY_SHOP_1}
                alt="nhà thuốc icon"
                width={32}
                height={32}
              ></Image>
              <div>
                <h3>Nhà thuốc chính hãng</h3>
                <p>Sở hữu danh mục thuốc chính hãng vừa đa dạng, phong phú lại vừa chuyên sâu.</p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Image
                src={PHARMACY_SHOP.PHARMACY_SHOP_2}
                alt="nhà thuốc icon"
                width={32}
                height={32}
              ></Image>
              <div>
                <h3>Chuyên thuốc theo toa</h3>
                <p>
                  Long Châu có đầy đủ các loại thuốc để có thể đáp đứng đầy đủ nhu cầu của người
                  dùng.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Image
                src={PHARMACY_SHOP.PHARMACY_SHOP_3}
                alt="nhà thuốc icon"
                width={32}
                height={32}
              ></Image>
              <div>
                <h3>Dược sĩ tư vấn tại chỗ</h3>
                <p>
                  Với kinh nghiệm và chuyên môn cao với 4 tiêu chí: đúng thuốc, đúng liều, đúng cách
                  và đúng giá.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Image
                src={PHARMACY_SHOP.PHARMACY_SHOP_4}
                alt="nhà thuốc icon"
                width={32}
                height={32}
              ></Image>
              <div>
                <h3>Mua lẻ với giá sỉ</h3>
                <p>
                  Sản phẩm đúng chất lượng với giá thấp hơn so với thị trường chung, tương đương với
                  giá bán sỉ.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Image
                src={PHARMACY_SHOP.PHARMACY_SHOP_5}
                alt="nhà thuốc icon"
                width={32}
                height={32}
              ></Image>
              <div>
                <h3>Giao hàng tận nơi</h3>
                <p>
                  Giao hàng cực nhanh trong khu vực Tp.HCM và chuyển hàng đến tận nhà tại các tỉnh
                  thành khác.
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <Image
                src={PHARMACY_SHOP.PHARMACY_SHOP_6}
                alt="nhà thuốc icon"
                width={32}
                height={32}
              ></Image>
              <div>
                <h3>Đổi trả nguyên giá</h3>
                <p>
                  Chỉ cần đọc SĐT hoặc giữ lại hóa đơn, bạn sẽ được đổi trả / hoàn tiền đã mua trong
                  vòng 30 ngày.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NhaThuocPage;
