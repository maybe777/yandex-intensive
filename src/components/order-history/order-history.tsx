import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../service/hooks";
import {FeedList} from "../feed-list/feed-list";
import styles from "./order-history.module.css"
import {getData} from "../../redux/actions/ingredients-actions";
import {wsConnection, wsConnectionClosed} from "../../redux/actions/ws-feed-actions";
import {wsOrderConnection, wsOrderConnectionClosed} from "../../redux/actions/ws-order-actions";
import {getUser} from "../../redux/actions/auth-actions";


export const OrderHistory = () => {

    const WS_ORDER_URL = 'wss://norma.nomoreparties.space/orders'
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsOrderConnection(WS_ORDER_URL))
        return () => {
            dispatch(wsOrderConnectionClosed())
        }
    }, [dispatch])

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
