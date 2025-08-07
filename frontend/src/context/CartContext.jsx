// src/context/CartContext.jsx
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (fish, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === fish.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === fish.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, fish.stock),
              }
            : item
        );
      } else {
        return [...prevItems, { ...fish, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
