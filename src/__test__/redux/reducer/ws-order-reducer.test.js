import {wsOrderReducer} from "../../../redux/reducers/ws-order-reducer";


const getMessageInitState = {
    wsConnect: true,
    wsRequest: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    error: undefined
}

describe('Тестирование вебсокет-редьюсера истории заказов.', () => {

    it('Тестирование начального состояния редьюсера.', () => {
        expect(wsOrderReducer(undefined, {}))
            .toEqual({
                wsConnect: false,
                wsRequest: false,
                data: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0
                },
                error: undefined
            })
    });

    it('Инициация соединения веб-сокета.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_START"}))
            .toEqual({
                wsConnect: false,
                wsRequest: true,
                data: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0
                },
                error: undefined,
            })
    });

    it('Успешное подключение к веб-сокету.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_SUCCESS"}))
            .toEqual({
                wsConnect: true,
                wsRequest: false,
                data: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0
                },
                error: undefined,
            })
    });

    it('Ошибка подключения к веб-сокету.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_ERROR", payload: "Error"}))
            .toEqual({
                wsConnect: false,
                wsRequest: false,
                data: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0
                },
                error: "Error",
            })
    });

    it('Закрытие соединения.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_CLOSED", payload: "Error"}))
            .toEqual({
                wsConnect: false,
                wsRequest: false,
                data: {
                    success: false,
                    orders: [],
                    total: 0,
                    totalToday: 0
                },
                error: "Error",
            })
    });

    it('Получение сообщения из веб-сокет соединения.', () => {
        expect(wsOrderReducer(getMessageInitState, {
            type: "WS_ORDER_GET_MESSAGE", payload: {
                success: true,
                orders: ['1', '2', '3'],
                total: 3,
                totalToday: 3
            }
        }))
            .toEqual({
                wsConnect: true,
                wsRequest: false,
                data: {
                    success: true,
                    orders: ['1', '2', '3'],
                    total: 3,
                    totalToday: 3
                },
                error: undefined,
            })
    });


})