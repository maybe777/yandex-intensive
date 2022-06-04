import React, {useRef, useState} from 'react';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import withModal from "../hocs/with-modal";
import OrderDetails from "../details-order/order-details";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {addItem} from "../../redux/actions/constructor-actions";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import chief from '../../images/cooking.png'
import ChiefCook from "../chief-cook/chief-cook";


export default function BurgerConstructor() {

    const data = useSelector((store: any) => store.burger.items)

    const dispatch = useDispatch();

    const dropSortRef = useRef(null)

    const [state, setState] = useState<IBurgerConstructorState>({
        isVisible: false
    })

    const [{isHover}, dropTarget] = useDrop(() => ({
        accept: "burgerItem",
        drop: (item) => {
            // @ts-ignore
            dispatch(addItem(item))
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    }))

    const BUN: BurgerItem[] = data.filter((item: BurgerItem | any) => {
        return item.type === "bun";
    }).slice(0, 1)

    const INGREDIENTS: BurgerItem[] = data.filter((item: BurgerItem | any) => {
        return item.type !== "bun";
    })

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

    function calculateOrder(burger: BurgerItem[]) {
        return burger.reduce((result: number, currValue: BurgerItem | any) => {
            if (currValue.type === 'bun') {
                return currValue.price * 2
            }
            return result + currValue.price;
        }, 0)
    }

    function openModal() {
        setState({...state, isVisible: true})
    }

    function closeModal() {
        setState({...state, isVisible: false})
    }

    const WithModal = withModal(OrderDetails)

    const mainStyle = isHover ? styles.main + " " + styles.onHoverMain : styles.main

    return (
        <div ref={dropTarget} className={mainStyle}>
            <div className={styles.bun + " pl-5 pr-2 mr-2"}>
                {burgerTop}
            </div>
            <div className={styles.ingredientList + " mb-1 mt-1"}>
                {INGREDIENTS.length > 0 ?
                    <ul className={styles.list}>
                        {INGREDIENTS.map((item: BurgerItem | any, index: number) => (
                            <li key={'novice_item_' + index} className={styles.item}>
                                <BurgerConstructorItem item={item} index={index + 1}/>
                            </li>
                        ))}
                    </ul>
                    :
                    <ChiefCook/>
                }
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
    );

}