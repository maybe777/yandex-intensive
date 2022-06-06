import React from "react";
import styles from "../chief-cook/chief-cook.module.css";
import chief from "../../images/cooking.png";


export default function ChiefCook() {


    return (
        <div className={styles.chiefContainer}>
            <img className={styles.chief} src={chief}
                 alt={"Chief cook"}/>
            <p>
                Давай скорее готовить!<br/> Тащи сюда ингедиенты.
            </p>
        </div>
    )
}