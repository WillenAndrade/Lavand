import styles from "./Footer.module.css"
import Link from "next/link"
const footer = () => {
    return (
        <div className={styles["footer-container"]}>
            <h2 className={styles["footer-promotional"]}>CLIQUE <Link className={styles["footer-link"]} href="/">AQUI</Link> E GARANTA 15% DE DECONTO NA PRIMEIRA COMPRA!</h2>
        </div>
    )
}

export default footer