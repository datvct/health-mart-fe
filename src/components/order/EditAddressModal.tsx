// components/order/EditAddressModal.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useVietnamLocations } from '../../hook/useVietnamLocations';
import { userApi } from '../../lib/apis/user';

interface Address {
  id: number;
  recipientName: string;
  address_street: string;
  ward: string;
  district: string;
  city: string;
}

interface EditAddressModalProps {
  address: Address;
  onClose: () => void;
  onBack: () => void;
  onUpdate: (updatedAddress: Address) => void;
  onDelete: (deletedAddress: Address) => void;
}


const ErrorIcon = () => (
  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2C17.523 2 22 6.478 22 12C22 17.522 17.523 22 12 22C6.477 22 2 17.522 2 12C2 6.478 6.477 2 12 2ZM12.0018 15.0037C11.4503 15.0037 11.0031 15.4508 11.0031 16.0024C11.0031 16.5539 11.4503 17.001 12.0018 17.001C12.5533 17.001 13.0005 16.5539 13.0005 16.0024C13.0005 15.4508 12.5533 15.0037 12.0018 15.0037ZM11.9996 7C11.4868 7.00018 11.0643 7.38638 11.0067 7.88374L11 8.00036L11.0018 13.0012L11.0086 13.1179C11.0665 13.6152 11.4893 14.0011 12.0022 14.0009C12.515 14.0007 12.9375 13.6145 12.9951 13.1171L13.0018 13.0005L13 7.99964L12.9932 7.88302C12.9353 7.3857 12.5125 6.99982 11.9996 7Z"
      fill="currentColor"
    />
  </svg>
);

const EditAddressModal = ({
  address,
  onClose,
  onBack,
  onUpdate,
  onDelete,
}: EditAddressModalProps) => {
  const { provinces, loading: locationsLoading, error: locationsError } = useVietnamLocations();

  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [addressStreet, setAddressStreet] = useState('');

  const [provinceError, setProvinceError] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [wardError, setWardError] = useState('');
  const [addressError, setAddressError] = useState('');

  useEffect(() => {
    if (address) {
      setProvince(address.city || '');
      setDistrict(address.district || '');
      setWard(address.ward || '');
      setAddressStreet(address.address_street || '');
    }
  }, [address]);

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
      {/* Modal container */}
      <div className="bg-white rounded-xl p-6 relative w-full max-w-[500px] max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-blue-600">
            Quay lại
          </button>
          <h2 className="text-2xl font-bold text-center flex-1">Chỉnh sửa địa chỉ</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <hr className="mb-4" />

        {/* Body: nhập thông tin địa chỉ */}
        <div className="space-y-4">
          {/* Tỉnh/Thành phố */}
          <div>
            <label className="block text-gray-600 mb-1">Tỉnh/Thành phố</label>
            {locationsLoading ? (
              <p>Loading...</p>
            ) : locationsError ? (
              <p>Error loading locations</p>
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
              <p className="flex items-center text-red-600 text-xs mt-1">
                <ErrorIcon /> {provinceError}
              </p>
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
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {districtError && (
              <p className="flex items-center text-red-600 text-xs mt-1">
                <ErrorIcon /> {districtError}
              </p>
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
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
            {wardError && (
              <p className="flex items-center text-red-600 text-xs mt-1">
                <ErrorIcon /> {wardError}
              </p>
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
              className={`w-full border rounded p-2 mt-1 ${
                addressError ? 'border-red-600' : ''
              }`}
            />
            {addressError && (
              <p className="flex items-center text-red-600 text-xs mt-1">
                <ErrorIcon /> {addressError}
              </p>
            )}
          </div>
        </div>

        {/* Nút Xóa và Cập nhật */}
        <div className="mt-6 space-y-4">
          <button
            className="w-full border border-red-500 text-red-500 py-3 rounded-full text-lg"
            onClick={async () => {
              if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return;
              try {
                await userApi.deleteAddress(address.id);
                toast.success("Xóa địa chỉ thành công.");
                onDelete(address);
                onClose();
              } catch (error) {
                console.error(error);
                toast.error("Lỗi khi xóa địa chỉ");
              }
            }}
          >
            Xóa địa chỉ
          </button>
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-full text-lg"
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
              if (!window.confirm("Bạn có chắc chắn muốn cập nhật địa chỉ này?")) return;
              const updatedAddress = {
                address_street: addressStreet,
                ward,
                district,
                city: province,
              };
              try {
                await userApi.updateAddress(address.id, updatedAddress);
                toast.success("Cập nhật địa chỉ thành công.");
                onUpdate({ ...address, ...updatedAddress });
                onClose();
              } catch (error) {
                console.error(error);
                toast.error("Lỗi khi cập nhật địa chỉ");
              }
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
