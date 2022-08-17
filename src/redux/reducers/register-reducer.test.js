import {registrationReducer} from "./register-reducer";


const initState = {
    form: {
        name: '',
        email: '',
        password: ''
    },
    registrationRequest: false,
    registrationError: false,
}

describe('Тестирование редьюсера регистрации пользователя', () => {

    it('Тестирование начального сосотояния редьюсера.', () => {
        expect(registrationReducer(undefined, {})).toEqual(initState)
    })


    it('Отправка запроса на ренистрацию.', () => {
        expect(registrationReducer(undefined, {type: "REGISTER_REQUEST"}))
            .toEqual({...initState, registrationRequest: true});
    })

    it('Успешная регистрация.', () => {
        expect(registrationReducer(undefined, {type: "REGISTER_SUCCESS"}))
            .toEqual(initState)
    });

    it('Ошибка регистрации.', () => {
        expect(registrationReducer(undefined, {type: "REGISTER_ERROR"}))
            .toEqual({...initState, registrationError: true})
    });

})