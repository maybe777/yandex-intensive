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
                    dispatch(getDataError(""));
                }
            })
            .then(() => console.log("Успешная загрузка данных об ингредиентах."))
            .catch(err => {
                dispatch(getDataError(err));
            });
    }
}


function getDataError(error: String) {
    return {type: GET_DATA_ERROR, error}
}
