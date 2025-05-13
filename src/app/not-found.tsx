"use client"
import Link from 'next/link';
import styles from "./pages/pages.module.css"
export default function Custom404() {

  return (
    <div className={styles["not-found-container"]}>
      <div className={styles["not-found-title"]}>
        <h1 className={styles["not-found-title-1"]}>Página não</h1>
        <h1 className={styles["not-found-title-2"]}>encontrada</h1>
      </div>

      <div className={styles["not-found-title-description"]}>
        <p>Ops! Parece que essa página não existe.</p>
      </div>

      <Link href="/">
        <button className={styles["not-found-btn"]}>
          Voltar para Adega
        </button>
      </Link>
    </div>
  );
}