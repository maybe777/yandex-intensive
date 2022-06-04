import React from 'react'
import './app.module.css'
import AppHeader from "../header/app-header"
import BurgerIngredients from "../burger-ingredients/burger-ingredients"
import BurgerConstructor from "../burger-constructor/burger-constructor"
import styles from './app.module.css'
import ErrorHandler from "../error/error-handler"
import {useSelector} from "react-redux"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"


function App() {

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
            <div className={styles.container}>
                <AppHeader/>
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

export default App;
