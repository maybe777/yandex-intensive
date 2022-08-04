import React from "react";
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root-reducer";
import {socketMiddleware} from "./middleware/socket-middleware";
import {
    WS_FEED_CONNECTION_CLOSED, WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS, WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE
} from "./actions/ws-feed-actions";
import {
    WS_ORDER_CONNECTION_CLOSED,
    WS_ORDER_CONNECTION_ERROR,
    WS_ORDER_CONNECTION_START,
    WS_ORDER_CONNECTION_SUCCESS, WS_ORDER_GET_MESSAGE, WS_ORDER_SEND_MESSAGE
} from "./actions/ws-order-actions";

const wsOrderActions = {
    wsInit: WS_ORDER_CONNECTION_START,
    onOpen: WS_ORDER_CONNECTION_SUCCESS,
    onError: WS_ORDER_CONNECTION_ERROR,
    onClose: WS_ORDER_CONNECTION_CLOSED,
    onMessage: WS_ORDER_GET_MESSAGE,
    wsSendMessage: WS_ORDER_SEND_MESSAGE
};

const wsFeedActions = {
    wsInit: WS_FEED_CONNECTION_START,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onError: WS_FEED_CONNECTION_ERROR,
    onClose: WS_FEED_CONNECTION_CLOSED,
    onMessage: WS_FEED_GET_MESSAGE,
    wsSendMessage: WS_FEED_SEND_MESSAGE
};

const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(
            socketMiddleware(wsFeedActions),
            socketMiddleware(wsOrderActions),
            thunk)
    ));

export default store;