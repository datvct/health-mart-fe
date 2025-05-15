import { useState } from 'react';
import { Checkbox, Input } from 'antd';
const { Search } = Input;

const CountryCheckboxFilter = ({ options, onChange }: { options: { label: string; value: string }[], onChange: (v: string[]) => void }) => {
  const [search, setSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );
  const visibleOptions = filteredOptions.slice(0, visibleCount);
  const allVisibleValues = visibleOptions.map((opt) => opt.value);

  const isAllChecked = allVisibleValues.length > 0 && allVisibleValues.every((v) => checkedList.includes(v));
  const isIndeterminate = checkedList.some((v) => allVisibleValues.includes(v)) && !isAllChecked;

  const handleCheckboxChange = (values: string[]) => {
    // Kiểm tra nếu có "chọn tất cả"
    if (values.includes('__all__')) {
      const isCurrentlyAllChecked = isAllChecked;
      const newChecked = isCurrentlyAllChecked
        ? checkedList.filter((v) => !allVisibleValues.includes(v))
        : Array.from(new Set([...checkedList, ...allVisibleValues]));
      setCheckedList(newChecked);
      onChange(newChecked);
    } else {
      setCheckedList(values);
      onChange(values);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Search
        placeholder="Tìm quốc gia"
        allowClear
        onChange={(e) => setSearch(e.target.value)}
      />

      <Checkbox.Group
        value={isAllChecked ? [...checkedList, '__all__'] : checkedList}
        onChange={handleCheckboxChange}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '8px',
          maxHeight: '200px',
          overflowY: 'auto',
        }}
      >
        <Checkbox
          value="__all__"
          indeterminate={isIndeterminate}
          style={{ fontWeight: '500' }}
        >
          Chọn tất cả
        </Checkbox>

        {visibleOptions.map((opt) => (
          <Checkbox key={opt.value} value={opt.value}>
            {opt.label}
          </Checkbox>
        ))}
      </Checkbox.Group>

      {visibleCount < filteredOptions.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 5)}
          className="text-blue-500 text-sm hover:underline mt-1 text-left"
        >
          Xem thêm
        </button>
      )}
    </div>
  );
};


export { CountryCheckboxFilter };
