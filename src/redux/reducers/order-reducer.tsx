import React from "react";
import {GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS} from "../actions/order-actions";


const initialState = {
    orderRequest: false,
    orderFailed: false,
    number: 0
};

const orderReducer = (state: IOrderState = initialState, action: any) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            };
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                number: action.payload
            };
        case GET_ORDER_ERROR:
            console.log(action.error)
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            }
        default:
            return state;
    }
}

export default orderReducer;