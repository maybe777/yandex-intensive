import {Middleware, MiddlewareAPI} from "redux";
import {TAppDispatch, TRootState} from "../types";


export const socketMiddleware = (wsActions: any): Middleware => {
    return ((store: MiddlewareAPI<TAppDispatch, TRootState>) => {

        let socket: WebSocket | null = null;
        let isConnected: boolean = false;
        let reconnectionTimer: number = 0;
        let url: string = '';

        return (next) => (action: WSAction) => {
            const {dispatch} = store;
            const {type, payload} = action;

            const {wsInit, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;

            if (type === wsInit) {
                url = action.payload
                socket = new WebSocket(url)
                isConnected = true
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event})
                };
                socket.onerror = event => {
                    dispatch({type: onError, payload: event})
                };
                socket.onmessage = event => {
                    const {data} = event;
                    dispatch({type: onMessage, payload: data})
                };
                socket.onclose = (event) => {
                    if (event.code !== 1000) {
                        dispatch({type: onClose, payload: event.code.toString()})
                    }
                    if (isConnected) {
                        reconnectionTimer = window.setTimeout(() => {
                            dispatch({type: wsInit, payload: url})
                        }, 3000)
                    }
                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(payload))
                }

                if (type === onClose) {
                    socket.close(1000)
                    isConnected = false
                    clearTimeout(reconnectionTimer)
                    reconnectionTimer = 0
                    console.log('WS Connection closed from middleware.')
                }

            }
            next(action)
        };
    }) as Middleware;
}

export {}

