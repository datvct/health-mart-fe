'use client';

import { Button, Collapse, CollapseProps } from 'antd';
import { IoFilter } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import countries from 'i18n-iso-countries';
import viLocale from 'i18n-iso-countries/langs/vi.json';
import { CountryCheckboxFilter } from './CountryCheckboxFilter';
import { useEffect, useState } from 'react';
import { productApi } from '../lib/apis/product';
import { useSearchParams, useRouter } from 'next/navigation';

countries.registerLocale(viLocale);

const Filter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get countries with name as value
  const countryObj = countries.getNames('vi', { select: 'alias' });
  const countryOptions = Object.entries(countryObj).map(([_, name]) => ({
    label: name,
    value: name, // dùng name thay vì code
  }));

  const [brandOptions, setBrandOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await productApi.getListBrands();
        setBrandOptions(
          (res.data || []).map((brand: string) => ({
            label: brand,
            value: brand,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // --- Helper để update URL params ---
  const updateQueryParam = (key: string, values: string[]) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Remove existing values
    current.delete(key);

    // Add new values
    values.forEach((v) => current.append(key, v));

    router.push(`?${current.toString()}`);
  };

  // --- Các handler filter ---
  const handleCountryChange = (values: string[]) => {
    updateQueryParam('country', values);
  };

  const handleBrandChange = (values: string[]) => {
    updateQueryParam('brand', values);
  };

  const handlePriceFilter = (priceValue: string) => {
    updateQueryParam('price', [priceValue]);
  };

  // --- Các giá trị mặc định từ URL ---
  const selectedCountries = searchParams.getAll('country');
  const selectedBrands = searchParams.getAll('brand');
  const selectedPrice = searchParams.get('price');

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Giá bán',
      className: 'font-medium',
      children: (
        <div className="font-normal flex flex-col gap-3">
          <Button
            type={selectedPrice === 'under_100' ? 'primary' : 'default'}
            onClick={() => handlePriceFilter('under_100')}
          >
            Dưới 100.000đ
          </Button>
          <Button
            type={selectedPrice === '100_300' ? 'primary' : 'default'}
            onClick={() => handlePriceFilter('100_300')}
          >
            100.000đ đến 300.000đ
          </Button>
          <Button
            type={selectedPrice === '300_500' ? 'primary' : 'default'}
            onClick={() => handlePriceFilter('300_500')}
          >
            300.000đ đến 500.000đ
          </Button>
          <Button
            type={selectedPrice === 'above_500' ? 'primary' : 'default'}
            onClick={() => handlePriceFilter('above_500')}
          >
            Trên 500.000đ
          </Button>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Nước sản xuất',
      className: 'font-medium border-b-1 border-[#000]',
      children: (
        <CountryCheckboxFilter
          options={countryOptions}
          onChange={handleCountryChange}
          value={selectedCountries}
        />
      ),
    },
    {
      key: '3',
      label: 'Thương hiệu',
      className: 'font-medium border-b-1 border-[#000]',
      children: (
        <CountryCheckboxFilter
          options={brandOptions}
          onChange={handleBrandChange}
          value={selectedBrands}
        />
      ),
    },
  ];

  return (
    <div className="bg-white w-[850px] rounded-xl p-4 max-h-[300px] overflow-y-auto overflow-x-hidden hidden md:block lg:block xl:block 2xl:block">
      <div className="flex gap-2 items-center">
        <IoFilter />
        <h3 className="font-semibold text-[#020b27]">Bộ lọc nâng cao</h3>
      </div>
      <div className="">
        <Collapse
          items={items}
          defaultActiveKey={['1']}
          bordered={false}
          ghost={true}
          expandIcon={({ isActive }) => (
            <IoIosArrowDown className={`${isActive ? 'rotate-180' : ''} transition-transform`} />
          )}
        />
      </div>
    </div>
  );
};

export { Filter };
