// lib/stores/cartStore.ts
import { create } from 'zustand';

type CartStore = {
  version: number;
  bumpVersion: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  version: 0,
  bumpVersion: () => set((state) => ({ version: state.version + 1 })),
}));
