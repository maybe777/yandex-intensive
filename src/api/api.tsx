import React from "react";
import {getCookieItem, getLocalStorageItem} from "../service/token-service";


const rToken = getLocalStorageItem("refreshToken")

const BASE_URL = "https://norma.nomoreparties.space/api/"
const ORDER_URL: string = BASE_URL + "orders"
const INGREDIENTS_URL: string = BASE_URL + "ingredients"
const REGISTER_URL: string = BASE_URL + "auth/register"
const LOGIN_URL: string = BASE_URL + "auth/login"
const LOGOUT_URL: string = BASE_URL + "auth/logout"
const REFRESH_URL: string = BASE_URL + "auth/token"
const PASSWORD_FORGOT: string = BASE_URL + "password-reset"
const PASSWORD_RESET: string = BASE_URL + "password-reset/reset"
const PROFILE: string = BASE_URL + "auth/user"
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
                throw new Error("Ошибка загрузки данных.")
            }
        })
    return result;
}

export async function register(form: RegisterForm) {
    await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password,
            name: form.name
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                console.log("Регистрация прошла успешно.")
            } else {
                throw new Error("Регистрация не удалась. Возникла ошибка.")
            }
        })
}

export async function login(email: String, password: String) {

    let result: UserCredentials = {user: {email: "", name: ""}, accessToken: "", refreshToken: ""}

    await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data
                // @ts-ignore
                setCookie('accessToken', data.accessToken.split(' ')[1])
                localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
                localStorage.setItem('user', JSON.stringify(data.user))
            } else {
                throw new Error("Аутентификация не удалась. Возникла ошибка.")
            }
        })

    return result;
}

export async function logout() {
    await fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: rToken
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                //@ts-ignore
                setCookie('accessToken', '')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
            } else {
                throw new Error("Обновление информации о токене не удалась. Возникла ошибка.")
            }
        })
}

export async function refreshToken(token: String) {
    await fetch(REFRESH_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                // @ts-ignore
                setCookie('accessToken', data.accessToken.split(' ')[1])
                localStorage.setItem('refreshToken', JSON.stringify(data.refreshToken))
            } else {
                throw new Error("Обновление информации о токене не удалась. Возникла ошибка.")
            }
        })
}

export async function passwordForgot(email: String) {

    let result: Boolean = false

    await fetch(PASSWORD_FORGOT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data.success
            } else {
                throw new Error("Запрос на сброс пароля не удался. Возникла ошибка.")
            }
        })

    return result
}

export async function passwordReset(password: String, token: String) {

    let result: Boolean = false

    await fetch(PASSWORD_RESET, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            token: token,
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data.success
            } else {
                throw new Error("Сброс пароля не удался. Возникла ошибка.")
            }
        })

    return result
}

export async function fetchProfileData() {
    let result: User = {name: "", email: ""}

    let token = getCookieItem('accessToken')

    await fetch(PROFILE, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data.user
                console.log("Пользователь успешно получен.")
            } else {
                throw new Error("Ошибка получения данных профиля пользователя.")
            }
        })
    return result
}

export async function saveProfileData(form: User) {

    let token = getCookieItem('accessToken')

    let result: User = {name: "", email: ""}
    await fetch(PROFILE, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            email: form.email,
            name: form.name
        })
    })
        .then(checkResponse)
        .then(data => {
            if (data.success === true) {
                result = data.user
                console.log("Пользователь успешно отредактирован.")
            } else {
                throw new Error("Ошибка получения данных профиля пользователя.")
            }
        })
    return result
}

export function checkResponse(res: Response) {
    if (res.ok) {
        return res.json()
    }
    throw new Error('Network response was not status 200.');
}

export function setCookie(name: String, value: any, props: any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: String) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

