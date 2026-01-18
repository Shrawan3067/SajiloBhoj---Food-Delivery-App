import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  id: string | number;
  restaurantId?: string | number;
  price: number;
  qty: number;
  [k: string]: any;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (item: Partial<CartItem> & { id: string | number; price: number; restaurantId?: string | number }) => void;
  removeFromCart: (id: string | number, restaurantId?: string | number) => void;
  updateQuantity: (id: string | number, restaurantId: string | number | undefined, qty: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Partial<CartItem> & { id: string | number; price: number; restaurantId?: string | number }) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id && p.restaurantId === item.restaurantId);
      if (exists) {
        return prev.map((p) => (p.id === item.id && p.restaurantId === item.restaurantId ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...(item as CartItem), qty: 1 }];
    });
  };

  const updateQuantity = (id: string | number, restaurantId: string | number | undefined, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((p) => !(p.id === id && p.restaurantId === restaurantId));
      return prev.map((p) => (p.id === id && p.restaurantId === restaurantId ? { ...p, qty } : p));
    });
  };

  const removeFromCart = (id: string | number, restaurantId?: string | number) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.restaurantId === restaurantId)));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);

  const value: CartContextValue = { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
