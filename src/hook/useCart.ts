import { useCallback } from 'react';

export type CartItem = {
  product_id: number;
  name: string;
  image: string;
  variant_unit: string;
  price: number;
  quantity: number;
};

export const useCart = () => {
  const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('cart') || '[]');
  };

  const setCart = (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const cart = getCart();
    const index = cart.findIndex(
      (c) => c.product_id === item.product_id && c.variant_unit === item.variant_unit,
    );

    if (index > -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    setCart(cart);
  }, []);

  return {
    addToCart,
    getCart,
  };
};
