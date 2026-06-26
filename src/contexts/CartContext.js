import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      const parsed = JSON.parse(stored);
      const uniqueItems = parsed.reduce((acc, item) => {
        if (!acc.some(i => i.id === item.id)) {
          acc.push({ ...item, quantity: 1 });
        }
        return acc;
      }, []);
      setCart(uniqueItems);
      localStorage.setItem('cart', JSON.stringify(uniqueItems));
    }
  }, []);

  const saveAndSet = (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev;
      }

      const updated = [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (id) => {
    saveAndSet(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    saveAndSet([]);
  };

  const total = cart.reduce((sum, item) => sum + item.preco * item.quantity, 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};