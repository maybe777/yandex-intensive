import React from "react";
import {TWSActions} from "../types/ws-action-types";

const WSInitialState: TWSInitState = {
    wsConnect: false,
    wsRequest: false,
    messages: [],
    error: undefined
}

export const wsReducer = (state = WSInitialState, action: TWSActions) => {
    switch (action.type) {
        case "WS_CONNECTION_START":
            return {
                ...state,
                wsRequest: true
            }
        case "WS_CONNECTION_SUCCESS":
            return {
                ...state,
                wsRequest: false,
                wsConnect: true,
                error: undefined
            }
        case "WS_CONNECTION_ERROR":
            return {
                ...state,
                wsRequest: false,
                wsConnect: false,
                error: action.payload
            }
        case "WS_CONNECTION_CLOSED":
            return {
                ...state,
                wsConnect: false,
                error: action.payload
            }
        case "WS_GET_MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state
    }
}