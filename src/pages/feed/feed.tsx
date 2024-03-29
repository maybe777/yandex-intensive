import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "../../service/hooks";
import styles from './feed.module.css'
import {FeedList} from "../../components/feed-list/feed-list";
import {wsConnection, wsConnectionClosed} from "../../redux/actions/ws-feed-actions";


export const Feed: FC = () => {

    const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all'
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnection(WS_FEED_URL))
        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

    const {
        data: {
            orders,
            total,
            totalToday
        }
    } = useSelector(store => store.ws)

    const orderList: Array<TWSOrder> = orders

    const ready = orderList.filter((order: TWSOrder) => {
        return order.status === 'done'
    }).slice(0, 10);

    const making = orderList.filter((order: TWSOrder) => {
        return order.status === 'pending'
    }).slice(0, 10);

    return (
        <div className={styles.feed}>
            <div className={styles.feedGrid}>

                <div className={styles.feedHead}>
                    <h1>Лента заказов</h1>
                </div>

                <FeedList items={orderList}/>

                <div className={styles.orderStat}>
                    <div className={styles.ready}>
                        <h4>Готовы:</h4>
                        <ul className={styles.split}>
                            {ready.map((item: TWSOrder, index: number) => (
                                <li key={index} className={"text text_type_digits-default"}>
                                    {item.number}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.making}>
                        <h4>В работе:</h4>
                        <ul className={styles.split}>
                            {making.map((item: TWSOrder, index: number) => (
                                <li key={index} className={"text text_type_digits-default"}>
                                    {item.number}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.total}>
                        <h4>Выполнено за все время:</h4>
                        <p className="text text_type_digits-large" style={{color: "white"}}>{total}</p>
                    </div>
                    <div className={styles.today}>
                        <h4>Выполнено за сегодня:</h4>
                        <p className="text text_type_digits-large" style={{color: "white"}}>{totalToday}</p>
                    </div>
                </div>
            </div>
        </div>
    );

}