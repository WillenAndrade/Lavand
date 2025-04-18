"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Wine } from "./models/Wine";
import { Cart as CartModel } from "../cart/models/Cart"

interface CartContextType {
  cart: CartModel;
  addToCart: (wine: Wine) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void; 
  decreaseQuantity: (id: number) => void; 
  clearCart: () => void;
}

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  src: string; 
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartModel>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? CartModel.fromJSON(savedCart) : new CartModel();
    }
    return new CartModel();
  });

  useEffect(() => {
    localStorage.setItem("cart", cart.toJSON());
  }, [cart]);

  const addToCart = (wine: Wine) => {
    const newCart = new CartModel(cart.getItems());
    newCart.addItem(wine);
    setCart(newCart);
  };

  const removeFromCart = (id: number) => {
    const newCart = new CartModel(cart.getItems());
    newCart.removeItem(id);
    setCart(newCart);
  };

  const increaseQuantity = (id: number) => { // Atualizado para 'increaseQuantity'
    const newCart = new CartModel(cart.getItems());
    newCart.increaseQuantity(id);  // Método da classe Cart
    setCart(newCart);
  };

  const decreaseQuantity = (id: number) => { // Atualizado para 'decreaseQuantity'
    const newCart = new CartModel(cart.getItems());
    newCart.decreaseQuantity(id);  // Método da classe Cart
    setCart(newCart);
  };

  const clearCart = () => {
    const newCart = new CartModel();
    setCart(newCart);
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
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};