import React from "react";
import {fetchOrder} from "../../api/api";


export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS"
export const GET_ORDER_ERROR = "GET_ORDER_ERROR"

function orderError() {
    return {
        type: GET_ORDER_ERROR
    }
}

export function getOrder() {
    return function (dispatch: any) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        fetchOrder()
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        payload: res
                    });
                } else {
                    dispatch(orderError());
                }
            })
            .then(() => console.log("Get Order number success."))
            .catch(err => {
                dispatch(orderError());
            });
    }

}

