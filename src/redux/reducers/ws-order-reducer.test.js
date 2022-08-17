import {wsOrderReducer} from "./ws-order-reducer";


const initState = {
    wsConnect: false,
    wsRequest: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    error: undefined
}

const data = {
    success: true,
    orders: ['1', '2', '3'],
    total: 3,
    totalToday: 3
}

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
            .toEqual(initState)
    });

    it('Инициация соединения веб-сокета.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_START"}))
            .toEqual({...initState, wsRequest: true})
    });

    it('Успешное подключение к веб-сокету.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_SUCCESS"}))
            .toEqual({...initState, wsConnect: true})
    });

    it('Ошибка подключения к веб-сокету.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_ERROR", payload: "Error"}))
            .toEqual({...initState, error: "Error"})
    });

    it('Закрытие соединения.', () => {
        expect(wsOrderReducer(undefined, {type: "WS_ORDER_CONNECTION_CLOSED", payload: "Error"}))
            .toEqual({...initState, error: "Error"})
    });

    it('Получение сообщения из веб-сокет соединения.', () => {
        expect(wsOrderReducer(getMessageInitState, {
            type: "WS_ORDER_GET_MESSAGE", payload: data
        }))
            .toEqual({...initState, data: data, wsConnect: true})
    });


})