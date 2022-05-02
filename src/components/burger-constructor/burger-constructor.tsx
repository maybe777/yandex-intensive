import React, {useContext, useState} from 'react';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import withModal from "../hocs/with-modal";
import OrderDetails from "../details-order/order-details";
import {AppContext} from "../../service/app-context";
import {BurgerData} from "../app/app";
import {OrderDetailsContext} from '../../service/burger-context';


interface IBurgerConstructorState {
    isVisible?: Boolean
}

export default function BurgerConstructor() {

    const data = useContext(AppContext);

    const [state, setState] = useState<IBurgerConstructorState>({
        isVisible: false
    });

    const BUN: BurgerData[] = data.filter((item: BurgerData | any) => {
        return item.type === "bun";
    }).slice(0, 1);

    const INGREDIENTS: BurgerData[] = data.filter((item: BurgerData | any) => {
        return item.type !== "bun";
    });

    let burgerTop = (
        BUN.map((item: any, index: number) => (
            <ConstructorElement key={index}
                                text={item.name + " (верх)"}
                                isLocked={true}
                                type={'top'}
                                thumbnail={item.image}
                                price={item.price}/>
        ))
    );

    let burgerBottom = (
        BUN.map((item: any, index: number) => (
            <ConstructorElement key={index}
                                text={item.name + " (низ)"}
                                isLocked={true}
                                type={'bottom'}
                                thumbnail={item.image}
                                price={item.price}/>
        ))
    );

    const burger = BUN.concat(INGREDIENTS);

    function calculateOrder(burger: BurgerData[]) {
        return burger.reduce((result: number, currValue: BurgerData | any) => {
            return result + currValue.price;
        }, 0)
    }

    function openModal() {
        setState({...state, isVisible: true})
    }

    function closeModal() {
        setState({...state, isVisible: false})
    }

    const WithModal = withModal(OrderDetails);

    return (
            <OrderDetailsContext.Provider value={burger}>
                <div>
                    <div className={styles.bun + " pl-5 pr-2 mr-2"}>
                        {burgerTop}
                    </div>
                    <div className={styles.ingredientList + " mb-1 mt-1"}>
                        <ul className={styles.list}>
                            {INGREDIENTS.map((item: BurgerData | any, index: number) => (
                                <li key={'novice_item_' + index} className={styles.item}>
                                    <div className={styles.drag}>
                                        <DragIcon type={"primary"}/>
                                    </div>
                                    <div className={styles.item + " pt-2 mr-2"}>
                                        <ConstructorElement key={index}
                                                            text={item.name}
                                                            thumbnail={item.image}
                                                            price={item.price}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.bun + " pl-5 pr-2 pt-2 mr-2"}>
                        {burgerBottom}
                    </div>


                    <div className={styles.summary + " mr-4 mt-5 pt-5"}>
                        <div className={"text text_type_digits-default mr-4"}>
                            <span className={"text text_type_digits-medium"}>{calculateOrder(burger)}</span>
                            <span className={styles.currency}> <CurrencyIcon type={"primary"}/></span>
                        </div>
                        <Button type={"primary"} size={"large"} onClick={openModal}>Оформить заказ</Button>
                        <WithModal isOpen={state.isVisible} onClose={closeModal}/>
                    </div>
                </div>
            </OrderDetailsContext.Provider>
    );

}