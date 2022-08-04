import React from "react";
import {useSelector} from "../../service/hooks";
import {FeedList} from "../feed-list/feed-list";
import styles from "./order-history.module.css"


export const OrderHistory = () => {

    const {
        data: {
            orders
        }
    } = useSelector(store => store.ws)

    const orderList: Array<TWSOrder> = orders


    return (
        <div className={styles.listWrapper}>
            <FeedList items={orderList}/>
        </div>
    )


}
