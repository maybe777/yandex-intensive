import React from "react";
import {TWSActions} from "../types/ws-action-types";

export const WS_FEED_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_FEED_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'
export const WS_FEED_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_FEED_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED'
export const WS_FEED_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'
export const WS_FEED_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE'


export const wsConnection = (url: string): TWSActions => {
    return ({
        type: WS_FEED_CONNECTION_START,
        payload: url
    })
}

export const wsConnectionClosed = (): TWSActions => {
    return ({
        type: WS_FEED_CONNECTION_CLOSED
    })
}