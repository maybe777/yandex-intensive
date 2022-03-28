import React from 'react';
import styles from './burger-ingredients.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientNav from "../ingredient-nav/ingredient-nav";


export type BurgerData = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}[]

interface BurgerIngredientsProps {
    data: BurgerData;
}

export default class BurgerIngredients extends React.Component<BurgerIngredientsProps> {

    render() {

        // @ts-ignore
        const BUNS = this.props.data.filter((item) => {
            return item.type === "bun";
        })

        // @ts-ignore
        const SAUCE = this.props.data.filter((item) => {
            return item.type === "sauce";
        })

        // @ts-ignore
        const NOVICE = this.props.data.filter((item) => {
            return item.type === "main";
        })

        const ALL = [{title: 'Булки', data: BUNS}, {title: 'Соусы', data: SAUCE}, {title: 'Начинки', data: NOVICE}];

        const catalog = ALL.map((item, index) => (
            <div key={'burger_cat_' + index} className={styles.category}>
                <div className={styles.categoryTitle}>
                    <h2>{item.title}</h2>
                </div>
                {item.data.map((cat: any, index: string | number | null | undefined) => (
                    <div key={'burger_item_' + index} className={styles.ingredient + " mb-3"}>
                        <div>
                            <img src={cat.image} alt={"Burger item"}/>
                        </div>
                        <div className={styles.price + " text text_type_digits-default"}>
                            <span className={"mr-2"}>
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