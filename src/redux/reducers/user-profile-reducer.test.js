import {userProfileReducer} from "./user-profile-reducer";


const initState = {
    form: {
        name: "",
        email: ""
    },
    editProfileRequest: false,
    editProfileError: false,
    profileRequest: false,
    profileError: false,
    error: ""
}

const user = {
    name: "Тестовое имя",
    email: "тест@тест.ру"
}

describe('Тестирование редьюсера профиля пользователя.', () => {

    it('Тестирование начального сосотояния редьюсера.', () => {
        expect(userProfileReducer(undefined, {}))
            .toEqual(initState)
    })

    it('Запрос на получение профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {type: 'USER_PROFILE_REQUEST'}))
            .toEqual({...initState, profileRequest: true})
    });

    it('Получение профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {type: 'USER_PROFILE_SUCCESS', user: user}))
            .toEqual({...initState, form: user})
    });

    it('Ошибка получения профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {type: 'USER_PROFILE_ERROR'}))
            .toEqual({...initState, profileError: true, error: undefined})
    });

    it('Отправка запроса на редактирование профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: "USER_PROFILE_EDIT_REQUEST"
        })).toEqual({...initState, editProfileRequest: true})
    });

    it('Успешное редактирование профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: "USER_PROFILE_EDIT_SUCCESS", user: user
        }))
            .toEqual({...initState, form: user})
    });

    it('Ошибка редактирования профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: "USER_PROFILE_EDIT_ERROR",
            error: "Error"
        })).toEqual({...initState, error: "Error", editProfileError: true})
    });

})