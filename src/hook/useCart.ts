import axios from 'axios';
import { useCallback } from 'react';
import { useCartStore } from '../lib/store/cartStore';

export type CartItem = {
  product_id: number;
  name: string;
  image: string;
  variant_unit: string;
  price: number;
  sale_price: number;
  quantity: number;
  discount_percentage: number;
  slug: string;
};

export const useCart = (userId?: string) => {
  const isLoggedIn = !!userId;

  const { bumpVersion } = useCartStore();

  const getCart = useCallback(async (): Promise<CartItem[]> => {
    if (isLoggedIn) {
      const res = await axios.get(`http://localhost:3003/cart/${userId}`);
      return res.data;
    }
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }, [userId]);

  const setCart = async (cart: CartItem[]) => {
    if (isLoggedIn) {
      await axios.post(`http://localhost:3003/cart/${userId}/sync`, cart);
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    bumpVersion();
  };

  const addToCart = useCallback(
    async (item: Omit<CartItem, 'quantity'>) => {
      const current = await getCart();
      const index = current.findIndex(
        (c) => c.product_id === item.product_id && c.variant_unit === item.variant_unit,
      );

      if (index > -1) {
        current[index].quantity += 1;
      } else {
        current.push({ ...item, quantity: 1 });
      }

      await setCart(current);
    },
    [userId], // phụ thuộc vào userId
  );

  const removeFromCart = useCallback(
    async (product_id: number, variant_unit: string) => {
      const current = await getCart();
      const updated = current.filter(
        (item) => !(item.product_id === product_id && item.variant_unit === variant_unit),
      );
      await setCart(updated);
    },
    [userId],
  );

  const syncCartFromLocalToRedis = useCallback(async () => {
    if (!isLoggedIn || typeof window === 'undefined') return;

    const localCart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];

    if (localCart.length === 0) return;

    // ✅ Bước 1: Lấy cart từ Redis
    const { data: redisCart } = await axios.get(`http://localhost:3003/cart/${userId}`);

    // ✅ Bước 2: Merge không trùng sản phẩm (trùng thì cộng quantity)
    const mergedCart: CartItem[] = [...redisCart];

    localCart.forEach((localItem) => {
      const index = mergedCart.findIndex(
        (item) =>
          item.product_id === localItem.product_id && item.variant_unit === localItem.variant_unit,
      );

      if (index > -1) {
        // Nếu trùng thì cộng số lượng
        mergedCart[index].quantity += localItem.quantity;
      } else {
        mergedCart.push(localItem);
      }
    });

    // ✅ Bước 3: Gửi mergedCart lên Redis
    await axios.post(`http://localhost:3003/cart/${userId}/sync`, mergedCart);

    // ✅ Bước 4: Xóa localCart
    localStorage.removeItem('cart');

    // ✅ Bước 5: Thông báo component reload
    bumpVersion();
  }, [userId]);

  const updateQuantity = useCallback(
    async (product_id: number, variant_unit: string, quantity: number) => {
      const current = await getCart();
      const updated = current.map((item) =>
        item.product_id === product_id && item.variant_unit === variant_unit
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      );
      await setCart(updated);
    },
    [userId],
  );

  const clearCart = useCallback(async () => {
    if (isLoggedIn) {
      await axios.delete(`http://localhost:3003/cart/${userId}/all`);
    } else {
      localStorage.removeItem('cart');
    }
  }, [userId]);

  return {
    getCart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    syncCartFromLocalToRedis,
  };
};
