import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "../../service/hooks";
import {wsConnectionClosed, wsConnection} from "../../redux/actions/ws-feed-actions";
import styles from './feed.module.css'
import {FeedComponent} from "../../components/feed-component/feed-component";


export const Feed: FC = () => {

    const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all'

    const {
        data: {
            orders,
            total,
            totalToday
        }
    } = useSelector(store => store.ws)
    const dispatch = useDispatch()

    const orderList: Array<TWSOrder> = orders

    useEffect(() => {
        dispatch(wsConnection(WS_FEED_URL))
        return () => {
            dispatch(wsConnectionClosed())
        }
    }, [dispatch])

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
                <div className={styles.feedList}>
                    <ul className={styles.feedListUl}>
                        {
                            orderList.splice(0, 20).map((item: TWSOrder) => (
                                <li className={styles.feedListItem} key={item._id}>
                                    <FeedComponent
                                        _id={item._id}
                                        createdAt={item.createdAt}
                                        ingredients={item.ingredients}
                                        number={item.number}
                                        name={item.name}
                                        status={item.status}
                                        updatedAt={item.updatedAt}
                                    />
                                </li>))
                        }
                    </ul>
                </div>
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