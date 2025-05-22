'use client';

import { ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartItem, useCart } from '../../hook/useCart';
import { RootState } from '../../lib/store';
import { useCartStore } from '../../lib/store/cartStore';
import EmptyCart from './EmptyCart';

export default function CartInfo() {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id.toString();

  const { getCart, removeFromCart, updateQuantity } = useCart(userId);
  const [cartItems, setCartItems] = useState<(CartItem & { selected: boolean })[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const router = useRouter();

  const version = useCartStore((s) => s.version);

  useEffect(() => {
    const fetchCart = async () => {
      const latestCart = await getCart();
      setCartItems((prev) =>
        latestCart.map((item) => {
          const oldItem = prev.find(
            (c) => c.product_id === item.product_id && c.variant_unit === item.variant_unit,
          );
          return { ...item, selected: oldItem?.selected ?? true };
        }),
      );
    };

    fetchCart();
  }, [getCart, userId, version]);

  const selectedItems = cartItems.filter((item) => item.selected);

  const totalOriginal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalFinal = selectedItems.reduce((sum, item) => {
    const actualPrice = item.sale_price < item.price ? item.sale_price : item.price;
    return sum + actualPrice * item.quantity;
  }, 0);

  const discount = totalOriginal - totalFinal;

  const handleSelectItem = (index: number) => {
    setCartItems((prev) => {
      const newCart = prev.map((item, idx) =>
        idx === index ? { ...item, selected: !item.selected } : item,
      );
      const allSelected = newCart.every((item) => item.selected);
      setIsAllSelected(allSelected);
      return newCart;
    });
  };

  const handleSelectAll = () => {
    const newSelected = !isAllSelected;
    setCartItems((prev) => prev.map((item) => ({ ...item, selected: newSelected })));
    setIsAllSelected(newSelected);
  };

  const handleCheckout = () => {
    const selected = cartItems.filter((item) => item.selected);
    sessionStorage.setItem('checkoutItems', JSON.stringify(selected));
    router.push('/thanh-toan');
  };

  return cartItems.length > 0 ? (
    <div className="flex flex-col lg:flex-row gap-5 relative items-start">
      <div className="bg-white rounded-xl flex-1 overflow-hidden">
        <div className="py-2 px-4 grid grid-cols-8 text-sm font-medium border-b">
          <div className="col-span-4 flex items-center">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="mr-2"
              id="select-all"
            />
            <label htmlFor="select-all">Chọn tất cả ({cartItems.length})</label>
          </div>
          <div className="hidden sm:block text-center">Giá</div>
          <div className="hidden sm:block text-center">Số lượng</div>
          <div className="hidden sm:block text-center">Đơn vị</div>
          <div className="hidden sm:block text-center"></div>
        </div>

        {cartItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border-b flex flex-col md:grid md:grid-cols-8 md:items-center gap-3"
          >
            <div className="md:col-span-4 flex gap-3 items-start md:items-center">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => handleSelectItem(idx)}
              />
              <div className="p-2 border rounded-lg">
                <Image
                  src={item.image}
                  width={48}
                  height={48}
                  alt={item.name}
                  className="object-contain"
                />
              </div>
              <p className="font-medium text-sm line-clamp-2">{item.name}</p>
            </div>

            <div className="flex flex-col sm:hidden gap-2">
              <div className="flex flex-start gap-2 ml-5">
                <div className="text-center text-sm">
                  {item.sale_price && item.sale_price < item.price ? (
                    <div className="flex flex-row gap-1 sm:gap-0 sm:flex-col items-center">
                      <span className="text-blue-600 font-semibold">
                        {(item.sale_price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-xs line-through text-gray-400">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  ) : (
                    <span className="text-blue-600 font-semibold">
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex justify-center">
                  <div className="flex items-center border rounded-full px-2">
                    <button
                      className="px-2 text-gray-700 hover:text-black"
                      onClick={() =>
                        updateQuantity(item.product_id, item.variant_unit, item.quantity - 1)
                      }
                      disabled={item.quantity == 1}
                    >
                      <Minus size={12} className="hover:text-blue-600" />
                    </button>

                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-10 text-center bg-transparent border-x border-gray-200"
                    />

                    <button
                      className="px-2 text-gray-700 hover:text-black"
                      onClick={() =>
                        updateQuantity(item.product_id, item.variant_unit, item.quantity + 1)
                      }
                    >
                      <Plus size={12} className="hover:text-blue-600" />
                    </button>
                  </div>
                </div>

                <div className="text-center text-sm">{item.variant_unit}</div>

                <div className="text-center flex items-center justify-center">
                  <button
                    className="text-gray-500"
                    onClick={() => {
                      removeFromCart(item.product_id, item.variant_unit);
                      setCartItems((prev) =>
                        prev.filter(
                          (c) =>
                            !(
                              c.product_id === item.product_id &&
                              c.variant_unit === item.variant_unit
                            ),
                        ),
                      );
                    }}
                  >
                    <Trash2 size={20} className="hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex text-center text-sm">
              {item.sale_price && item.sale_price < item.price ? (
                <div className="flex flex-row gap-1 sm:gap-0 sm:flex-col items-center">
                  <span className="text-blue-600 font-semibold">
                    {(item.sale_price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                  <span className="text-xs line-through text-gray-400">
                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              ) : (
                <span className="text-blue-600 font-semibold">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </span>
              )}
            </div>

            <div className="hidden sm:flex justify-center">
              <div className="flex items-center border rounded-full px-2">
                <button
                  className="px-2 text-gray-700 hover:text-black"
                  onClick={() =>
                    updateQuantity(item.product_id, item.variant_unit, item.quantity - 1)
                  }
                  disabled={item.quantity == 1}
                >
                  <Minus size={12} className="hover:text-blue-600" />
                </button>

                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-10 text-center bg-transparent border-x border-gray-200"
                />

                <button
                  className="px-2 text-gray-700 hover:text-black"
                  onClick={() =>
                    updateQuantity(item.product_id, item.variant_unit, item.quantity + 1)
                  }
                >
                  <Plus size={12} className="hover:text-blue-600" />
                </button>
              </div>
            </div>

            <div className="hidden sm:flex text-center text-sm">{item.variant_unit}</div>

            <div className="text-center hidden sm:flex items-center justify-center">
              <button
                className="text-gray-500"
                onClick={() => {
                  removeFromCart(item.product_id, item.variant_unit);
                  setCartItems((prev) =>
                    prev.filter(
                      (c) =>
                        !(c.product_id === item.product_id && c.variant_unit === item.variant_unit),
                    ),
                  );
                }}
              >
                <Trash2 size={20} className="hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 md:static w-full max-w-sm">
        <div className="rounded-xl p-4 bg-white space-y-3">
          <button className="w-full py-2.5 px-3 rounded-[8px] bg-[#eaeffa] text-sm font-medium flex justify-between items-center">
            <span className="text-[#1250dc] flex items-center justify-between text-[14px] font-medium">
              Áp dụng ưu đãi để được giảm giá
            </span>
            <ChevronRight color="#1250dc" />
          </button>

          <div className="hidden sm:block space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63]">Tổng tiền</span>
              <span className="font-semibold text-[#020b27]">
                {totalOriginal.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63]">Giảm giá trực tiếp</span>
              <span className="text-orange-500 font-semibold">
                {discount > 0 ? `-${discount.toLocaleString('vi-VN')}đ` : '0đ'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63]">Giảm giá voucher</span>
              <span className="text-orange-500 font-semibold">0đ</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#4a4f63]">Tiết kiệm được</span>
              <span className="text-orange-500 font-semibold">
                {discount.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          <div className="border-t pt-3">
            <div className="flex justify-between items-baseline">
              <div className="font-semibold text-base">Thành tiền</div>
              <div className="flex items-baseline gap-2">
                <span className="line-through text-sm text-gray-400">
                  {totalOriginal !== totalFinal ? totalOriginal.toLocaleString('vi-VN') : ''}
                </span>
                <span className="text-blue-600 text-lg font-bold">
                  {totalFinal.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>
          </div>
          <div className="block sm:hidden space-y-2">
            <div className="flex justify-between gap-2 items-baseline">
              <div className="text-text-secondary whitespace-nowrap text-sm">Tiết kiệm được</div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[#f79009]">
                  {discount > 0 ? `${discount.toLocaleString('vi-VN')}đ` : '0đ'}
                </span>
              </div>
            </div>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium text-sm"
            onClick={handleCheckout}
          >
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
