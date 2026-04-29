import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductOutput } from "@/schemas/productSchema";

export interface CartItem {
  product: ProductOutput;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductOutput) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { product, qty: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),

      changeQty: (id, delta) =>
        set((state) => {
          const updated = state.items
            .map((i) =>
              i.product.id === id ? { ...i, qty: i.qty + delta } : i,
            )
            .filter((i) => i.qty > 0);
          return { items: updated };
        }),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      totalPrice: () =>
        get().items.reduce((s, i) => s + i.product.price * i.qty, 0),
    }),
    { name: "@virtu:cart" },
  ),
);
