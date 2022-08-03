import React, {FC} from "react";
import {useSelector} from "../../service/hooks";
import styles from './feed.module.css'
import {FeedComponent} from "../../components/feed-component/feed-component";
import {Link, useLocation} from "react-router-dom";


export const Feed: FC = () => {

    const location = useLocation()


    const {
        data: {
            orders,
            total,
            totalToday
        }
    } = useSelector(store => store.ws)

    const orderList: Array<TWSOrder> = orders

    orderList.map(order => {
        console.log("Order from parent: " + order._id)
    })



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
                            orderList.map((item: TWSOrder) => (
                                <Link
                                    to={{
                                        pathname: '/feed/' + item._id,
                                        state: {background: location}
                                    }}>
                                    <li key={item._id} className={styles.feedListItem}>
                                        <FeedComponent
                                            _id={item._id}
                                            createdAt={item.createdAt}
                                            ingredients={item.ingredients}
                                            number={item.number}
                                            name={item.name}
                                            status={item.status}
                                            updatedAt={item.updatedAt}
                                        />

                                    </li>
                                </Link>))}
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