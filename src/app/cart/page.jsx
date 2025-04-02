"use client";
import { useCart } from "@/app/cart/Cart";
import { Link } from "next/link";
import CheckoutButton from "./CheckoutButton"
import styles from "./CartPage.module.css"
import { useEffect } from "react";

export default function CartPage() {

  const { cart, removeFromCart, updateQuantityMinus, updateQuantityMore, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

  return (
    <div className={styles["cart-container"]}>
      <h1>Carrinho</h1>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
           <p>Your cart is currently empty.</p>
           
        </div>
      ) : (
        <ul>
          {cart.map((item) => (
            <div className={styles["wine-cart"]} key={item.id}>
              <div className={styles["wine-cart-image"]} style={{backgroundImage: `url(${item.src})`, backgroundSize: "cover", backgroundPosition: "center"}}></div>
              <div className={styles["wine-cart-description"]}>{item.name}</div>
              <div className={styles["wine-cart-buttons"]}>
                <div className={styles["cart-btn-minus"]} disabled={item.quantity <= 1} onClick={() => updateQuantityMinus(item.id, item.quantity - 1)}>-</div>
                <div className={styles["cart-quantity"]}>{item.quantity}</div>
                <div className={styles["cart-btn-more"]} onClick={() => updateQuantityMore(item.id, item.quantity + 1)}>+</div>
                <div className={styles["cart-delete-item"]} onClick={() => removeFromCart(item.id)}></div>
              </div>
            </div>
          ))}
        </ul>
      )}

      <div className={styles["cart-total-div"]}>
        <h2>Total</h2>
        <h2>{totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h2>
      </div>
      <CheckoutButton />
    </div>
  );
}

// <span className={styles["cart-item-price"]}>${item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>