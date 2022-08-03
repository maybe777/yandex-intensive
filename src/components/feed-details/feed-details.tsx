import React, {FC, useMemo} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "../../service/hooks";
import styles from './feed-details.module.css'
import {dateFormatter} from "../../service/feed-details.service";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {FeedDetailsItem} from "../feed-details-item/feed-details-item";


export const FeedDetails: FC = () => {

    const {orderId} = useParams<{ orderId: string }>()

    const ingredientsData = useSelector(store => store.ingredients.data)

    const {
        data: {
            orders
        }
    } = useSelector(store => store.ws)

    const detailsInfo = useMemo(() => {
        const orderList: Array<TWSOrder> = orders
        const order = orderList.find(item => item._id === orderId)

        const ingredients = order?.ingredients.reduce((total: Array<IBurgerItem>, item) => {
            const ingredient = ingredientsData.find((burgerItem) => burgerItem._id === item)
            if (ingredient) total.push(ingredient)
            return total
        }, [])

        const totalPrice = ingredients?.reduce((total, item) => {
            return total + item.price
        }, 0)

        const created = dateFormatter(order?.createdAt)

        return {
            order,
            ingredients,
            totalPrice,
            created,
        }
    }, [orders])


    const statusMapper = (status: string) => {
        switch (status) {
            case 'done':
                return "Выполнен"
            case 'pending':
                return "Ожидание"
            case 'created':
                return "Создан"
            default:
                return "Ошибка получения статуса"

        }
    }

    if (!detailsInfo.order) {
        return <div>Загрузка...</div>
    }

    return (
        <div className={styles.feedDetails}>
            <div className={"text text_type_digits-default"} style={{margin: '0 0 20px 0',width: '30%'}}>
                {'#' + detailsInfo.order.number}
            </div>
            <div className={"text text_type_main-default"}>
                {detailsInfo.order.name}
            </div>
            <div className={"text text_type_main-small"} style={{marginBottom: '25px', color: 'cadetblue'}}>
                {statusMapper(detailsInfo.order.status)}
            </div>
            <div>
                <h2 style={{marginBottom: '15px'}}>Состав:</h2>
                <FeedDetailsItem items={detailsInfo?.ingredients} />
            </div>
            <div className={styles.feedDetailsFooter}>
                <div className={'text text_color_inactive'}>
                    {detailsInfo.created}
                </div>
                <div className={styles.price}>
                    <div style={{marginRight: '10px'}}>
                        {detailsInfo.totalPrice}
                    </div>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </div>
    )

}