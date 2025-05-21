// components/order/NewAddressModal.tsx
'use client';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useVietnamLocations } from '../../hook/useVietnamLocations';
import { userApi } from '../../lib/apis/user';
import { RootState } from '../../lib/store';

interface Address {
  id: number;
  address_street: string;
  ward: string;
  district: string;
  city: string;
}

type NewAddress = Omit<Address, 'id'>;

interface NewAddressModalProps {
  onClose: () => void;
  onSave: (newAddress: NewAddress) => void;
  onBack: () => void;
}


const NewAddressModal = ({ onClose, onSave, onBack }: NewAddressModalProps) => {
  const { provinces, loading: locationsLoading, error: locationsError } = useVietnamLocations();
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [addressStreet, setAddressStreet] = useState('');

  const [provinceError, setProvinceError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [wardError, setWardError] = useState('');
  const [addressError, setAddressError] = useState('');

  const districtOptions = useMemo(() => {
    if (!province) return [];
    const p = provinces.find((p) => p.name === province);
    return p ? p.districts.map((d) => d.name) : [];
  }, [province, provinces]);

  const wardOptions = useMemo(() => {
    if (!province || !district) return [];
    const p = provinces.find((p) => p.name === province);
    if (!p) return [];
    const d = p.districts.find((d) => d.name === district);
    return d ? d.wards.map((w) => w.name) : [];
  }, [province, district, provinces]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 relative w-full max-w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-blue-600">
            Quay lại
          </button>
          <h2 className="text-2xl font-bold text-center flex-1">
            Thêm địa chỉ mới
          </h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <hr className="mb-4" />
        <div className="space-y-4">
          {/* Tỉnh/Thành phố */}
          <div>
            <label className="block text-gray-600 mb-1">Tỉnh/Thành phố</label>
            {locationsLoading ? (
              <p>Loading...</p>
            ) : locationsError ? (
              <p>Error loading locations.</p>
            ) : (
              <select
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setProvinceError('');
                  setDistrict('');
                  setWard('');
                }}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            )}
            {provinceError && (
              <p className="flex items-center text-red-600 text-xs mt-1">{provinceError}</p>
            )}
          </div>
          {/* Quận/Huyện */}
          <div>
            <label className="block text-gray-600 mb-1">Quận/Huyện</label>
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setDistrictError('');
                setWard('');
              }}
              disabled={!province}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">Chọn quận/huyện</option>
              {districtOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {districtError && (
              <p className="flex items-center text-red-600 text-xs mt-1">{districtError}</p>
            )}
          </div>
          {/* Phường/Xã */}
          <div>
            <label className="block text-gray-600 mb-1">Phường/Xã</label>
            <select
              value={ward}
              onChange={(e) => {
                setWard(e.target.value);
                setWardError('');
              }}
              disabled={!district}
              className="w-full border rounded p-2 text-sm"
            >
              <option value="">Chọn phường/xã</option>
              {wardOptions.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            {wardError && (
              <p className="flex items-center text-red-600 text-xs mt-1">{wardError}</p>
            )}
          </div>
          {/* Địa chỉ cụ thể */}
          <div className="mt-2">
            <label className="block text-gray-600">Địa chỉ cụ thể</label>
            <input
              type="text"
              placeholder="Nhập địa chỉ cụ thể"
              value={addressStreet}
              onChange={(e) => {
                const value = e.target.value;
                setAddressStreet(value);
                if (value.trim() === '') {
                  setAddressError('Thông tin bắt buộc. Vui lòng nhập đầy đủ.');
                } else {
                  setAddressError('');
                }
              }}
              className={`w-full border rounded p-2 mt-1 ${addressError ? 'border-red-600' : ''}`}
            />
            {addressError && (
              <p className="flex items-center text-red-600 text-xs mt-1">{addressError}</p>
            )}
          </div>
        </div>
        <button
          className="w-full bg-[#1B58DF] text-white py-3 rounded-full text-lg mt-4"
          onClick={async () => {
            let valid = true;
            if (!province) {
              setProvinceError('Tỉnh/Thành phố không được để trống');
              valid = false;
            }
            if (!district) {
              setDistrictError('Quận/Huyện không được để trống');
              valid = false;
            }
            if (!ward) {
              setWardError('Phường/Xã không được để trống');
              valid = false;
            }
            if (!addressStreet.trim()) {
              setAddressError('Thông tin bắt buộc. Vui lòng nhập đầy đủ.');
              valid = false;
            }
            if (!valid) {
              toast.error("Vui lòng nhập đầy đủ thông tin địa chỉ");
              return;
            }
            const newAddress = {
              address_street: addressStreet,
              ward,
              district,
              city: province,
              userId: user?.id,
            };
            try {
              await userApi.createAddress(newAddress);
              toast.success("Thêm địa chỉ thành công.");
              onSave(newAddress);
              onClose();
            } catch (error) {
              console.error(error);
              toast.error("Lỗi khi thêm địa chỉ");
            }
          }}
        >
          Hoàn tất
        </button>
      </div>
    </div>
  );
};

export default NewAddressModal;
