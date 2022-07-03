import React from "react"
import {fetchUser, saveUser} from "../../api/api";


export const SET_USER_PROFILE_VALUE = 'SET_USER_PROFILE_VALUE'

export const USER_PROFILE_REQUEST = 'USER_PROFILE_REQUEST'
export const USER_PROFILE_SUCCESS = 'USER_PROFILE_SUCCESS'
export const USER_PROFILE_ERROR = 'USER_PROFILE_ERROR'

export function setUserProfileFormValue(field: String, value: String) {
    //@ts-ignore
    return dispatch => {
        dispatch(setFormValue(field, value))
    }

    function setFormValue(field: String, value: String) {
        return {type: SET_USER_PROFILE_VALUE, field, value}
    }
}

export function editProfile(name: String, email: String) {

    let form: User = {
        name: name, email: email
    }

    //@ts-ignore
    return dispatch => {
        dispatch(request(form))
        saveUser(form).then(data => {
            dispatch(success(data))
        })
            .catch(err => {
                dispatch(error(err))
            })
    }

    function request(form: User) {
        return {type: USER_PROFILE_REQUEST, form}
    }

    function success(profile: User) {
        return {type: USER_PROFILE_SUCCESS, profile}
    }

    function error(error: String) {
        return {type: USER_PROFILE_ERROR, error}
    }
}

export function fetchProfile() {

    //@ts-ignore
    return dispatch => {
        dispatch(request())
        fetchUser().then(data => {
            dispatch(success(data))
        })
            .catch(err => {
                dispatch(error(err))
            })
    }

    function request() {
        return {type: USER_PROFILE_REQUEST}
    }

    function success(profile: User) {
        return {type: USER_PROFILE_SUCCESS, profile}
    }

    function error(error: String) {
        return {type: USER_PROFILE_ERROR, error}
    }
}


