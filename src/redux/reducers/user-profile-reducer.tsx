import React from "react";
import {
    SET_USER_PROFILE_VALUE,
    USER_PROFILE_ERROR,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS
} from "../actions/user-profile-actions";


const initialState = {
    form: {
        name: "",
        email: ""
    },
    profileRequest: false,
    profileError: false,
    error: ""
}

export function userProfileReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_USER_PROFILE_VALUE:
            return {
                form: {
                    ...state.form,
                    [action.field]: action.value
                }
            }
        case USER_PROFILE_REQUEST:
            return {
                ...state,
                profileRequest: true
            }
        case USER_PROFILE_SUCCESS:
            return {
                ...state,
                profileRequest: false,
                form: action.profile
            }
        case USER_PROFILE_ERROR:
            return {
                ...state,
                profileRequest: false,
                profileError: true,
                error: action.error
            }
        default:
            return state
    }
}
