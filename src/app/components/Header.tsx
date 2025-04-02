import Link from "next/link"
import styles from "./Header.module.css"

    export function Header  () {

    return(
        <div className={styles.headerComponent}>
            <Link href="/" className={styles["Link-to-Home"]}><h1>Lavand</h1></Link>
                <nav>
                    <ul className={styles["nav-ul"]}>
                        <li className={styles["nav-li"]}>
                            <Link className={styles["Link-to"]} href="/">Home</Link>
                            <Link className={styles["Link-to"]} href="/">Bônus</Link>
                            <Link className={styles["Link-to"]} href="/">FeedBack</Link>
                            <Link className={styles["Link-to-cart"]} href="/cart">CART</Link>
                        </li>
                    </ul>
                </nav>
         </div>
    )
}