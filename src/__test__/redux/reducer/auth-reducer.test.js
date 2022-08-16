import {authReducer} from '../../../redux/reducers/auth-reducer'

describe('Тестирование редьюсера auth-reducer.', () => {

    it('Проверка начального состояния редьюсера auth-reducer.', () => {
        expect(authReducer(undefined, {})).toEqual({
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
        })
    });

    it('Запрос на получение данных пользователя.', () => {
        expect(
            authReducer(undefined, {type: "GET_USER_REQUEST"}))
            .toEqual({
                form: {
                    login: '',
                    password: ''
                },
                loggedIn: false,
                loggedOut: true,
                userRequest: true,
                loginRequest: false,
                logoutRequest: false,
                userError: false,
                loginError: false,
                logoutError: false,
                user: null
            })
    });

    it('Ошибка при получении данных пользователя.', () => {
        expect(
            authReducer(undefined, {type: "GET_USER_ERROR"}))
            .toEqual({
                form: {
                    login: '',
                    password: ''
                },
                loggedIn: false,
                loggedOut: true,
                userRequest: false,
                loginRequest: false,
                logoutRequest: false,
                userError: true,
                loginError: false,
                logoutError: false,
                user: null
            })
    });

    it('Успешное получение данных пользователя.', () => {
        expect(
            authReducer(undefined, {
                type: "GET_USER_SUCCESS", payload: {
                    email: 'maybe.gm@gmail.com',
                    name: 'Полывьянов Виталий'
                }
            }))
            .toEqual({
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
                user: undefined
            })
    });

    it('Запрос для аутентификации.', () => {
        expect(
            authReducer(undefined, {type: "LOGIN_REQUEST"}))
            .toEqual({
                form: {
                    login: '',
                    password: ''
                },
                loggedIn: false,
                loggedOut: true,
                userRequest: false,
                loginRequest: true,
                logoutRequest: false,
                userError: false,
                loginError: false,
                logoutError: false,
                user: null
            })
    });

    it('Успешная аутентификация.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGIN_SUCCESS", payload: {
                    email: 'maybe.gm@gmail.com',
                    name: 'Полывьянов Виталий'
                }
            }))
            .toEqual({
                form: {
                    login: '',
                    password: ''
                },
                loggedIn: true,
                loggedOut: false,
                userRequest: false,
                loginRequest: false,
                logoutRequest: false,
                userError: false,
                loginError: false,
                logoutError: false,
                user: undefined
            })
    });

    it('Ошибка аутентификации.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGIN_ERROR", payload: {
                    email: 'maybe.gm@gmail.com',
                    name: 'Полывьянов Виталий'
                }
            }))
            .toEqual({
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
                loginError: true,
                logoutError: false,
                user: null
            })
    });

    it('Запрос на выход из профиля.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGOUT_REQUEST"
            }))
            .toEqual({
                form: {
                    login: '',
                    password: ''
                },
                loggedIn: false,
                loggedOut: true,
                userRequest: false,
                loginRequest: false,
                logoutRequest: true,
                userError: false,
                loginError: false,
                logoutError: false,
                user: null
            })
    });

    it('Успешный выход из профиля.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGOUT_SUCCESS"
            }))
            .toEqual({
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
            })
    });

    it('Ошибка выхода из профиля.', () => {
        expect(
            authReducer(undefined, {
                type: "LOGOUT_ERROR"
            }))
            .toEqual({
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
                logoutError: true,
                user: null
            })
    });
})