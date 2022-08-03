import {TWSActions} from "../types/ws-action-types";

const WSInitialState: TWSInitState = {
    wsConnect: false,
    wsRequest: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    error: undefined,
    item: null
}

export const wsReducer = (state = WSInitialState, action: TWSActions) => {
    switch (action.type) {
        case "WS_FEED_CONNECTION_START":
            return {
                ...state,
                wsRequest: true
            }
        case "WS_FEED_CONNECTION_SUCCESS":
            return {
                ...state,
                wsRequest: false,
                wsConnect: true,
                error: undefined
            }
        case "WS_FEED_CONNECTION_ERROR":
            return {
                ...state,
                wsRequest: false,
                wsConnect: false,
                error: action.payload
            }
        case "WS_FEED_CONNECTION_CLOSED":
            return {
                ...state,
                wsConnect: false,
                error: action.payload
            }
        case "WS_FEED_GET_MESSAGE":
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}