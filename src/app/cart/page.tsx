"use client";
import { useCart } from "@/app/cart/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect } from "react";
import styles from "./CartPage.module.css";
import CheckoutButton from "../cart/CheckoutButton"

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const items = cart.getItems();
  const totalPrice = cart.getTotal();

  return (
    <div className={styles["cart-container"]}>
      <h1 className={styles["cart-h1"]}>Carrinho</h1>
      {items.length === 0 ? (
        <div className={styles["empty-cart"]}>
          <p>Seu carrinho está vazio...</p>
        </div>
      ) : (
        <ul>
          {items.map((item, index) => (
            <div className={styles["wine-cart"]} key={`${item.id}-${index}`}>
              <div
                className={styles["wine-cart-image"]}
                style={{
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className={styles["wine-cart-description"]}>{item.name}</div>
              <div className={styles["wine-cart-buttons"]}>
                <div
                  className={styles["cart-btn-minus"]}
                  onClick={() => decreaseQuantity(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Diminuir quantidade de ${item.name}`}
                  onKeyDown={(e) => e.key === "Enter" && decreaseQuantity(item.id)}
                >
                  -
                </div>
                <div className={styles["cart-quantity"]}>{item.quantity}</div>
                <div
                  className={styles["cart-btn-more"]}
                  onClick={() => increaseQuantity(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Aumentar quantidade de ${item.name}`}
                  onKeyDown={(e) => e.key === "Enter" && increaseQuantity(item.id)}
                >
                  +
                </div>
                <div
                  className={styles["cart-delete-item"]}
                  onClick={() => removeFromCart(item.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Remover ${item.name} do carrinho`}
                  onKeyDown={(e) => e.key === "Enter" && removeFromCart(item.id)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className={styles["cart-total-div"]}>
            <h2 className={styles["cart-total-div-h2"]}>Total</h2>
            <h2 className={styles["cart-total-div-h2-price"]}>
              {(totalPrice || 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h2>
        </div>
      )}
      {items.length > 0 && <CheckoutButton />}
    </div>
  );
}
