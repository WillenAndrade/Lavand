"use client";
import { useState, useEffect } from "react";
import wines from "../../data/wines";
import styles from "./WineDetails.module.css";
import BuyButton from "@/app/components/BuyButton";
import { useCart } from "@/app/cart/Cart";
import React from "react";
import Link from "next/link";


type WineDetailsProps = {
  params: Promise<{ id: string }>;
};

const WineDetails = ({ params }: WineDetailsProps) => {
  const resolvedParams = React.use(params); 
  const wine = wines.find((w) => w.id === parseInt(resolvedParams.id));
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    console.log("Cart updated:", JSON.stringify(cart, null, 2));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!wine) return <div>Wine not found</div>;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleAddToCart = () => {
    addToCart({ ...wine, quantity });  
  };

  return (
    <div className={styles["wine-container"]}>
      <div className={styles["wine-box"]}>
        <div className={styles["wine-image"]} style={{ maxHeight: "600px", backgroundImage: `url(${wine.src})`, backgroundPosition: "center", objectFit: "contain" }}>

          <div className={styles["wine-details"]}>
            
            <h2 className={styles["description-nationality"]}>
              ({wine.description.nationality})
            </h2>
            <p className={styles["description-text"]}>
              "{wine.description.aromaticProfile}"
            </p>
            <p className={styles["description-indication"]}>{wine.description.indication}</p>
          </div>
        </div>

        <div className={styles["wine-checkout"]}>
          <div className={styles["description-name-checkout-div"]}>
            <h1 className={styles["description-name-checkout"]}>{wine.name}</h1>
          </div>
          <h2 className={styles["description-grape"]}>{wine.description.grape}</h2>
          <p className={styles["description-award"]}>{wine.description.award}</p>
          <h2 className={styles["description-price"]}>
            {wine.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </h2>
          
          <div className={styles["quantity"]}>
            <div className={styles["quantity-selector"]}>
              <div className={styles["btn-minus"]} onClick={handleDecrement}>
                -
              </div>
              <div>
                <span className={styles["quantity-number"]}>{quantity}</span>
              </div>
              <div className={styles["btn-plus"]} onClick={handleIncrement}>
                +
              </div>
            </div>
            <Link href="/cart"><div className={styles["buy-btn-details"]} onClick={handleAddToCart}>Comprar</div></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetails;
