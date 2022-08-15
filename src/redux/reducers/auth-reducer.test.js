import {authReducer} from './auth-reducer'
import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import * as actions from '../actions/auth-actions'

describe('Тестирование редьюсера auth-reducer.', () => {

//для тестирования с применением thunk необзодимо его замаокать
    beforeEach(() => {
        jest.spyOn(global, 'fetch')
            .mockResolvedValue(
                {
                    json: jest.fn().mockResolvedValue(({result: 'OK'})),
                    ok: true,
                })
    });

    afterEach(() => {
        jest.restoreAllMocks()
    });

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

    it('Проверка ошибки аутентификации.', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({data: null})

        const expectedActions = [
            {type: actions.LOGIN_REQUEST},
            {type: actions.LOGIN_ERROR},

        ]

        return store.dispatch(actions.userLogin("maybe.gm@gmail.com", "123"))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Ошибка получения профиля пользователя.', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({data: null})

        const expectedActions = [
            {type: actions.GET_USER_REQUEST},
            {type: actions.GET_USER_ERROR},

        ]

        return store.dispatch(actions.getUser())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Ошибка логаута.', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({data: null})

        const expectedActions = [
            {type: actions.LOGOUT_REQUEST},
            {type: actions.LOGOUT_ERROR},

        ]

        return store.dispatch(actions.userLogout())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})