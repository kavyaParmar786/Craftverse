"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.product._id === product._id);
        if (existing) {
          set((state) => ({ items: state.items.map((i) => i.product._id === product._id ? { ...i, quantity: i.quantity + quantity } : i) }));
        } else {
          set((state) => ({ items: [...state.items, { product, quantity }] }));
        }
      },
      removeItem: (productId) => set((state) => ({ items: state.items.filter((i) => i.product._id !== productId) })),
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) { get().removeItem(productId); return; }
        set((state) => ({ items: state.items.map((i) => i.product._id === productId ? { ...i, quantity } : i) }));
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "craftverse-cart",
      storage: createJSONStorage(() => {
        // Safe localStorage access (no-op on server)
        if (typeof window === "undefined") {
          return { getItem: () => null, setItem: () => {}, removeItem: () => {} };
        }
        return localStorage;
      }),
      skipHydration: true,
    }
  )
);
