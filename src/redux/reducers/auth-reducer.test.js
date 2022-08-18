import {authReducer} from "./auth-reducer";


const initState = {
    form: {
        login: '',
        password: ''
    },
    loggedIn: false,
    loggedOut: true,
    userRequest: false,
    loginRequest: false,
    logoutRequest: false,
    userError: false,
    loginError: false,
    logoutError: false,
    user: null
}


describe('Тестирование редьюсера auth-reducer.', () => {

    it('Проверка начального состояния редьюсера auth-reducer.', () => {
        expect(authReducer(undefined, {})).toEqual(initState)
    });

    it('Запрос на получение данных пользователя.', () => {
        expect(
            authReducer(undefined, {type: "GET_USER_REQUEST"}))
            .toEqual({...initState, userRequest: true})
    });

    it('Ошибка при получении данных пользователя.', () => {
        expect(
            authReducer(undefined, {type: "GET_USER_ERROR"}))
            .toEqual({...initState, userError: true})
    });

    it('Успешное получение данных пользователя.', () => {
        expect(
            authReducer(undefined, {
                type: "GET_USER_SUCCESS", payload: {
                    email: 'maybe.gm@gmail.com',
                    name: 'Полывьянов Виталий'
                }
            }))
            .toEqual({...initState, user: undefined})
    });

    it('Запрос для аутентификации.', () => {
        expect(
            authReducer(undefined, {type: "LOGIN_REQUEST"}))
            .toEqual({...initState, loginRequest: true})
    });

    it('Успешная аутентификация.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGIN_SUCCESS", payload: {
                    email: 'maybe.gm@gmail.com',
                    name: 'Полывьянов Виталий'
                }
            }))
            .toEqual({...initState, loggedIn: true, loggedOut: false, user: undefined})
    });

    it('Ошибка аутентификации.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGIN_ERROR", payload: {
                    email: 'maybe.gm@gmail.com',
                    name: 'Полывьянов Виталий'
                }
            }))
            .toEqual({...initState, loginError: true})
    });

    it('Запрос на выход из профиля.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGOUT_REQUEST"
            }))
            .toEqual({...initState, logoutRequest: true})
    });

    it('Успешный выход из профиля.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGOUT_SUCCESS"
            }))
            .toEqual({...initState, loggedIn: false, loggedOut: true})
    });

    it('Ошибка выхода из профиля.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGOUT_ERROR"
            }))
            .toEqual({...initState, logoutError: true})
    });
})