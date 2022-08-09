import {TWSOrderActions} from "../types/ws-order-action-types";

const initialState = {
    wsConnect: false,
    wsRequest: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    error: undefined
}

export const wsOrderReducer = (state = initialState, action: TWSOrderActions) => {

    switch (action.type) {
        case "WS_ORDER_CONNECTION_START": {
            return {
                ...state,
                wsRequest: true,
            }
        }
        case "WS_ORDER_CONNECTION_SUCCESS": {
            return {
                ...state,
                wsRequest: false,
                wsConnect: true,
                error: undefined
            }
        }
        case "WS_ORDER_CONNECTION_ERROR":
            return {
                ...state,
                wsRequest: false,
                wsConnect: false,
                error: action.payload
            }
        case "WS_ORDER_CONNECTION_CLOSED": {
            return {
                ...state,
                wsConnect: false,
                error: action.payload
            }
        }
        case "WS_ORDER_GET_MESSAGE":
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }

}