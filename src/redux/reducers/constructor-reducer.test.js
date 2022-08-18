import constructorReducer from "./constructor-reducer";

const initState = {
    items: [
        {
            "_id": "60666c42cc7b410027a1a9b1",
            "name": "Выберите булочку пожалуйста :-)",
            "type": "bun",
            "proteins": 0,
            "fat": 0,
            "carbohydrates": 0,
            "calories": 0,
            "price": 0,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": '0'
        },
    ]
}

const item = {
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
}

const sortInitialState = {
    items: [
        {
            "_id": "60666c42cc7b410027a1a9b1",
            "name": "Выберите булочку пожалуйста :-)",
            "type": "bun",
            "proteins": 0,
            "fat": 0,
            "carbohydrates": 0,
            "calories": 0,
            "price": 0,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": '0'
        },
        {
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
};

describe('Тестирование редьюсера constructor-reducer.', () => {

    it('Проверка начального состояния редьюсера constructor-reducer.', () => {
        expect(constructorReducer(undefined, {})).toEqual(initState)
    });

    it('Добавление ингредиента.', () => {
        expect(
            constructorReducer(undefined, {type: "ADD_ITEM", item: item}))
            .toEqual({
                items: [
                    {
                        "_id": "60666c42cc7b410027a1a9b1",
                        "name": "Выберите булочку пожалуйста :-)",
                        "type": "bun",
                        "proteins": 0,
                        "fat": 0,
                        "carbohydrates": 0,
                        "calories": 0,
                        "price": 0,
                        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                        "__v": '0'
                    },
                    {
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
            })
    });

    it('Сортировка ингредиентов.', () => {
        expect(
            constructorReducer(sortInitialState, {
                type: "SORT_ITEM", from: 1, to: 0
            })).toEqual({
            items: [
                {
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
                },
                {
                    "_id": "60666c42cc7b410027a1a9b1",
                    "name": "Выберите булочку пожалуйста :-)",
                    "type": "bun",
                    "proteins": 0,
                    "fat": 0,
                    "carbohydrates": 0,
                    "calories": 0,
                    "price": 0,
                    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    "__v": '0'
                },],
        })
    });

    it('Удаление ингредиента.', () => {
        expect(
            constructorReducer(undefined, {
                type: "REMOVE_ITEM", index: 1,
            })).toEqual(initState)
    });

    it('Очистка списка ингредиентов.', () => {
        expect(
            constructorReducer(sortInitialState, {
                type: "CLEAR_ITEMS"
            })).toEqual(initState)
    });

});