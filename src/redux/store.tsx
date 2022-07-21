import React from "react";

import { composeWithDevTools } from 'redux-devtools-extension';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root-reducer";
import {socketMiddleware} from "./middleware/socket-middleware";

const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(socketMiddleware('wss://norma.nomoreparties.space/orders/all'), thunk)));

export default store;