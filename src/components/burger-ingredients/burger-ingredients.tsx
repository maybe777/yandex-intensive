import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './burger-ingredients.module.css'
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import {useSelector} from "../../service/hooks";
import {elementCalculator} from "../../service/scroll-calcuator";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";


const BurgerIngredients: FC = () => {

    const data = useSelector(store => store.ingredients.data)
    const items: Array<IBurgerItem> = useSelector(store => store.burger.items)

    const [scrollIndex, setScrollIndex] = useState<number>(0)

    useEffect(() => {
        let component: HTMLElement | null = document.getElementById('items')
        const handler = () => {
            let index = elementCalculator(
                //@ts-ignore
                component?.scrollTop,
                ALL,
                0,
                ALL.length - 1
            );
            setScrollIndex(index)
        };
        component?.addEventListener("scroll", handler);
        return () => {
            component?.removeEventListener("scroll", handler);
        };
    }, []);

    const bunRef = useRef<HTMLElement>(null)
    const sauceRef = useRef<HTMLElement>(null)
    const noviceRef = useRef<HTMLElement>(null)

    const BUNS: Array<IBurgerItem> = data.filter((item: IBurgerItem) => {
        return item.type === "bun";
    })

    const SAUCE: Array<IBurgerItem> = data.filter((item: IBurgerItem) => {
        return item.type === "sauce";
    })

    const NOVICE: Array<IBurgerItem> = data.filter((item: IBurgerItem) => {
        return item.type === "main";
    })

    const ALL: Array<IHeaderData> = [
        {title: 'Булки', data: BUNS, ref: bunRef},
        {title: 'Соусы', data: SAUCE, ref: sauceRef},
        {title: 'Начинки', data: NOVICE, ref: noviceRef}
    ];

    const itemsCount = (items: Array<IBurgerItem>, item: IBurgerItem) => {
        let result = items.filter((cnt: IBurgerItem) => cnt._id === item._id)
        return result.length
    }

    const catalog = ALL.map((category: IHeaderData, index: number) => (
        <div className={styles.category} key={"category_key_" + index}>
            <div className={styles.categoryTitle}>
                <h2 ref={category.ref}>{category.title}</h2>
            </div>
            {category.data.map((item: IBurgerItem) => (
                <div key={"item_" + item._id} className={styles.ingredient + " mb-3"}>
                    <BurgerIngredient item={item} count={itemsCount(items, item)}/>
                </div>
            ))}
        </div>
    ));

    if (data.length == 0) {
        return (<div><p>Пусто</p></div>)
    }

    return (
        <div className={styles.ingredientWrapper}>
            <div className={styles.navigationContainer + " mb-3"}>
                {ALL.map((item: IHeaderData | any, index: number) =>
                    (<Tab key={"tab_" + index} value={item.title} active={scrollIndex === index}
                          onClick={() => {
                          }}>
                        {item.title}
                    </Tab>))}
            </div>
            <div id="items" className={styles.ingredients}>
                {catalog}
            </div>
        </div>
    );

}

export default BurgerIngredients