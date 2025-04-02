"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Wine {
  id: number;
  name: string;
  src: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Wine[];
  addToCart: (wine: Wine) => void;
  removeFromCart: (id: number) => void;
  updateQuantityMinus: (id: number, quantity: number) => void;
  updateQuantityMore: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const Cart = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Wine[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (wine: Wine) => {
    const safeQuantity = Math.max(1, wine.quantity);
    
    setCart((prevCart) => {
      const existingWine = prevCart.find((item) => item.id === wine.id);
      
      if (existingWine) {
        return prevCart.map((item) =>
          item.id === wine.id
            ? { ...item, quantity: item.quantity + safeQuantity } 
            : item
        );
      }
      
      const newWine: Wine = {
        id: wine.id,
        name: wine.name,
        src: wine.src,
        price: wine.price,
        quantity: safeQuantity,
      };
      
      return [...prevCart, newWine];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantityMinus = (id: number, quantity: number) => {
      if( quantity >= 1) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
      }
  };

  const updateQuantityMore = (id: number, quantity: number) => {
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantityMinus, updateQuantityMore, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};