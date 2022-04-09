import React, {useEffect, useState} from 'react';
import './app.module.css';
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import ErrorHandler from "../error/error-handler";


export type BurgerData = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}[]

export type BurgerItem = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

interface MainState {
    isLoading?: Boolean,
    isError?: Boolean,
    visible?: Boolean,
    data: BurgerData[]
}

function App() {

    const URL = "https://norma.nomoreparties.space/api/ingredients"

    const [state, setState] = useState<MainState>({
        isLoading: false,
        isError: false,
        visible: false,
        data: []
    });

    useEffect(() => {
        fetchData().then(r => console.log("Data loading success."));
    }, [])

    const fetchData = async () => {
        setState({...state, isLoading: true});
        await fetch(URL)
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setState({...state, isLoading: false, data: data.data})
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
            <div className={styles.container}>
                <AppHeader/>
                <div className={styles.topic}>
                    <h1>Соберите бургер</h1>
                </div>
                <BurgerIngredients data={state.data}/>
                <BurgerConstructor data={state.data}/>
            </div>
        );
    }
}

export default App;
