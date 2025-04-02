import { useEffect } from 'react';
import { useState } from 'react';

import styles from "../components/WineCarousel.module.css"

export function WineCarousel () {

    const slides = ["/almendros.png", "/pazo-torrado.png", "/marques-de-la-concordia-reserva.png"];
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex:number) => (prevIndex + 1) % slides.length);
        console.log(`Este é o Index do carrousel: ${currentIndex}`)
      };
      const prevSlide = () => {
        setCurrentIndex((prevIndex:number) => (prevIndex - 1 + slides.length) % slides.length);
        console.log(`Este é o Index do carrousel: ${currentIndex}`)
      };

      useEffect(() => {
        const intervalId = setInterval(nextSlide, 7000);  
        return () => clearInterval(intervalId);
    }, []);

    return(
         <div className={styles["carousel-container"]}>
            <div className={styles.carousel}>
                <div className={styles["carousel-btn prev"]} onClick={prevSlide}>
                   <p id={styles["prev-btn"]}>&lt;</p>
                </div>
                <div className={styles["carousel-slide"]} >
                    <div className={styles["wine-image-div"]} style={{ backgroundImage: `url(${slides[currentIndex]})` }}>
                    </div>
                        <div className={styles["wine-offer-div"]}>
                            <h2>Nome do vinho</h2>
                            <h3>Composição</h3>
                            <h3>Coloração</h3>
                        </div>
                </div>
                <div className={styles["carousel-btn next"]} onClick={nextSlide}>
                        <p id={styles["next-btn"]}>&gt;</p>
                    </div>
            </div>
        </div>
    )
}
