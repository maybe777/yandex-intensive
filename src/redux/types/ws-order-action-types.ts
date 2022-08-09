import {
    WS_ORDER_CONNECTION_CLOSED,
    WS_ORDER_CONNECTION_ERROR,
    WS_ORDER_CONNECTION_START,
    WS_ORDER_CONNECTION_SUCCESS, WS_ORDER_GET_MESSAGE, WS_ORDER_SEND_MESSAGE
} from "../actions/ws-order-actions";

interface IWSOrderConnectionStart {
    readonly type: typeof WS_ORDER_CONNECTION_START,
    payload: string
}

interface IWSOrderConnectionSuccess {
    readonly type: typeof WS_ORDER_CONNECTION_SUCCESS,
    payload: Event
}

interface IWSOrderConnectionError {
    readonly type: typeof WS_ORDER_CONNECTION_ERROR,
    payload?: Event
}

interface IWSOrderConnectionClosed {
    readonly type: typeof WS_ORDER_CONNECTION_CLOSED
    payload?: number
}

interface IWSOrderGetMessage {
    readonly type: typeof WS_ORDER_GET_MESSAGE
    payload: Event
}

interface IWSOrderSendMessage {
    readonly type: typeof WS_ORDER_SEND_MESSAGE
    payload: JSON
}

export type TWSOrderActions = IWSOrderConnectionStart | IWSOrderConnectionSuccess | IWSOrderConnectionError
    | IWSOrderConnectionClosed | IWSOrderGetMessage | IWSOrderSendMessage