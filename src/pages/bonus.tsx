"use client"

import Link from "next/link"

import style from "./bonus.module.css"

const Bonus = () => {
    return (
        <div className={style["general-bonus"]}>
            <div className={style["bonus-header"]}><div className={style["logo-div-bonus"]}></div><Link href={"/"} className={style["exit-bonus"]}>x</Link></div>
            
            <div className={style["bonus-container"]}>
                <div className={style["bonus-initial-div"]}>
                    <div className={style["bonus-img"]}></div>
                    <div className={style["bonus-message"]}>
                        <h1 className={style["bonus-message-title"]}>O Sabor da excelência !</h1>
                        <h2 className={style["bonus-message-text"]}>Cada garrafa que oferecemos nasce das melhores uvas, cuidadosamente selecionadas para criar vinhos intensos e equilibrados, com sabor marcante em cada gole.
                        </h2>
                    </div>
                </div>
            </div>
            <div className={style["bonus-container"]}>
                <div className={style["bonus-initial-div"]}>
                    <div className={style["bonus-message"]}>
                        <h1 className={style["bonus-message-title"]}>Só para os honrados!</h1>
                        <h2 className={style["bonus-message-text"]}>
Não vendemos rótulos — vendemos experiências.
Vinhos criados para quem valoriza o bom gosto em cada detalhe. 
                        </h2>
                    </div>
                    <div className={style["bonus-img-2"]}></div>
                </div>
            </div>
            <Link href={"/"} className={style["call-to-action"]}>Prove nossos vinhos e sinta a diferença!</Link>
        </div>
            
            
        
    )
}

export default Bonus



/**
    Não vendemos rótulos. Oferecemos experiências.
Vinhos selecionados, entrega rápida e preço justo.
Criados para quem honra o bom gosto em cada detalhe!
 */
