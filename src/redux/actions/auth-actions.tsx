import React from "react";
import {login, logout} from "../../api/api";


export const SET_LOGIN_FORM_VALUE = 'SET_LOGIN_FORM_VALUE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGIN_ERROR'
export const REFRESH_REQUEST = 'REFRESH_REQUEST'
export const REFRESH_SUCCESS = 'REFRESH_SUCCESS'
export const REFRESH_ERROR = 'REFRESH_ERROR'

export function setLoginFormValue(field: String, value: String) {
    //@ts-ignore
    return dispatch => {
        dispatch(setFormValue(field, value))
    }

    function setFormValue(field: String, value: String) {
        return {type: SET_LOGIN_FORM_VALUE, field, value}
    }
}

export function userLogin(email: String, password: String) {
    //@ts-ignore
    return dispatch => {
        dispatch(request(email));

        login(email, password)
            .then(data => {
                //@ts-ignore
                dispatch(success(data.user));
            }).catch(
            err => {
                dispatch(error(err))
            });
    }

    function request(email: String) {
        return {type: LOGIN_REQUEST, email}
    }

    function success(user:User) {
        return {type: LOGIN_SUCCESS, user}
    }

    function error(error: String) {
        return {type: LOGIN_ERROR, error}
    }
}

export function userLogout() {
    //@ts-ignore
    return dispatch => {
        dispatch(request)

        logout()
            .then(() => {
                dispatch(success())
            })
            .catch(err => {
                dispatch(error(err))
            })
    }

    function request() {
        return {type: LOGOUT_REQUEST}
    }

    function success() {
        return {type: LOGOUT_SUCCESS}
    }

    function error(error: String) {
        return {type: LOGOUT_ERROR, error}
    }
}

export function userRefreshToken() {
    //@ts-ignore
    return dispatch => {
        dispatch(request)

        logout()
            .then(dispatch(success()))
            .catch(
                err => {
                    dispatch(error(err))
                })
    }

    function request() {
        return {type: REFRESH_REQUEST}
    }

    function success() {
        return {type: REFRESH_SUCCESS}
    }

    function error(error: String) {
        return {type: REFRESH_ERROR, error}
    }
}



