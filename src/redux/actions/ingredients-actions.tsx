import React from "react";
import {dataRequest} from "../../api/api";

export const GET_DATA_REQUEST = "GET_DATA_REQUEST"
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS"
export const GET_DATA_ERROR = "GET_DATA_ERROR"


export function getData() {
    return function (dispatch: any) {
        dispatch({
            type: GET_DATA_REQUEST
        });
        dataRequest()
            .then(res => {
                if (res) {
                    dispatch({
                        type: GET_DATA_SUCCESS,
                        payload: res
                    });
                } else {
                    dispatch({
                        type: GET_DATA_ERROR
                    });
                }
            })
            .then(() => console.log("Data loading success."))
            .catch(err => {
                dispatch({
                    type: GET_DATA_ERROR
                });
            });
    }
}
