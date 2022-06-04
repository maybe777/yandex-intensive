import React from "react";


const ORDER_URL: string = "https://norma.nomoreparties.space/api/orders"
const INGREDIENTS_URL: string = "https://norma.nomoreparties.space/api/ingredients"
const TEMP_ORDER_MOCK_ID: string = "60d3b41abdacab0026a733c6"

export const dataRequest = async () => {

    let result: BurgerItem[] = [];

    await fetch(INGREDIENTS_URL)
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                result = data.data
            } else {
                throw new Error("Loading error.")
            }
        })
        .catch(e => {
            console.log(e)
        });

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
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                result = data.order.number
            } else {
                throw new Error("Loading error.")
            }
        })
        .catch(e => {
            console.log(e)
        })

    return result;
}