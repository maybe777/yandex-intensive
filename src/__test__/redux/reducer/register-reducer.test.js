import {registrationReducer} from "../../../redux/reducers/register-reducer";

describe('Тестирование редьюсера регистрации пользователя', () => {

    it('Тестирование начального сосотояния редьюсера.', () => {
        expect(registrationReducer(undefined, {})).toEqual({
            form: {
                name: '',
                email: '',
                password: ''
            },
            registrationRequest: false,
            registrationError: false,
        })
    })


    it('Отправка запроса на ренистрацию.', () => {
        expect(registrationReducer(undefined, {type: "REGISTER_REQUEST"}))
            .toEqual({
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                registrationRequest: true,
                registrationError: false,
            })
    });

    it('Успешная регистрация.', () => {
        expect(registrationReducer(undefined, {type: "REGISTER_SUCCESS"}))
            .toEqual({
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                registrationRequest: false,
                registrationError: false,
            })
    });

    it('Ошибка регистрации.', () => {
        expect(registrationReducer(undefined, {type: "REGISTER_ERROR"}))
            .toEqual({
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
                registrationRequest: false,
                registrationError: true,
            })
    });

})