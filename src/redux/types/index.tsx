import store from "../store";
import {TAuthActions} from "./auth-actions-types";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions = TAuthActions;

// Типизация thunk приложения
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

//Типизация dispatch
export type AppDispatch = typeof store.dispatch;