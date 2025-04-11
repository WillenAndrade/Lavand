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
        <div className={styles.headerComponent}>
           
            <div className={styles.hamburger} onClick={toggleMenu}>
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

/**

"use client"
import Link from "next/link"
import { useState } from "react";
import styles from "./Header.module.css"

import { HiOutlineShoppingCart } from "react-icons/hi2";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { BiCart } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";

    export function Header  () {

        const [isOpen, setIsOpen] = useState(false);

        const toggleMenu = () => {
            setIsOpen(!isOpen);
          };

    return(
        <div className={styles.headerComponent}>

            <div className={styles.hamburger} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>

            <Link href="/" className={styles["Link-to-Home"]}><div className={styles["logo-div"]}></div></Link>
            
            <div className={styles["menu-icon"]}></div>
                {isOpen && (<nav>
                    <ul className={styles["nav-ul"]}>
                        <li className={styles["nav-li"]}>
                            <Link className={styles["Link-to"]} href="/">Home</Link>
                            <Link className={styles["Link-to"]} href="/">Bônus</Link>
                            <Link className={styles["Link-to"]} href="/">FeedBack</Link>
                        </li>
                    </ul>
                </nav>)}
            <div className={styles["link-to-cart-div"]}><Link className={styles["link-to-cart"]} href="/cart"><LuShoppingCart /></Link></div>
         </div>
    )
}

 */

/*

    .headerComponent {
    width: 100%;
    height: 120px;
    background-color: rgb(77,28,35);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding: 0;
    box-sizing: border-box;
    background-image: linear-gradient(to right, rgb(109, 7, 24), rgb(170, 13, 39), rgb(109, 7, 24));
    border-bottom: 3px solid rgb(236, 213, 82);
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
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: black;
    transition: 0.3 ease-in-out;
}
.line {
    width: 100%;
    height: 3px;
    background-color: green;
    margin: 5px 0;
  }

.headerComponent h1 {
    margin-left: 20px;
    color: gold;
    cursor: pointer;
}

.headerComponent h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(168, 156, 84);
    color: white;
    font-size: 25px;
    padding-left: 10px;
}


.nav {
    color: white;
    margin-right: 20px;
}
.nav-ul {
    display: flex;
    
}
.nav-li {
    list-style: none;
    margin-right: 20px;
}

.Link-to-Home {
    list-style-type: none;
    text-decoration: none;
    font-size: 22px;
    margin: 0 10px;
    color: white;
    cursor: pointer;
}

.Link-to{
    list-style-type: none;
    text-decoration: none;
    font-size: 22px;
    margin: 0 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.link-to-cart-div {
    width: 50px;
    height: 55px;
    background: rgb(109, 7, 24);
    background: rgb(82, 5, 18);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin: 0 30px;
    border: none;
    border: 1px solid white;
    transition: 0.3s ease-in-out;
}

.link-to-cart-div:hover{
    border: 2px solid white;
    width: 50px;
    height: 55px;
}

.link-to-cart{
    list-style-type: none;
    text-decoration: none;
    font-size: 22px;
    margin: 0 10px;
    color: white;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    border-radius: 40px;
    font-size: 30px;
    cursor: pointer;
}

.Link-to:hover {
    font-size: 24px;
    color: rgb(236, 213, 82);
}

.Link-to-cart:hover {
    font-size:32px;
    color: rgb(236, 213, 82);
}


*/