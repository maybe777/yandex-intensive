import React, {useMemo} from 'react';
import styles from './feed-componenet.module.css'
import {useSelector} from '../../service/hooks';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export const FeedComponent = (order: TWSOrder) => {

    const ingredientsSlice = 6
    const ingredientsData = useSelector(store => store.ingredients.data)

    const orderInfo = useMemo(() => {

        if (!ingredientsData.length) return null

        const today = () => {
            let today = new Date();
            let date = new Date(order.createdAt)
            const one_day = 1000 * 60 * 60 * 24;
            let result = Math.ceil((date.getTime() - today.getTime()) / (one_day))
            switch (result) {
                case 0 :
                    return "Сегодня, " + date.toString().slice(15, 33)
                case 2 :
                    return "Вчера, " + date.toString().slice(15, 33)
                default :
                    return result + " дня назад, " + date.toString().slice(15, 33)
            }
        }

        const ingredients = order.ingredients.reduce((total: Array<IBurgerItem>, item) => {
            const ingredient = ingredientsData.find((burgerItem) => burgerItem._id === item)
            if (ingredient) total.push(ingredient)
            return total
        }, [])

        const totalPrice = ingredients.reduce((total, item) => {
            return total + item.price
        }, 0)

        const ingredientsShow = ingredients.slice(0, ingredientsSlice)

        const remains = ingredients.length > ingredientsSlice ? ingredients.length - ingredientsSlice : null

        return {
            ...order,
            ingredients,
            ingredientsShow,
            totalPrice,
            remains,
            today,
        }
    }, [order, ingredientsData])


    return (
        <div className={styles.feedComponent}>
            <div className={styles.feedComponentHeader}>
                <div className='text_type_digits-default' style={{float: 'left'}}>
                    {'#' + order.number}
                </div>
                <div className='text text_type_main-small text_color_inactive'
                     style={{float: 'right', marginTop: '4px'}}>
                    {orderInfo?.today()}
                </div>
            </div>
            <div className={'text_type_main-default ' + styles.feedName}>
                {order.name}
            </div>
            <div className={styles.feedComponentDetails}>
                <div className={styles.feedDetails}>
                    <ul className={styles.feedImagesBlock}>
                        {orderInfo?.ingredientsShow.map((ingredient, index) => {
                                let zIndex = ingredientsSlice - index
                                return (
                                    <li key={index} className={styles.ingredientImg}
                                        style={{
                                            zIndex: zIndex,
                                            marginLeft: '-25px',
                                            opacity: orderInfo?.remains && ingredientsSlice === index + 1 ? 0.5 : 1
                                        }}>
                                        <img
                                            style={{marginLeft: '-21px', marginTop: '4px'}}
                                            src={ingredient.image_mobile}
                                            alt={ingredient.name}
                                        />
                                        {ingredientsSlice === index + 2 ? (
                                            <span className={styles.remains}>
                                                {orderInfo?.remains && orderInfo?.remains > 0 ? "+" + orderInfo?.remains : null}
                                            </span>
                                        ) : null}
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
                <div className='text_type_digits-default' style={{float: "right", margin: "15px"}}>
                    <div className={styles.price}>
                        <span style={{marginRight: "10px"}}>{orderInfo?.totalPrice}</span>
                        <CurrencyIcon type={"primary"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}