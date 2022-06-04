import React from "react";


export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SORT_ITEM = "SORT_ITEM";

export function addItem(item: BurgerItem) {
    return function (dispatch: any){
        dispatch({
            type: ADD_ITEM,
            item: item
        });
    }
}

export function removeItem(removeIndex: number) {
    return function (dispatch: any){
        dispatch({
            type: REMOVE_ITEM,
            index: removeIndex
        });
    }
}

export function sortItem(fromIndex: number, toIndex:number) {
    return function (dispatch: any){
        dispatch({
            type: SORT_ITEM,
            from: fromIndex,
            to: toIndex
        });
    }
}