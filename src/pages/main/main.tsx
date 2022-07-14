import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import styles from "./main.module.css";
import ErrorHandler from "../../components/error/error-handler";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
export default function MainPage(){

    // @ts-ignore
    const dataFailed = useSelector((store: IInitState) => store.ingredients.dataFailed);

    if (dataFailed) {
        return (
            <div className={styles.container}>
                <ErrorHandler/>
            </div>
        )
    } else {
        return (
            <div className={styles.main}>
                <div className={styles.topic}>
                    <h1>Соберите бургер</h1>
                </div>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
        );
    }
}
