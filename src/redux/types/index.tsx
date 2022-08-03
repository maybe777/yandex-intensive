import {TAuthActions} from "./auth-actions-types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TConstructorActions} from "./constructor-actions-types";
import {TIngredientsActions} from "./ingredients-actions-types";
import {TOrderActions} from "./order-actions-types";
import {TRegisterActions} from "./register-actions-types";
import {TPersonalSpaceActions} from "./user-profile-action-types";
import {TWSActions} from "./ws-action-types";
import rootReducer from "../reducers/root-reducer";

export type TRootState = ReturnType<typeof rootReducer>;

// Типизация всех экшенов приложения
export type TApplicationActions = TAuthActions | TConstructorActions |
    TIngredientsActions | TOrderActions | TRegisterActions | TPersonalSpaceActions | TWSActions;

// Типизация thunk приложения
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TRootState, never, TApplicationActions>;

//Типизация dispatch
export type TAppDispatch = ThunkDispatch<TRootState, never, TApplicationActions>;