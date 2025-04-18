"use client"
import { useCart } from "@/app/cart/CartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./CartPage.module.css";
import CheckoutButton from "./CheckoutButton"

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  const items = cart.getItems();
  const totalPrice = cart.getTotal();

  return (
    <div className={styles["cart-container"]}>
      <h1 className={styles["cart-h1"]}>Carrinho</h1>
      {cart.getItems().length === 0 ? (
        <div className={styles["empty-cart"]}>
          <p>Seu carrinho está vazio...</p>
        </div>
      ) : (
        <ul>
          {items.map((item) => (
            <div className={styles["wine-cart"]} key={item.id}>
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
                >
                  -
                </div>
                <div className={styles["cart-quantity"]}>{item.quantity}</div>
                <div
                  className={styles["cart-btn-more"]}
                  onClick={() => increaseQuantity(item.id)} 
                >
                  +
                </div>
                <div
                  className={styles["cart-delete-item"]}
                  onClick={() => removeFromCart(item.id)}
                >
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}

      {cart.getItems().length > 0 && (
        <div className={styles["cart-total-div"]}>
          <h2 className={styles["cart-total-div-h2"]}>Total</h2>
          <h2 className={styles["cart-total-div-h2-price"]}>
            {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </h2>
        </div>
      )}
      {cart.getItems().length > 0 && <CheckoutButton />}
    </div>
  );
}