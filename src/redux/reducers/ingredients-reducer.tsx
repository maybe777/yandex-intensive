import React from "react";
import {GET_DATA_REQUEST, GET_DATA_ERROR, GET_DATA_SUCCESS} from "../actions/ingredients-actions";


const initialState = {
    dataRequest: false,
    dataFailed: false,
    data: []
};

const ingredientsReducer = (state: IIngredientState = initialState, action: any) => {
    switch (action.type) {
        case GET_DATA_REQUEST:
            return {
                ...state,
                dataFailed: false,
                dataRequest: true
            };
        case GET_DATA_SUCCESS:
            return {
                ...state,
                dataFailed: false,
                dataRequest: false,
                data: action.payload
            }
        case GET_DATA_ERROR:
            console.log(action.error)
            return {
                ...state,
                dataFailed: true,
                dataRequest: false
            }
        default:
            return state;
    }
}

export default ingredientsReducer;