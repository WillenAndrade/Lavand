import styles from "./BuyButton.module.css"
import Link from "next/link"

type BuybtnValue = {
    productId: number
    btnValue: string
    onClick?: () => void;
}

const BuyButton = ({btnValue, productId, onClick}: BuybtnValue) => {
    return(
        <Link href={`/wine/${productId}`} passHref>
             <div className={styles["buy-btn"]} onClick={onClick}>{btnValue}</div>
        </Link>
    )
}

export default BuyButton
