import React from "react";
import {BurgerItem} from "../app/app";
import styles from './ingredient-details.module.css'


export default function IngredientDetails(props: BurgerItem) {

    return (
        <div className={styles.container}>
            <div className={styles.picture + " mt-5"}>
                <img className={styles.img} src={props.image_large} alt={"Image detail"}/>
            </div>
            <div className={styles.title}>
                <p className="text text_type_main-medium title">
                    {props.name}
                </p>
            </div>
            <div className={styles.prop1 + " mt-3"}>
                <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
            </div>
            <div className={styles.prop2 + " mt-3"}>
                <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
            </div>
            <div className={styles.prop3 + " mt-3"}>
                <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
            </div>
            <div className={styles.prop4 + " mt-3"}>
                <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
            </div>
        </div>
    );

}