import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('coffee-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('coffee-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, variant = null) => {
    setItems(prev => {
      const key = variant ? `${product.id}-${variant}` : product.id;
      const existing = prev.find(item => item.key === key);

      if (existing) {
        return prev.map(item =>
          item.key === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, {
        key,
        id: product.id,
        name: product.name,
        price: variant ? product.prices[variant] : product.price,
        variant,
        quantity: 1,
        type: product.prices ? 'bean' : (product.size ? 'sirup' : 'accessory')
      }];
    });
  };

  const removeItem = (key) => {
    setItems(prev => prev.filter(item => item.key !== key));
  };

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeItem(key);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.key === key ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
