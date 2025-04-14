import useState from "react" ;
import styles from "/PopUp.module.css"


const PopUp = () => {
      //  const [renderPopUp, setRenderPopUp] = useState(true);

      /* const handleExitClick = () => {
          setRenderPopUp(false)
        }*/
 return
 (
  <div className={styles["pop-up-container"]}>
    <div className={styles["pop-up-div"]}></div>
    <div className={styles["pop-up-exit-button"]}></div>
  </div>
 )
}

export default PopUp 

