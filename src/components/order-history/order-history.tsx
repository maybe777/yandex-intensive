import React from "react";
import {useSelector} from "../../service/hooks";
import {FeedList} from "../feed-list/feed-list";
import styles from "./order-history.module.css"


export const OrderHistory = () => {

    const {
        data: {
            orders
        }
    } = useSelector(store => store.wsOrder)

    const orderList: Array<TWSOrder> = orders

    orderList.sort((a: TWSOrder, b: TWSOrder) => {
        const numA = a.number;
        const numB = b.number;

        let comparison = 0;

        if (numA > numB) {
            comparison = 1;
        } else if (numA < numB) {
            comparison = -1;
        }
        return comparison * -1;
    });

    return (
        <div className={styles.listWrapper}>
            <FeedList items={orderList}/>
        </div>
    )


}
