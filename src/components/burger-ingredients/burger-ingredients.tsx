import React from 'react';
import styles from './burger-ingredients.module.css'
import data from '../utils/data.json'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientNav from "../ingredient-nav/ingredient-nav";


export default class BurgerIngredients extends React.Component {

    render() {

        const BUNS = data.filter((item) => {
            return item.type === "bun";
        })

        const SAUCE = data.filter((item) => {
            return item.type === "sauce";
        })

        const NOVICE = data.filter((item) => {
            return item.type === "main";
        })

        const ALL = [{title: 'Булки', data: BUNS}, {title: 'Соусы', data: SAUCE}, {title: 'Начинки', data: NOVICE}];

        const catalog = ALL.map((item, index) => (
            <div className={styles.category}>
                <div className={styles.categoryTitle}>
                    <h1 key={index}>{item.title}</h1>
                </div>
                {item.data.map((cat, index) => (
                    <div key={index} className={styles.ingredient}>
                        <div>
                            <img src={cat.image} alt={"Burger item"}/>
                        </div>
                        <div className={styles.price}>
                            <span className={styles.priceIcon}>
                                {cat.price}
                            </span>
                            <span>
                                <CurrencyIcon type={"primary"}/>
                            </span>
                        </div>
                        <div className={styles.description}>
                            <p>{cat.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        ));

        return (
            <div className={styles.ingredientWrapper}>
                <IngredientNav/>
                <div className={styles.ingredients}>
                    {catalog}
                </div>
            </div>
        );
    }

}