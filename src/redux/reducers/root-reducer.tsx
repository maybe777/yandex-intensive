import React from "react";
import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients-reducer";
import orderReducer from "./order-reducer";
import detailsReducer from "./details-reducer";
import constructorReducer from "./constructor-reducer";
import {authReducer} from "./auth-reducer";
import {registrationReducer} from "./register-reducer";
import {userProfileReducer} from "./user-profile-reducer";


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    details: detailsReducer,
    burger: constructorReducer,
    auth: authReducer,
    register: registrationReducer,
    profile: userProfileReducer
});

export default rootReducer;