import React, {useEffect, useState} from 'react';
import './app.module.css';
import AppHeader from "../header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import styles from './app.module.css'
import ErrorHandler from "../error/error-handler";
import {AppContext} from "../../service/app-context";

export type BurgerItem = {
    _id: string,
    name: string,
    type?: String,
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
    data: BurgerItem[]
}

export const BASE_URL = "https://norma.nomoreparties.space/api"

export function checkResponse(res: Response){
    if (res.ok) {
        return res.json()
    }
    throw new Error('Network response was not status 200.');
}

function App() {

    const URL = BASE_URL + "/ingredients"

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
            .then(checkResponse)
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
                <AppContext.Provider value={state.data}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </AppContext.Provider>
            </div>
        );
    }
}

export default App;
