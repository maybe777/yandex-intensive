import orderReducer from "../../../redux/reducers/order-reducer";

describe('Тестирование редьюсера формирования заказа.', () => {

    it('Тестирование начального сосотояния редьюсера.', () => {
        expect(orderReducer(undefined, {})).toEqual({
            orderRequest: false,
            orderFailed: false,
            number: 0
        })
    })


    it('Запрос на получение номера заказа.', () => {
        expect(orderReducer(undefined, {type: "GET_ORDER_REQUEST"}))
            .toEqual({
                orderRequest: true,
                orderFailed: false,
                number: 0
            })
    });


    it('Получение номера заказа.', () => {
        expect(orderReducer(undefined, {type: "GET_ORDER_SUCCESS", payload: 123}))
            .toEqual({
                orderRequest: false,
                orderFailed: false,
                number: 123
            })
    });


    it('Ошибка получения номера заказа.', () => {
        expect(orderReducer(undefined, {type: "GET_ORDER_ERROR"}))
            .toEqual({
                orderRequest: false,
                orderFailed: true,
                number: 0
            })
    });


})