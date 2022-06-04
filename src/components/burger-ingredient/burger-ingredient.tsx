import React from "react";
import styles from './burger-ingredient.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";


//@ts-ignore
export default function BurgerIngredient({item, count}) {

    const [{isDrag}, dragRef] = useDrag({
        type: "burgerItem",
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const counter = () => {
        if (count > 0) {
            return (<div className={styles.counter}>{count}</div>)
        }
        return null
    }

    return (
        <div ref={dragRef}>
            {counter()}
            <div>
                <img src={item.image} alt={"Burger item"}/>
            </div>
            <div className={styles.price + " text text_type_digits-default"}>
                            <span className={"mr-2"}>
                                {item.price}
                            </span>
                <span>
                                <CurrencyIcon type={"primary"}/>
                            </span>
            </div>
            <div className={styles.description}>
                <p>{item.name}</p>
            </div>
        </div>
    );

}