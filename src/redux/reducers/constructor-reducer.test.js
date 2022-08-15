import {authReducer} from './auth-reducer'

describe('Тестирование редьюсера constructor-reducer.', () => {

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

    it('Проверка начального состояния редьюсера constructor-reducer.', () => {
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
})