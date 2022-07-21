import React from "react";
import {TWSActions} from "../types/ws-action-types";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE'


export const wsSendMessage = (message: JSON): TWSActions => {
    return ({
        type: WS_SEND_MESSAGE,
        payload: message
    })
}

export const wsConnectionStart = (): TWSActions => {
    return ({
        type: WS_CONNECTION_START
    })
}

export const wsConnectionSuccess = (): TWSActions => {
    return ({
        type: WS_CONNECTION_SUCCESS
    })
}

export const wsConnectionError = (event: Event): TWSActions => {
    return ({
        type: WS_CONNECTION_ERROR,
        payload: event
    })
}

export const wsConnectionClosed = (): TWSActions => {
    return ({
        type: WS_CONNECTION_CLOSED
    })
}

export const wsGetMessage = (message: Event): TWSActions => {
    return ({
        type: WS_GET_MESSAGE,
        payload: message
    })
}