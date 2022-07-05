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
        dispatch(editProfileRequest(form))
        saveUser(form).then(data => {
            dispatch(editProfileSuccess(data))
        })
            .catch(err => {
                dispatch(editProfileError(err))
            })
    }

    function editProfileRequest(form: User) {
        return {type: USER_PROFILE_REQUEST, form}
    }

    function editProfileSuccess(profile: User) {
        return {type: USER_PROFILE_SUCCESS, profile}
    }

    function editProfileError(error: String) {
        return {type: USER_PROFILE_ERROR, error}
    }
}

export function fetchProfile() {

    //@ts-ignore
    return dispatch => {
        dispatch(fetchProfileRequest())
        fetchUser().then(data => {
            dispatch(fetchProfileSuccess(data))
        })
            .catch(err => {
                dispatch(fetchProfileError(err))
            })
    }

    function fetchProfileRequest() {
        return {type: USER_PROFILE_REQUEST}
    }

    function fetchProfileSuccess(profile: User) {
        return {type: USER_PROFILE_SUCCESS, profile}
    }

    function fetchProfileError(error: String) {
        return {type: USER_PROFILE_ERROR, error}
    }
}


