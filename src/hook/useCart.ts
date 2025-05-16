import { useCallback } from 'react';

export type CartItem = {
  product_id: number;
  name: string;
  image: string;
  variant_unit: string;
  price: number;
  sale_price: number;
  quantity: number;
  discount_percentage: number;
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

  const removeFromCart = useCallback((product_id: number, variant_unit: string) => {
    const cart = getCart();
    const updatedCart = cart.filter(
      (item) => !(item.product_id === product_id && item.variant_unit === variant_unit),
    );
    setCart(updatedCart);
  }, []);

  const updateQuantity = useCallback(
    (product_id: number, variant_unit: string, quantity: number) => {
      const cart = getCart();
      const updatedCart = cart.map((item) =>
        item.product_id === product_id && item.variant_unit === variant_unit
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      );
      setCart(updatedCart);
    },
    [],
  );

  const clearCart = useCallback(() => {
    localStorage.removeItem('cart');
  }, []);

  return {
    getCart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
