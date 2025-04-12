/**
 

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
        <div className={isOpen ? `${styles.headerComponent} active` : styles.headerComponent }>
           
            <div className={isOpen ? `${styles.hamburger} active` : styles.hamburger} onClick={toggleMenu}>
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
                        <Link className={styles["Link-to"]} href="/">Home</Link>
                        <Link className={styles["Link-to"]} href="/">Bônus</Link>
                        <Link className={styles["Link-to"]} href="/">FeedBack</Link>
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


 */


/*

    .headerComponent {
    width: 100%;
    height: 120px;
    background: linear-gradient(to right, rgb(109, 7, 24), rgb(170, 13, 39), rgb(109, 7, 24));
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding: 0;
    box-sizing: border-box;
    border-bottom: 3px solid rgb(236, 213, 82);
    position: relative;
}


.logo-div {
    width: 90px;
    height: 90px;
    background-image: url("../../../public/logopequena.png");
    background-position: center;
    background-size: cover;
    border-radius: 60px;
    border: 1px solid white;
    transition: 0.3s ease-in-out;
    padding: 5px;
    margin: 0 20px;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
}

.logo-div:hover {
    border: 2px solid rgb(236, 213, 82);
}

.hamburger {
    width: 50px;
    height: 55px;
    background: rgb(82, 5, 18);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: none; 
}

.line {
    width: 90%;
    height: 4px;
    background-color: white;
    margin: 5px 0;
    transition: 0.3s ease-in-out
}

.nav {
    margin-right: 20px;
    transition: 0.3s ease-in-out
}

.nav-ul {
    display: flex;
    padding: 0;
    margin: 0;
    transition: 0.3s ease-in-out
}

.nav-li {
    list-style: none;
    display: flex;
}

.Link-to-Home,
.Link-to,
.link-to-cart {
    list-style: none;
    text-decoration: none;
    font-size: 22px;
    margin: 0 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.Link-to:hover,
.link-to-cart:hover {
    color: rgb(236, 213, 82);
}

.link-to-cart-div {
    width: 50px;
    height: 55px;
    background: rgb(82, 5, 18);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid white;
    transition: 0.3s ease-in-out;
    margin: 0 20px;
}

.link-to-cart-div:hover {
    border: 2px solid white;
}

.link-to-cart {
    font-size: 30px;
}

/* --- Responsive --- *//*
@media (max-width: 768px) {
    
    .hamburger {
        display: block;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        border-radius: 50px;
        padding: 10px;
        border: 1px solid white;
        margin: 0 20px;
        transition: 0.3s ease-in-out;
    }
    .hamburger.active {
        background: white;
    }

    .nav {
        position: absolute;
        top: 120px;
        left: 0;
        width: 100%;
        background-color: rgb(109, 7, 24);
        border-top: 1px solid white;
        display: none;
        transition: 0.3s ease-in-out;
    }

    .nav.open {
        display: block;
        z-index: 1000;
        height: 100px;
    }

    .nav-ul {
        flex-direction: column;
        align-items: center;
        
    }

    .nav-li {
        flex-direction: column;
        margin: 10px 0;
    }
}

*/

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
            {/* Hamburger menu */}
            <div 
                className={`${styles.hamburger} ${isOpen ? styles.active : ""}`} 
                onClick={toggleMenu}
            >
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>

            {/* Logo */}
            <Link href="/" className={styles["Link-to-Home"]}>
                <div className={styles["logo-div"]}></div>
            </Link>

            {/* Navigation */}
            <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
                <ul className={styles["nav-ul"]}>
                    <li className={styles["nav-li"]}>
                        <Link className={styles["Link-to"]} href="/">Home</Link>
                        <Link className={styles["Link-to"]} href="/">Bônus</Link>
                        <Link className={styles["Link-to"]} href="/">FeedBack</Link>
                    </li>
                </ul>
            </nav>

            {/* Cart Icon */}
            <div className={styles["link-to-cart-div"]}>
                <Link className={styles["link-to-cart"]} href="/cart">
                    <LuShoppingCart />
                </Link>
            </div>
        </div>
    )
}