import React from "react";
import {BurgerItem} from "../app/app";
import styles from "../burger-ingredients/burger-ingredients.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default function BurgerIngredient(props: BurgerItem) {

    return (
        <>
            <div>
                <img src={props.image} alt={"Burger item"}/>
            </div>
            <div className={styles.price + " text text_type_digits-default"}>
                            <span className={"mr-2"}>
                                {props.price}
                            </span>
                <span>
                                <CurrencyIcon type={"primary"}/>
                            </span>
            </div>
            <div className={styles.description}>
                <p>{props.name}</p>
            </div>
        </>
    );

}