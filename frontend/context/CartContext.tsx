import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartContextType {
  cartCount: number;
  updateCartCount: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {}
});

export const CartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartCount(parsedCart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0));
    } else {
      setCartCount(0);
    }
  };

  // Initialize cart count
  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);