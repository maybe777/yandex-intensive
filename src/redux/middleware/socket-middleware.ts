import {Middleware, MiddlewareAPI} from "redux";
import {TAppDispatch, TRootState} from "../types";


export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: any) => {
            const {dispatch, getState} = store;
            const {type, payload} = action;

            if (type === 'WS_CONNECTION_START') {
                // объект класса WebSocket
                socket = new WebSocket(wsUrl);
            }
            if (socket) {

                socket.onopen = event => {
                    dispatch({type: 'WS_CONNECTION_SUCCESS', payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: 'WS_CONNECTION_ERROR', payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    dispatch({type: 'WS_GET_MESSAGE', payload: data});
                };

                socket.onclose = event => {
                    dispatch({type: 'WS_CONNECTION_CLOSED', payload: event});
                };

                if (type === 'WS_SEND_MESSAGE') {
                    socket.send(JSON.stringify(payload));
                }
            }
            next(action);
        };
    }) as Middleware;
};

export {}

