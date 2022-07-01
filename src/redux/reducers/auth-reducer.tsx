import React from "react";
import {
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_ERROR,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    SET_LOGIN_FORM_VALUE
} from "../actions/auth-actions";


const initialState = {
    form: {
        login: '',
        password: ''
    },

    loggedIn: false,
    loggedOut: true,
    loginRequest: false,
    logoutRequest: false,
    loginError: false,
    logoutError: false,
    user: {
        name: '',
        email: ''
    }
}

export function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_LOGIN_FORM_VALUE:
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggedOut: false,
                loginRequest: false,
                form: {
                    ...initialState.form
                },
                user: action.user
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginRequest: false,
                loginError: true
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                logoutRequest: true
            }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                loggedOut: true,
                loggedIn: false,
                user: {...initialState.user}
            }
        }
        case LOGOUT_ERROR: {
            return {
                ...state,
                logoutError: true
            }
        }
        default:
            return state
    }

}
