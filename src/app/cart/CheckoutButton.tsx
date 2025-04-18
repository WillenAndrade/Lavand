"use client";

import styles from "./CheckoutButton.module.css"

import { useCart } from "./CartContext";

import type { CartItem } from "./CartContext";

const createPreference = async () => {
  const { cart } = useCart();
  
  const preference = {
    items: cart.getItems().map((item: CartItem) => ({
      title: item.name,
      unit_price: item.price,
      quantity: item.quantity,
    })),
    currency_id: "BRL",
  };

  console.log("Preference for Mercado Pago:", preference);
};

export default function CheckoutButton() {
  const handleCheckout = () => {
    createPreference();
  };

  return <div className={styles["checkout-button-div"]}><button className={styles["checkout-button"]} onClick={handleCheckout}>Comprar</button></div>

}