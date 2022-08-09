import {TWSOrderActions} from "../types/ws-order-action-types";
import {getCookieItem} from "../../service/token-service";

export const WS_ORDER_CONNECTION_START: 'WS_ORDER_CONNECTION_START' = 'WS_ORDER_CONNECTION_START'
export const WS_ORDER_CONNECTION_SUCCESS: 'WS_ORDER_CONNECTION_SUCCESS' = 'WS_ORDER_CONNECTION_SUCCESS'
export const WS_ORDER_CONNECTION_ERROR: 'WS_ORDER_CONNECTION_ERROR' = 'WS_ORDER_CONNECTION_ERROR'
export const WS_ORDER_CONNECTION_CLOSED: 'WS_ORDER_CONNECTION_CLOSED' = 'WS_ORDER_CONNECTION_CLOSED'
export const WS_ORDER_GET_MESSAGE: 'WS_ORDER_GET_MESSAGE' = 'WS_ORDER_GET_MESSAGE'
export const WS_ORDER_SEND_MESSAGE: 'WS_ORDER_SEND_MESSAGE' = 'WS_ORDER_SEND_MESSAGE'

export const wsOrderConnection = (url: string): TWSOrderActions => {

    const token = getCookieItem('accessToken')
    const ORDER_URL = url + '?token=' + token

    return ({
        type: WS_ORDER_CONNECTION_START,
        payload: ORDER_URL
    })
}

export const wsOrderConnectionClosed = (): TWSOrderActions => {
    return ({
        type: WS_ORDER_CONNECTION_CLOSED
    })
}