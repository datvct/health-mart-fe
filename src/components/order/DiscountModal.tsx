// components/order/DiscountModal.tsx
'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { orderApi, Voucher } from '../../lib/apis/order';

interface DiscountModalProps {
  onClose: () => void;
  onSelectVoucher: (voucher: Voucher) => void;
}

const DiscountModal = ({ onClose, onSelectVoucher }: DiscountModalProps) => {
  const [inputCode, setInputCode] = useState('');
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearchDiscountCode = async () => {
    if (!inputCode.trim()) {
      toast.error('Vui lòng nhập mã ưu đãi');
      return;
    }
    setLoading(true);
    try {
      const res = await orderApi.getDiscountCodeByCode(inputCode.trim());
      if (res && res.code) {
        const now = new Date();
        const validFrom = new Date(res.validFrom);
        const validUntil = new Date(res.validUntil);
        if (now < validFrom || now > validUntil) {
          toast.error('Mã đã hết hiệu lực');
          setVoucher(null);
        } else {
          setVoucher(res);
        }
      } else {
        setVoucher(null);
        toast.error('Không tìm thấy mã ưu đãi hợp lệ');
      }
    } catch {
      toast.error('Không tìm thấy mã ưu đãi hợp lệ');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 relative w-full max-w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-center flex-1">Ưu đãi dành cho bạn</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>
        <div className="border-t border-dashed mb-4" />
        <div className="flex items-center bg-white p-2 rounded mb-4">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l"
          />
          <button
            onClick={handleSearchDiscountCode}
            disabled={!inputCode.trim() || loading}
            className={`p-2 rounded-r ${inputCode.trim() && !loading ? 'bg-[#1B59DE] cursor-pointer' : 'bg-gray-300 cursor-not-allowed'} text-white`}
          >
            {loading ? 'Đang tải...' : 'Xác nhận'}
          </button>
        </div>
        <div className={`bg-[#EDF0F3] flex justify-center mb-4 ${voucher ? 'items-start' : 'items-center'} w-full max-w-[450px] h-auto min-h-[400px]`}>
          {voucher ? (
            <div className="text-top w-full">
              <p className="text-lg text-gray-600 mb-4">Mã ưu đãi tìm được:</p>
              <div className="bg-white p-4 rounded shadow w-full max-w-[550px] h-[100px]">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-xl">{voucher.code}</p>
                  <p className="font-bold text-xl text-gray-600">
                    {voucher.discountType === 'PERCENTAGE'
                      ? `Giảm ${voucher.discountValue}%`
                      : `Giảm ${voucher.discountValue.toLocaleString('vi-VN')}đ`}
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Hiệu lực: {voucher.validFrom} đến {voucher.validUntil}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-lg text-gray-600">
              Nhập mã giảm giá để được áp dụng những ưu đãi
            </p>
          )}
        </div>
        <div className="bg-white p-4 rounded w-full max-w-[600px]">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold">Vui lòng chọn ưu đãi</span>
          </div>
          <button
            className="mt-4 w-full h-[59px] bg-blue-600 text-white rounded-full text-xl"
            onClick={() => {
              if (!voucher) {
                toast.error('Chưa có ưu đãi nào được chọn');
                return;
              }
              const usageCount = Number(voucher.usageCount || 0);
              const usageLimit = Number(voucher.usageLimit || 0);
              if (usageCount >= usageLimit) {
                toast.error('Mã đã hết số lượt sử dụng');
                return;
              }
              onSelectVoucher(voucher);
              onClose();
            }}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
