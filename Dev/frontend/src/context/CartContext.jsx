// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Number of days before cart expires
  const CART_EXPIRY_DAYS = 7;

  // Load cart from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartData');
    if (storedCart) {
      const { items, timestamp } = JSON.parse(storedCart);
      const now = Date.now();
      const expiryTime = CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

      if (now - timestamp < expiryTime) {
        setCartItems(items);
      } else {
        localStorage.removeItem('cartData'); // expired
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(
        'cartData',
        JSON.stringify({
          items: cartItems,
          timestamp: Date.now(),
        })
      );
    } else {
      localStorage.removeItem('cartData'); // empty cart clears storage
    }
  }, [cartItems]);

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
