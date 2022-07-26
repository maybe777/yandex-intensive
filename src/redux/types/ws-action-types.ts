import {
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE, WS_FEED_SEND_MESSAGE
} from "../actions/ws-feed-actions";

interface IWSConnectionStart {
    readonly type: typeof WS_FEED_CONNECTION_START,
    payload: string
}

interface IWSConnectionSuccess {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS,
    payload: Event
}

interface IWSConnectionError {
    readonly type: typeof WS_FEED_CONNECTION_ERROR,
    payload?: Event
}

interface IWSConnectionClosed {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED
    payload?: number
}

interface IWSGetMessage {
    readonly type: typeof WS_FEED_GET_MESSAGE
    payload: Event
}

interface IWSSendMessage {
    readonly type: typeof WS_FEED_SEND_MESSAGE
    payload: JSON
}

export type TWSActions = IWSConnectionStart | IWSConnectionSuccess | IWSConnectionError
    | IWSConnectionClosed | IWSGetMessage | IWSSendMessage