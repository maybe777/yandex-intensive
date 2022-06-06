import React, {useContext, useEffect, useState} from "react";
import styles from './order-details.module.css'
import approve from '../../images/done.png'
import {OrderDetailsContext} from "../../service/burger-context";
import ErrorHandler from "../error/error-handler";
import {BASE_URL, BurgerItem, checkResponse} from "../app/app";


interface OrderDetailsState {
    isLoading?: Boolean,
    isError?: Boolean,
    visible?: Boolean,
    number?: any
}

export default function OrderDetails() {

    const burger = useContext(OrderDetailsContext);

    const requestBody = burger.map((item: BurgerItem | any, index) => {
        return item._id
    })

    useEffect(() => {
        setState({...state, isLoading: true})
        fetchOrder()
            .then(res => {
                console.log("Order data loading success.")
            })
    }, [])

    const [state, setState] = useState<OrderDetailsState>({
        isLoading: false,
        isError: false,
        visible: false,
        number: ""
    });

    const URL = BASE_URL + "/orders";

    const fetchOrder = async () => {
        setState({...state, isLoading: true});
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ingredients: requestBody})
        })
            .then(checkResponse)
            .then(data => {
                if (data.success === true) {
                    setState({...state, isLoading: false, number: data.order.number})
                } else {
                    throw new Error("Loading error.")
                }
            })
            .catch(e => {
                console.log(e)
                setState({...state, isLoading: false, isError: true})
            })
    }

    if (state.isError === true) {
        return (
            <div className={styles.container}>
                <ErrorHandler/>
            </div>
        )
    } else {
        return (
            <div className={styles.details}>
                <p className="text text_type_digits-large pt-4">{state.number}</p>
                <p className="text text_type_main-medium pt-5">идентификатор заказа</p>
                <p className="mt-15"><img src={approve} alt={"Order approval image"}/></p>
                <p className="text text_type_main-default mt-10">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default mt-2"><span style={{color: '#8585AD'}}>Дождитесь готовности на орбитальной станции</span>
                </p>
            </div>);
    }

}