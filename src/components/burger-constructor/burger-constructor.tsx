import React from 'react';
import styles from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {BurgerData} from "../burger-ingredients/burger-ingredients";


interface IBurgerConstructor {
    data: BurgerData
}

export default class BurgerConstructor extends React.Component<IBurgerConstructor> {

    render() {

        return (
            <div className={styles.wrapper}>
                <div className={styles.burgerBun + " pl-9 pr-2"}>
                    <ConstructorElement text={'Краторная булка N-200i (верх)'}
                                        isLocked={true}
                                        type={'top'}
                                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                                        price={1255}/>
                </div>
                <div className={styles.ingredientList + " mb-1 mt-1"}>
                    <ul className={styles.list}>
                        {this.props.data.map((item, index) => (
                            <li key={'novice_item_' + index} className={styles.listItem}>
                                <div className={styles.iconWrapper}>
                                    <DragIcon type={"primary"}/>
                                </div>
                                <div className={styles.listItem}>
                                    <ConstructorElement key={index}
                                                        text={item.name}
                                                        thumbnail={item.image}

                                                        price={item.price}/>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.burgerBun + " pl-10 pr-2"}>
                    <ConstructorElement text={'Краторная булка N-200i (низ)'}
                                        isLocked={true}
                                        type={'bottom'}
                                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                                        price={1255}/>
                </div>
                <div className={styles.summary + " mr-4 mt-5"}>
                    <div className={"text text_type_digits-default mr-4"}>
                        <span className={"text text_type_digits-medium"}>610</span>
                        <span className={styles.currency}> <CurrencyIcon type={"primary"}/></span>
                    </div>
                    <Button type={"primary"} size={"large"}>Оформить заказ</Button>
                </div>
            </div>
        );

    }

}