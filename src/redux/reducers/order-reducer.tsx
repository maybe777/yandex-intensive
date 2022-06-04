import React from "react";


const initialState = {
    orderRequest: false,
    orderFailed: false,
    number: 0
};

const orderReducer = (state: IOrderState = initialState, action: any) => {
    switch (action.type) {
        case "GET_ORDER_NUMBER":
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            };
        case "GET_ORDER_SUCCESS":
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                number: action.payload
            };
        case "GET_ORDER_FAILED":
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