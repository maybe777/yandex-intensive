import {userProfileReducer} from "../../../redux/reducers/user-profile-reducer";


describe('Тестирование редьюсера профиля пользователя.', () => {

    it('Тестирование начального сосотояния редьюсера.', () => {
        expect(userProfileReducer(undefined, {})).toEqual({
            form: {
                name: "",
                email: ""
            },
            editProfileRequest: false,
            editProfileError: false,
            profileRequest: false,
            profileError: false,
            error: ""
        })
    })

    it('Запрос на получение профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {type: 'USER_PROFILE_REQUEST'}))
            .toEqual({
                form: {
                    name: "",
                    email: ""
                },
                editProfileRequest: false,
                editProfileError: false,
                profileRequest: true,
                profileError: false,
                error: ""
            })
    });

    it('Получение профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: 'USER_PROFILE_SUCCESS', user: {
                name: "Тестовое имя",
                email: "тест@тест.ру"
            }
        }))
            .toEqual({
                form: {
                    name: "Тестовое имя",
                    email: "тест@тест.ру"
                },
                editProfileRequest: false,
                editProfileError: false,
                profileRequest: false,
                profileError: false,
                error: ""
            })
    });

    it('Ошибка получения профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {type: 'USER_PROFILE_REQUEST'}))
            .toEqual({
                form: {
                    name: "",
                    email: ""
                },
                editProfileRequest: false,
                editProfileError: false,
                profileRequest: true,
                profileError: false,
                error: ""
            })
    });

    it('Отправка запроса на редактирование профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: "USER_PROFILE_EDIT_REQUEST"
        })).toEqual({
            form: {
                name: "",
                email: ""
            },
            editProfileRequest: true,
            editProfileError: false,
            profileRequest: false,
            profileError: false,
            error: ""
        })
    });

    it('Успешное редактирование профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: "USER_PROFILE_EDIT_SUCCESS", user: {
                name: "Тестовое имя",
                email: "тест@тест.ру"
            }
        })).toEqual({
            form: {
                name: "Тестовое имя",
                email: "тест@тест.ру"
            },
            editProfileRequest: false,
            editProfileError: false,
            profileRequest: false,
            profileError: false,
            error: ""
        })
    });

    it('Ошибка редактирования профиля пользователя.', () => {
        expect(userProfileReducer(undefined, {
            type: "USER_PROFILE_EDIT_ERROR",
            error: "Error"
        })).toEqual({
            form: {
                name: "",
                email: ""
            },
            editProfileRequest: false,
            editProfileError: true,
            profileRequest: false,
            profileError: false,
            error: "Error"
        })
    });

})