'use client';

import { Popover } from 'antd';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { CartItem, useCart } from '../../hook/useCart';
import { useCartStore } from '../../lib/store/cartStore';

export default function CartPopover({ userId }: { userId?: string }) {
  const { getCart, removeFromCart } = useCart(userId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const items = await getCart();
  //     setCartItems(items.map((item) => ({ ...item, selected: true })));
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, [userId]);
  const version = useCartStore((state) => state.version);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart.map((item) => ({ ...item, selected: true })));
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCount(total);
    };

    fetchCart();
  }, [userId, version]);

  const content = (
    <div className="w-[320px] max-h-[400px] overflow-auto">
      <h4 className="font-semibold text-base mb-3 px-3 pt-2">Giỏ hàng</h4>
      {cartItems.length === 0 ? (
        <div className="px-3 pb-3 text-sm text-gray-500">Không có sản phẩm nào.</div>
      ) : (
        <>
          <div className="divide-y">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-start p-3">
                <Image src={item.image} width={40} height={40} alt={item.name} />
                <div className="flex-1">
                  <p className="text-sm leading-[1.2rem] line-clamp-2">{item.name}</p>
                  <div className="text-sm font-medium text-blue-600">
                    {item.sale_price < item.price
                      ? `${item.sale_price.toLocaleString('vi-VN')}đ`
                      : `${item.price.toLocaleString('vi-VN')}đ`}
                  </div>
                  <div className="text-xs text-gray-600">
                    x{item.quantity} {item.variant_unit}
                  </div>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => removeFromCart(item.product_id, item.variant_unit)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 text-sm text-gray-700 flex justify-between items-center">
            <span>{cartItems.length} sản phẩm</span>
            <Link
              href="/gio-hang"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-[8px] text-sm font-medium"
            >
              Xem giỏ hàng
            </Link>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Popover content={content} trigger="hover" placement="bottomRight">
      <button
        onClick={() => router.push('/gio-hang')}
        className="hidden md:flex items-center bg-[#1250DC] text-white font-semibold cursor-pointer rounded-full px-4 py-2 gap-2"
      >
        <div className="relative">
          <FaShoppingCart className="text-white text-[18px]" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] min-w-[16px] h-[16px] px-[5px] rounded-full flex items-center justify-center leading-none font-bold">
              {count}
            </span>
          )}
        </div>
        <span>Giỏ hàng</span>
      </button>
    </Popover>
  );
}
