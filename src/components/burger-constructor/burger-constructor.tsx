import React, {useState} from 'react';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerData, BurgerItem} from '../app/app';
import withModal from "../hocs/with-modal";
import OrderDetails from "../details-order/order-details";


interface IBurgerConstructor {
    data: BurgerData[]
}

interface IBurgerConstructorState {
    isVisible?: Boolean
}

export default function BurgerConstructor(props: IBurgerConstructor) {

    const [state, setState] = useState<IBurgerConstructorState>({
        isVisible: false
    })

    function openModal() {
        setState({...state, isVisible: true})
    }

    function closeModal() {
        setState({...state, isVisible: false})
    }

    const WithModal = withModal(OrderDetails);

    return (
        <div>
            <div>
                <div className={styles.bun + " pl-5 pr-2 mr-2"}>
                    <ConstructorElement text={'Краторная булка N-200i (верх)'}
                                        isLocked={true}
                                        type={'top'}
                                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                                        price={1255}/>
                </div>
                <div className={styles.ingredientList + " mb-1 mt-1"}>
                    <ul className={styles.list}>
                        {props.data.map((item, index) => (
                            <li key={'novice_item_' + index} className={styles.item}>
                                <div className={styles.drag}>
                                    <DragIcon type={"primary"}/>
                                </div>
                                <div className={styles.item + " pt-2 mr-2"}>
                                    <ConstructorElement key={index}
                                        //@ts-ignore
                                                        text={item.name}
                                        //@ts-ignore
                                                        thumbnail={item.image}
                                        //@ts-ignore
                                                        price={item.price}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.bun + " pl-5 pr-2 pt-2 mr-2"}>
                    <ConstructorElement text={'Краторная булка N-200i (низ)'}
                                        isLocked={true}
                                        type={'bottom'}
                                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                                        price={1255}/>
                </div>
                <div className={styles.summary + " mr-4 mt-5 pt-5"}>
                    <div className={"text text_type_digits-default mr-4"}>
                        <span className={"text text_type_digits-medium"}>610</span>
                        <span className={styles.currency}> <CurrencyIcon type={"primary"}/></span>
                    </div>
                    <Button type={"primary"} size={"large"} onClick={openModal}>Оформить заказ</Button>
                    <WithModal isOpen={state.isVisible} onClose={closeModal}/>
                </div>
            </div>
        </div>
    );

}