"use client";
import { useCart } from "@/app/cart/Cart";
import { Link } from "next/link";
import CheckoutButton from "./CheckoutButton"
import styles from "./CartPage.module.css"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartPage() {
 const handleClickImage = (imgId) => {
    
    router.push(`/cart/${imgId}`);

  };

  const { cart, removeFromCart, updateQuantityMinus, updateQuantityMore, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, [])

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

  return (
    <div className={styles["cart-container"]}>
      <h1>Carrinho</h1>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
           <p>Seu carrinho está vazio...</p>
           
        </div>
      ) : (
        <ul>
          {cart.map((item) => (
            <div className={styles["wine-cart"]} key={item.id}>
              <div className={styles["wine-cart-image"]} style={{backgroundImage: `url(${item.src})`, backgroundSize: "cover", backgroundPosition: "center"}} onClick={()=> handleClickImage(item.id)}></div>
              <div className={styles["wine-cart-description"]}>{item.name}</div>
              <div className={styles["wine-cart-buttons"]}>
                <div className={styles["cart-btn-minus"]} disabled={item.quantity <= 1} onClick={() => updateQuantityMinus(item.id, item.quantity - 1)}>-</div>
                <div className={styles["cart-quantity"]}>{item.quantity}</div>
                <div className={styles["cart-btn-more"]} onClick={() => updateQuantityMore(item.id, item.quantity + 1)}>+</div>
                <div className={styles["cart-delete-item"]} onClick={() => removeFromCart(item.id)}><RiDeleteBin6Line /></div>
              </div>
            </div>
          ))}
        </ul>
      )}

      {cart.length > 0 && <div className={styles["cart-total-div"]}>
        <h2 className={styles["cart-total-div-h2"]}>Total</h2>
        
        <h2 className={styles["cart-total-div-h2-price"]}>{totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h2>
        <h3 className={"cart-total-div-discount"}>15% de desconto na primeira compra!</h3>
      </div>}
      {cart.length > 0 && <CheckoutButton />}
    </div>
  );
}

// <span className={styles["cart-item-price"]}>${item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>