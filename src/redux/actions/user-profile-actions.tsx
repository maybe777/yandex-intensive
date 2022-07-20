import React from "react"
import {fetchUser, saveUser} from "../../api/api";
import {TPersonalSpaceAction} from "../types/user-profile-action-types";
import {AppDispatch} from "../types";


export const SET_USER_PROFILE_VALUE: 'SET_USER_PROFILE_VALUE' = 'SET_USER_PROFILE_VALUE'
export const USER_PROFILE_REQUEST: 'USER_PROFILE_REQUEST' = 'USER_PROFILE_REQUEST'
export const USER_PROFILE_SUCCESS: 'USER_PROFILE_SUCCESS' = 'USER_PROFILE_SUCCESS'
export const USER_PROFILE_ERROR: 'USER_PROFILE_ERROR' = 'USER_PROFILE_ERROR'
export const USER_PROFILE_EDIT_REQUEST: 'USER_PROFILE_EDIT_REQUEST' = 'USER_PROFILE_EDIT_REQUEST'
export const USER_PROFILE_EDIT_SUCCESS: 'USER_PROFILE_EDIT_SUCCESS' = 'USER_PROFILE_EDIT_SUCCESS'
export const USER_PROFILE_EDIT_ERROR: 'USER_PROFILE_EDIT_ERROR' = 'USER_PROFILE_EDIT_ERROR'

export const setUserProfileFormValue = (field: string, value: string) => (dispatch: AppDispatch) => {

    dispatch(setFormValue(field, value))

    function setFormValue(field: string, value: string): TPersonalSpaceAction {
        return {type: SET_USER_PROFILE_VALUE, field, value}
    }
}

export const fetchProfile = () => (dispatch: AppDispatch) => {

    dispatch(fetchProfileRequest())
    fetchUser().then(data => {
        dispatch(fetchProfileSuccess(data))
    })
        .catch(err => {
            dispatch(fetchProfileError(err))
        })

    function fetchProfileRequest(): TPersonalSpaceAction {
        return {type: USER_PROFILE_REQUEST}
    }

    function fetchProfileSuccess(user: TUser): TPersonalSpaceAction {
        return {type: USER_PROFILE_SUCCESS, user}
    }

    function fetchProfileError(error: string): TPersonalSpaceAction {
        return {type: USER_PROFILE_ERROR, error}
    }
}


export const editProfile = (name: string, email: string) => (dispatch: AppDispatch) => {

    let form: TUser = {
        name: name, email: email
    }

    dispatch(editProfileRequest(form))

    saveUser(form).then(data => {
        dispatch(editProfileSuccess(data))
    })
        .catch(err => {
            dispatch(editProfileError(err))
        })

    function editProfileRequest(form: TUser): TPersonalSpaceAction {
        return {type: USER_PROFILE_EDIT_REQUEST, form}
    }

    function editProfileSuccess(user: TUser): TPersonalSpaceAction {
        return {type: USER_PROFILE_EDIT_SUCCESS, user}
    }

    function editProfileError(error: string): TPersonalSpaceAction {
        return {type: USER_PROFILE_EDIT_ERROR, error}
    }
}

