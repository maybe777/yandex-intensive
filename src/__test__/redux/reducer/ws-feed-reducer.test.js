import {wsReducer} from "../../../redux/reducers/ws-feed-reducer";


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
        expect(wsReducer(undefined, {}))
            .toEqual({
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
            })
    });

    it('Инициация соединения веб-сокета.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_START"}))
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
                item: null
            })
    });

    it('Успешное подключение к веб-сокету.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_SUCCESS"}))
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
                item: null
            })
    });

    it('Ошибка подключения к веб-сокету.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_ERROR", payload: "Error"}))
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
                item: null
            })
    });

    it('Закрытие соединения.', () => {
        expect(wsReducer(undefined, {type: "WS_FEED_CONNECTION_CLOSED", payload: "Error"}))
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
                item: null
            })
    });

    it('Получение сообщения из веб-сокет соединения.', () => {
        expect(wsReducer(getMessageInitState, {
            type: "WS_FEED_GET_MESSAGE", payload: {
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
                item: null
            })
    });


})