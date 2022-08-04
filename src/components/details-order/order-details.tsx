import styles from './order-details.module.css'
import approve from '../../images/done.png'
import ErrorHandler from "../error/error-handler";
import {useDispatch, useSelector} from "../../service/hooks";
import React, {FC, useEffect} from "react";
import {getOrder} from "../../redux/actions/order-actions";


const OrderDetails: FC = () => {

    const {orderNumber, orderFailed}: TOrderDetails = useSelector(store => ({
        orderNumber: store.order.number,
        orderFailed: store.order.orderFailed
    }));

    const ingredients: Array<string> = []
    const burger = useSelector(store => store.burger.items)
    const orderRequest = useSelector(store => store.order.orderRequest)

    burger.map(item => {
        ingredients.push(item._id)
    })

    const dispatch = useDispatch();

    useEffect(() => {
        if (ingredients && ingredients.length > 0) {
            dispatch(getOrder(ingredients))
        }
    }, [dispatch])

    if (ingredients.length === 1) {
        return (
            <div className={styles.container}>
                <p>Выберите ингредиенты</p>
            </div>
        )
    } else if (orderFailed) {
        return (
            <div className={styles.container}>
                <ErrorHandler/>
            </div>
        )
    } else {
        return orderRequest ? (
            <div className={styles.details}>
                <p className={'text text_type_main-default'}>Загрузка...</p>
            </div>
        ) : (
            <div className={styles.details}>
                <p className="text text_type_digits-large">{orderNumber}</p>
                <p className="text text_type_main-medium pt-5">идентификатор заказа</p>
                <p className="mt-15"><img src={approve} alt={"Order approval image"}/></p>
                <p className="text text_type_main-default mt-10">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default mt-2"><span style={{color: '#8585AD'}}>Дождитесь готовности на орбитальной станции</span>
                </p>
            </div>)
    }

}

export default OrderDetails