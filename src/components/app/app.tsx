import React from 'react';
import './app.module.css';
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import data from "../utils/data.json"


function App() {

    return (
        <div className={styles.container}>
            <AppHeader/>
            <div className={styles.topic}>
                <h1>Соберите бургер</h1>
            </div>
            <div className={styles.appContainer}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </div>
        </div>
    );
}

export default App;
