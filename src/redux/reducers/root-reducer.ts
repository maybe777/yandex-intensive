import {combineReducers} from "redux";
import ingredientsReducer from "./ingredients-reducer";
import orderReducer from "./order-reducer";
import constructorReducer from "./constructor-reducer";
import {authReducer} from "./auth-reducer";
import {registrationReducer} from "./register-reducer";
import {userProfileReducer} from "./user-profile-reducer";
import {wsReducer} from "./ws-feed-reducer";


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    burger: constructorReducer,
    auth: authReducer,
    register: registrationReducer,
    profile: userProfileReducer,
    ws: wsReducer
});

export default rootReducer;