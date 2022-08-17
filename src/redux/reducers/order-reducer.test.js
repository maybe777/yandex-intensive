import orderReducer from "./order-reducer";

const initState = {
    orderRequest: false,
    orderFailed: false,
    number: 0
}

describe('Тестирование редьюсера формирования заказа.', () => {

    it('Тестирование начального сосотояния редьюсера.', () => {
        expect(orderReducer(undefined, {})).toEqual(initState)
    })


    it('Запрос на получение номера заказа.', () => {
        expect(orderReducer(undefined, {type: "GET_ORDER_REQUEST"}))
            .toEqual({...initState, orderRequest: true})
    });


    it('Получение номера заказа.', () => {
        expect(orderReducer(undefined, {type: "GET_ORDER_SUCCESS", payload: 123}))
            .toEqual({...initState, number: 123})
    });


    it('Ошибка получения номера заказа.', () => {
        expect(orderReducer(undefined, {type: "GET_ORDER_ERROR"}))
            .toEqual({...initState, orderFailed: true})
    });


})