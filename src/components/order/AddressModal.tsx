// components/order/AddressModal.tsx
'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { userApi } from '../../lib/apis/user';

export interface Address {
  id: number;
  recipientName: string;
  address_street: string;
  ward: string;
  district: string;
  city: string;
}

interface AddressModalProps {
  userId: number;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
  onAddNew: () => void;
  onEditAddress: (address: Address) => void;
}

// Component con hiển thị nút xác nhận và nút Thêm địa chỉ mới
const AddressModalFooter = ({
  onConfirm,
  onAddNew,
}: {
  onConfirm: () => void;
  onAddNew: () => void;
}) => {
  return (
    <div className="flex gap-4 mt-4">
      <button
        className="flex-1 py-2 bg-blue-600 text-white rounded"
        onClick={onConfirm}
      >
        Xác nhận
      </button>
      <button
        className="flex-1 py-2 border border-[#1B58DF] text-[#1B58DF] rounded"
        onClick={onAddNew}
      >
        Thêm địa chỉ mới
      </button>
    </div>
  );
};

const AddressModal = ({
  userId,
  onClose,
  onSelectAddress,
  onAddNew,
  onEditAddress,
}: AddressModalProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    userApi
      .getAddressByUser(userId)
      .then((res) => {
        setAddresses(res.data || []);
      })
      .catch((err) => {
        console.error('Error fetching addresses:', err);
      });
  }, [userId]);

  const handleConfirm = () => {
    if (!selectedAddress) {
      toast.error('Vui lòng chọn địa chỉ');
      return;
    }
    onSelectAddress(selectedAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal container */}
      <div className="bg-white rounded-xl p-6 relative w-full max-w-[500px] max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-center flex-1">
            Chọn địa chỉ nhận hàng
          </h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <hr className="mb-4" />

        {/* Danh sách địa chỉ (vùng cuộn chỉ bao quanh list) */}
        <div className="overflow-y-auto max-h-[60vh] space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`border p-4 rounded flex justify-between items-center cursor-pointer ${
                selectedAddress && selectedAddress.id === address.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div>
                <p className="font-medium">{address.recipientName}</p>
                <p className="text-sm">
                  {address.address_street}, {address.ward}, {address.district},{' '}
                  {address.city}
                </p>
              </div>
              {/* Nút Sửa */}
              <button
                className="text-blue-600 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditAddress(address);
                }}
              >
                Sửa
              </button>
            </div>
          ))}
        </div>

        {/* Footer: nút xác nhận và Thêm địa chỉ mới */}
        <AddressModalFooter onConfirm={handleConfirm} onAddNew={onAddNew} />
      </div>
    </div>
  );
};

export default AddressModal;
