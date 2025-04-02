"use client";
import styles from "./WineStore.module.css"

import wines from "../data/wines"
import BuyButton from "./BuyButton";

function WineCard({ name, owner, price, src, grape, nationality, productId}: { name: string; owner: string; price: number; src: string; grape: string, nationality: string, productId: number }) {
    return (
      <div className={styles.WineCard}>
        <h3 className={styles.WineName}>{name}</h3>
        <img src={src} alt={name} className={styles.WineImage} />
        <p className={styles.WineDescription}>R$ {price}</p>
        <div className={styles["WineCard-description"]}>
          <p id={styles["description-p"]}>{grape}</p>
          <span className={styles["description-span"]}>{nationality}</span>
          <BuyButton productId={productId}  btnValue="Ver agora!"/>
        </div>
      </div>
    );
  }
  
  export function WineStore() {
    return (
      <div className={styles.WineStore}>
        <h2>Catálogo</h2>
        <div className={styles.WineGrid}>
          {wines.map((wine) => (
            <WineCard key={wine.id} name={wine.name} owner={wine.owner} price={wine.price} src={wine.src} grape={wine.description.grape} nationality={wine.description.nationality} productId={wine.id} />
          ))}
        </div>
      </div>
    );
  }
  