import {fetchUser, login, logout} from "../../api/api";
import {TAuthActions} from "../types/auth-actions-types";
import {TAppDispatch, TAppThunk} from "../types";


export const SET_LOGIN_FORM_VALUE = 'SET_LOGIN_FORM_VALUE'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGIN_ERROR'

export const setLoginFormValue = (field: string, value: string) => (dispatch: TAppDispatch) => {

    dispatch(setFormValue(field, value))

    function setFormValue(field: string, value: string): TAuthActions {
        return {type: SET_LOGIN_FORM_VALUE, field, value}
    }
}

export const getUser = (): TAppThunk => (dispatch: TAppDispatch) => {

    dispatch(getUserRequest());

    return fetchUser()
        .then(user => {
            dispatch(getUserSuccess(user))
        }).catch(
        () => {
            dispatch(getUserError())
        });


    function getUserRequest(): TAuthActions {
        return {type: GET_USER_REQUEST}
    }

    function getUserSuccess(user: TUser): TAuthActions {
        return {type: GET_USER_SUCCESS, user}
    }

    function getUserError(): TAuthActions {
        return {type: GET_USER_ERROR}
    }
}

export const userLogin = (email: string, password: string): TAppThunk => (dispatch: TAppDispatch) => {

    dispatch(loginRequest());

    return login(email, password)
        .then(data => {
            dispatch(loginSuccess(data.user));
        }).catch(
            () => {
                dispatch(loginError())
            });


    function loginRequest(): TAuthActions {
        return {type: LOGIN_REQUEST}
    }

    function loginSuccess(user: TUser): TAuthActions {
        return {type: LOGIN_SUCCESS, user}
    }

    function loginError(): TAuthActions {
        return {type: LOGIN_ERROR}
    }
}

export const userLogout = () => (dispatch: TAppDispatch) => {

    dispatch(logoutRequest())

    return logout()
        .then(() => {
            dispatch(logoutSuccess())
        })
        .catch(() => {
            dispatch(logoutError())
        })

    function logoutRequest(): TAuthActions {
        return {type: LOGOUT_REQUEST}
    }

    function logoutSuccess(): TAuthActions {
        return {type: LOGOUT_SUCCESS}
    }

    function logoutError(): TAuthActions {
        return {type: LOGOUT_ERROR}
    }
}



