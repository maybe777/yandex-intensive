import React from "react"
import {getCookie} from "../api/api";


export const getLocalStorageItem = (key: string) => {
    //@ts-ignore
    return JSON.parse(localStorage.getItem(key))
}

export const getCookieItem = (key: string) => {
    //@ts-ignore
    return getCookie(key)
}