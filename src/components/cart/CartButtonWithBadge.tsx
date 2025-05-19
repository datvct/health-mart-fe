'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../hook/useCart';
import { useCartStore } from '../../lib/store/cartStore';

export default function CartButtonWithBadge({ userId }: { userId?: string }) {
  const router = useRouter();
  const { getCart } = useCart(userId);
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     const cart = await getCart();
  //     const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  //     setCount(total);
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);
  const version = useCartStore((state) => state.version);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCount(total);
    };

    fetchCart();
  }, [userId, version]);
  return (
    <button
      onClick={() => router.push('/gio-hang')}
      className="relative group flex items-center justify-center"
    >
      {/* Mobile */}
      <div className="md:hidden bg-[#1250DC] rounded-full w-10 h-10 flex items-center justify-center relative">
        <FaShoppingCart className="text-white" />
        {count > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-orange-500 text-white text-[10px] min-w-[16px] h-[16px] px-[5px] rounded-full flex items-center justify-center leading-none font-bold">
            {count}
          </span>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center bg-[#1250DC] text-white font-semibold rounded-full px-4 py-2 gap-2">
        <div className="relative">
          <FaShoppingCart className="text-white text-[18px]" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] min-w-[16px] h-[16px] px-[5px] rounded-full flex items-center justify-center leading-none font-bold">
              {count}
            </span>
          )}
        </div>
        <span>Giỏ hàng</span>
      </div>
    </button>
  );
}
