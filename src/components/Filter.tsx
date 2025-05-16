import { Button, Collapse, CollapseProps } from 'antd';
import { IoFilter } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import countries from 'i18n-iso-countries';
import viLocale from 'i18n-iso-countries/langs/vi.json';
import { CountryCheckboxFilter } from './CountryCheckboxFilter';

countries.registerLocale(viLocale);

const Filter = () => {
  const countryObj = countries.getNames('vi', { select: 'alias' });
  const countryOptions = Object.entries(countryObj).map(([code, name]) => ({
    label: name,
    value: code,
  }));
  const onChange = (checkedValues: string[]) => {
    console.log('Selected countries:', checkedValues);
  };
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Giá bán',
      className: 'font-medium',
      children: (
        <div className="font-normal flex flex-col gap-3">
          <Button>Dưới 100.000đ</Button>
          <Button>100.000đ đến 300.000đ</Button>
          <Button>300.000đ đến 500.000đ</Button>
          <Button>Trên 500.000đ</Button>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Nước sản xuất',
      className: 'font-medium border-b-1 border-[#000]',
      children: <CountryCheckboxFilter options={countryOptions} onChange={onChange} />,
    },
    {
      key: '3',
      label: 'Thương hiệu',
      className: 'font-medium border-b-1 border-[#000]',
      children: <CountryCheckboxFilter options={countryOptions} onChange={onChange} />,
    },
  ];
  return (
    <div className="bg-white w-[850px] rounded-xl p-4 max-h-[300px] overflow-y-auto overflow-x-hidden hidden md:block lg:block xl:block 2xl:block">
      <div className="flex gap-2 items-center">
        <IoFilter />
        <h3 className="font-semibold text-[#020b27]">Bộ lọc nâng cao</h3>
      </div>
      <div className=''>
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
