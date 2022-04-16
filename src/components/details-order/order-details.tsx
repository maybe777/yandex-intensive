import React from "react";
import styles from './order-details.module.css'
import approve from '../../images/done.png'


export default function OrderDetails() {

    return (
        <div className={styles.details}>
            <p className="text text_type_digits-large pt-4">034536</p>
            <p className="text text_type_main-medium pt-5">идентификатор заказа</p>
            <p className="mt-15"><img src={approve} alt={"Order approval image"}/></p>
            <p className="text text_type_main-default mt-10">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default mt-2"><span style={{color: '#8585AD'}}>Дождитесь готовности на орбитальной станции</span>
            </p>
        </div>
    );

}