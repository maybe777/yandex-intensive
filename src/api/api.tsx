import React from "react";

const BASE_URL = "https://norma.nomoreparties.space/api/"
const ORDER_URL: string = BASE_URL + "orders"
const INGREDIENTS_URL: string = BASE_URL + "ingredients"
const TEMP_ORDER_MOCK_ID: string = "60d3b41abdacab0026a733c6"

export const dataRequest = async () => {

    let result: BurgerItem[] = [];

    await fetch(INGREDIENTS_URL)
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data.data
            } else {
                throw new Error("Loading error.")
            }
        })
    return result;
}

export async function fetchOrder() {

    let result: number = 0;

    await fetch(ORDER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients: TEMP_ORDER_MOCK_ID})
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data.order.number
            } else {
                throw new Error("Loading error.")
            }
        })
    return result;
}

export function checkResponse(res: any){
    if (res.ok) {
        return res.json()
    }
    throw new Error('Network response was not status 200.');
}