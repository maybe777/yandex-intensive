import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import * as actions from '../../../redux/actions/auth-actions'

describe('Тестирование редьюсера auth-reducer.', () => {

//для тестирования с применением thunk необзодимо его замаокать
    beforeEach(() => {
        jest.spyOn(global, 'fetch')
            .mockResolvedValue(
                {
                    json: jest.fn().mockResolvedValue(({success: true})),
                    ok: true,
                })
    });

    afterEach(() => {
        jest.restoreAllMocks()
    });

    it('Ошибка аутентификации.', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({data: null})

        const expectedActions = [
            {type: actions.LOGIN_REQUEST},
            {type: actions.LOGIN_ERROR},

        ]

        return store.dispatch(actions.userLogin({email: "test@email.ru", password: "123"}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Получение профиля пользователя.', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({data: null})

        const expectedActions = [
            {type: actions.GET_USER_REQUEST},
            {type: actions.GET_USER_SUCCESS},

        ]

        return store.dispatch(actions.getUser())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })

    it('Процедура логаута.', () => {
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({data: null})

        const expectedActions = [
            {type: actions.LOGOUT_REQUEST},
            {type: actions.LOGOUT_SUCCESS},

        ]

        return store.dispatch(actions.userLogout())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
    })
})