import React from 'react';
import './App.css';
import AppHeader from "./components/header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import Wrapper from "./components/wrapper/wrapper";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
    return (
        <div className='container'>
            <AppHeader/>
            <Wrapper />
            <div className="app-container">
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </div>
    );
}

export default App;
