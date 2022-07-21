import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE, WS_SEND_MESSAGE
} from "../actions/websocket-actions";

interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR,
    payload?: Event
}

interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE
    payload: Event
}

interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE
    payload: JSON
}

export type TWSActions = IWSConnectionStart | IWSConnectionSuccess | IWSConnectionError
    | IWSConnectionClosed | IWSGetMessage | IWSSendMessage