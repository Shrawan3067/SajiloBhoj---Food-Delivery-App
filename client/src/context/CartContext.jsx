// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) => p.id === item.id && p.restaurantId === item.restaurantId
      );
      if (exists) {
        return prev.map((p) =>
          p.id === item.id && p.restaurantId === item.restaurantId
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (id, restaurantId) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.restaurantId === restaurantId))
    );
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Add this custom hook at the bottom
export const useCart = () => useContext(CartContext);
