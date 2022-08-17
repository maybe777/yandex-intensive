import {wsReducer} from "./ws-feed-reducer";

const initState = {
    wsConnect: false,
    wsRequest: false,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    error: undefined,
    item: null
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
    error: undefined,
    item: null
}

describe('Тестирование вебсокет-редьюсера ленты заказов.', () => {

    it('Тестирование начального состояния редьюсера.', () => {
        expect(wsReducer(undefined, {})).toEqual(initState)
    });

    it('Инициация соединения веб-сокета.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_START"}))
            .toEqual({...initState, wsRequest: true})
    });

    it('Успешное подключение к веб-сокету.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_SUCCESS"}))
            .toEqual({...initState, wsConnect: true})
    });

    it('Ошибка подключения к веб-сокету.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_ERROR", payload: "Error"}))
            .toEqual({...initState, error: "Error"})
    });

    it('Закрытие соединения.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_CLOSED", payload: "Error"}))
            .toEqual({...initState, error: "Error"})
    });

    it('Получение сообщения из веб-сокет соединения.', () => {
        expect(wsReducer(getMessageInitState, {
            type: "WS_FEED_GET_MESSAGE", payload: data
        }))
            .toEqual({...initState, data: data, wsConnect: true})
    });


})