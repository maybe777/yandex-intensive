import React from 'react'
import {register} from "../../api/api";
import {TRegisterAction} from "../types/register-actions-types";
import {AppDispatch, AppThunk} from "../types";


export const SET_REGISTER_FORM_VALUE: 'SET_REGISTER_FORM_VALUE' = 'SET_REGISTER_FORM_VALUE'
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS'
export const REGISTER_ERROR: 'REGISTER_ERROR' = 'REGISTER_ERROR'

export const setRegisterFormValue = (field: string, value: string) => (dispatch: AppDispatch) => {

    dispatch(setFormValue(field, value))

    function setFormValue(field: string, value: string): TRegisterAction {
        return {type: SET_REGISTER_FORM_VALUE, field, value}
    }
}

export const userRegister: AppThunk = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {

    let form: TRegisterForm = {
        name: name, email: email, password: password
    }

    dispatch(registerRequest(form));

    register(form)
        .then(() => {
            dispatch(registerSuccess())
        })
        .catch(() => {
            dispatch(registerError())
        });

    function registerRequest(form: TRegisterForm): TRegisterAction {
        return {type: REGISTER_REQUEST, form}
    }

    function registerSuccess(): TRegisterAction {
        return {type: REGISTER_SUCCESS}
    }

    function registerError(): TRegisterAction {
        return {type: REGISTER_ERROR}
    }
}