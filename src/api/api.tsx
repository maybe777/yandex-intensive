import React from "react";


//yet unused need to handle with it
export async function makeRequest(url: string) {
    await fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                return data.data
            } else {
                throw new Error("Loading error.")
            }
        })
        .catch(e => {
            console.log(e)
        });
}

export async function fetchOrder(url: string, requestBody: any) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients: requestBody})
    })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                console.log(data)
                console.log(data.order)
                console.log(data.order.number)
                return data.order.number
            } else {
                throw new Error("Loading error.")
            }
        })
        .catch(e => {
            console.log(e)
        })
}