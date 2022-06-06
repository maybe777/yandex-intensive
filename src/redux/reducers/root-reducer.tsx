import React from "react";
import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients-reducer";
import orderReducer from "./order-reducer";
import detailsReducer from "./details-reducer";
import constructorReducer from "./constructor-reducer";


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    details: detailsReducer,
    burger: constructorReducer
});

export default rootReducer;