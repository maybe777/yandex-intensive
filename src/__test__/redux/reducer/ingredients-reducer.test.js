import ingredientsReducer from "../../../redux/reducers/ingredients-reducer";


describe('Тестирование редьюсера ингредиентов.', () => {

    it('Тестирование начального сосотояния редьюсера ингредиентов.', () => {
        expect(ingredientsReducer(undefined, {})).toEqual({
            dataRequest: false,
            dataFailed: false,
            data: []
        })
    })

    it('Запроса на получение данных об ингредиентах.', () => {
        expect(ingredientsReducer(undefined, {type: 'GET_DATA_REQUEST'})).toEqual({
            dataRequest: true,
            dataFailed: false,
            data: []
        })
    })

    it('Получение данных об ингредиентах.', () => {
        expect(ingredientsReducer(undefined, {
            type: 'GET_DATA_SUCCESS', payload: [{
                "_id": "60666c42cc7b410027a1a9b2",
                "name": "Тестовый ингредиент",
                "type": "sauce",
                "proteins": 123,
                "fat": 123,
                "carbohydrates": 123,
                "calories": 123,
                "price": 123,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": '0'
            },]
        })).toEqual({
            dataRequest: false,
            dataFailed: false,
            data: [{
                "_id": "60666c42cc7b410027a1a9b2",
                "name": "Тестовый ингредиент",
                "type": "sauce",
                "proteins": 123,
                "fat": 123,
                "carbohydrates": 123,
                "calories": 123,
                "price": 123,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": '0'
            }]
        })
    })

    it('Ошибка получения данных об ингредиентах.', () => {
        expect(ingredientsReducer(undefined, {type: 'GET_DATA_ERROR'})).toEqual({
            dataRequest: false,
            dataFailed: true,
            data: []
        })
    })


})