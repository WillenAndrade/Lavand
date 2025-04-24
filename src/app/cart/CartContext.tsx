"use client"
import React, { createContext, useState, useEffect } from "react";
import { Cart } from "./models/Cart";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  src: string;
  description?: string;
  category_id?: string;
  picture_url?: string;
};

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: new Cart(),
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? Cart.fromJSON(savedCart) : new Cart();
    }
    return new Cart();
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.toJSON()));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    const newCart = new Cart(cart.getItems());
    newCart.addItem(item);
    setCart(newCart);
  };

  const removeFromCart = (id: number) => {
    const newCart = new Cart(cart.getItems());
    newCart.removeItem(id);
    setCart(newCart);
  };

  const increaseQuantity = (id: number) => {
    const newCart = new Cart(cart.getItems());
    newCart.increaseQuantity(id);
    setCart(newCart);
  };

  const decreaseQuantity = (id: number) => {
    const newCart = new Cart(cart.getItems());
    newCart.decreaseQuantity(id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart(new Cart());
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};