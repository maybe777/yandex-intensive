import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import React from "react";
import styles from './feed-details-item.module.css'

type IFeedDetailsItem = {
    items: Array<IBurgerItem> | undefined
}

export const FeedDetailsItem = ({items}: IFeedDetailsItem) => {

    const setItems: Set<IBurgerItem> = new Set(items)
    let uniqueItems: Array<IBurgerItem> = []

    setItems.forEach(value => uniqueItems.push(value))


    function qty(ingredient: IBurgerItem) {
        return items?.filter((item) => item._id === ingredient._id).length
    }

    return (
        <div className={styles.items}>
            {uniqueItems.map((item: IBurgerItem, index) => (
                <div key={item._id + index} className={styles.itemsDetails}>
                    <div className={styles.detailsDescription}>
                        <div className={styles.ingredientImg}>
                            <img style={{marginLeft: "-32px"}} src={item.image_mobile} alt={item.name}/>
                        </div>
                        <div>{item.name}</div>
                    </div>
                    <div className={styles.priceDetails}>
                        <div className={styles.ml + " text_type_digits-default"}>{qty(item)}</div>
                        <div className={styles.ml}>x</div>
                        <div className={styles.ml + " text_type_digits-default"}>{item.price}</div>
                        <div className={styles.ml}><CurrencyIcon type={"primary"}/></div>
                    </div>
                </div>
            ))}
        </div>
    )
}