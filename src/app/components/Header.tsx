"use client"

import Link from "next/link"
import { useState } from "react"
import styles from "./Header.module.css"
import { LuShoppingCart } from "react-icons/lu"

export function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`${styles.headerComponent} ${isOpen ? styles.active : ""}`}>
            
            <div 
                className={`${styles.hamburger} ${isOpen ? styles.active : ""}`} 
                onClick={toggleMenu}
            >
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>

            <Link href="/" className={styles["Link-to-Home"]}>
                <div className={styles["logo-div"]}></div>
            </Link>

            <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
                <ul className={styles["nav-ul"]}>
                    <li className={styles["nav-li"]}>
                        <Link className={styles["Link-to"]} href="/">Adega</Link>
                        <Link className={styles["Link-to"]} href="/bonus">Bônus</Link>
                    </li>
                </ul>
            </nav>
            
            <div className={styles["link-to-cart-div"]}>
                <Link className={styles["link-to-cart"]} href="/cart">
                    <LuShoppingCart />
                </Link>
            </div>
        </div>
    )
}