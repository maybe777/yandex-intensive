import React from 'react';
import styles from './burger-constructor.module.css'
import data from '../utils/data.json'
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export default class BurgerConstructor extends React.Component {


    render() {

        return (
            <div className={styles.wrapper}>
                <div className={styles.burgerBun}>
                    <ConstructorElement text={'Краторная булка N-200i (верх)'}
                                        isLocked={true}
                                        type={'top'}
                                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                                        price={1255}/>
                </div>
                <div className={styles.ingredientList}>
                    <ul className={styles.list}>
                        {data.map((item, index) => (
                            <li className={styles.listItem}>
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
                <div className={styles.burgerBun}>
                    <ConstructorElement text={'Краторная булка N-200i (низ)'}
                                        isLocked={true}
                                        type={'bottom'}
                                        thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                                        price={1255}/>
                </div>
                <div className={styles.summary}>
                    <div className={styles.price}>
                        <span>610</span>
                        <span className={styles.currency}> <CurrencyIcon type={"primary"}/></span>
                    </div>
                    <Button type={"primary"} size={"large"}>Оформить заказ</Button>
                </div>
            </div>
        );

    }

}