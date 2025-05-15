'use client';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CartItem, useCart } from '../../hook/useCart';
import EmptyCart from './EmptyCart';

export default function CartInfo() {
  const { getCart } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);
  return cartItems.length > 0 ? (
    <div className="flex flex-col lg:flex-row gap-5 relative items-start">
      {/* Left side - Cart Items */}
      <div className="bg-white rounded-xl flex-1 overflow-hidden">
        {/* Header row */}
        <div className="py-2 px-4 flex items-center text-sm font-medium border-b">
          <div className="inline-flex items-center mr-auto">
            <input type="checkbox" checked={true} className="mr-2" id="select-all" />
            <label htmlFor="select-all">Chọn tất cả ({cartItems.length})</label>
          </div>
          <div className="hidden md:block text-center w-[10%]">Giá thành</div>
          <div className="hidden md:block text-center w-[10%] mx-4">Số lượng</div>
          <div className="hidden md:block text-center w-[10%]">Đơn vị</div>
        </div>

        {/* Render sản phẩm */}
        {cartItems.map((item, idx) => (
          <div key={idx} className="p-4 border-b">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center mr-4">
                <input type="checkbox" checked />
                <div className="p-2 border rounded-lg mr-3">
                  <Image
                    src={item.image}
                    width={48}
                    height={48}
                    alt={item.name}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-blue-600 text-sm">
                    {item.price.toLocaleString('vi-VN')}đ
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-full px-2">
                    <button className="px-2 text-gray-400" disabled>
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center bg-transparent border-x border-gray-200"
                    />
                    <button className="px-2">+</button>
                  </div>
                  <span className="text-sm">{item.variant_unit}</span>
                </div>

                <button className="text-gray-500 hover:text-red-500">🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Summary */}
      <div className="sticky top-2.5 w-full max-w-sm">
        <div className="rounded-xl p-4 bg-white space-y-3">
          <button className="w-full py-2.5 px-3 rounded-[8px] bg-[#eaeffa] text-sm font-medium flex justify-between items-center">
            <span className="text-[#1250dc] flex items-center justify-between text-[14px] font-medium">
              Áp dụng ưu đãi để được giảm giá
            </span>
            <ChevronRight color="#1250dc" />
          </button>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63] text-sm">Tổng tiền</span>
              <span className="font-semibold text-[#020b27]">126.000đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63] text-sm">Giảm giá trực tiếp</span>
              <span className="text-orange-500 font-semibold">-18.900đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63] text-sm">Giảm giá voucher</span>
              <span className="text-orange-500 font-semibold">0đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63] text-sm">Tiết kiệm được</span>
              <span className="text-orange-500 font-semibold">18.900đ</span>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-baseline">
              <div className="font-semibold text-base">Thành tiền</div>
              <div className="flex items-baseline gap-2">
                <span className="line-through text-sm text-gray-400">126.000đ</span>
                <span className="text-blue-600 text-lg font-bold">107.100đ</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-full font-medium text-sm">
            Mua hàng
          </button>

          <div className="text-[13px] text-center text-[#020b27]">
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách xử lý
            dữ liệu cá nhân của Nhà thuốc FPT Long Châu
          </div>
        </div>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}
