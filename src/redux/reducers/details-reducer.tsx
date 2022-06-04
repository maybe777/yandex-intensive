import React from "react";

const initialState = {
    item: null
}

const detailsReducer = (state: IDetailsState = initialState, action: any) => {
    switch (action.type) {
        case "SHOW_DETAILS":
            return {
                item: action.item
            };
        case "CLOSE_DETAILS": {
            return {
                item: null
            }
        }
        default :
            return state;
    }
}

export default detailsReducer;