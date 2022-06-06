import React from "react";

import { composeWithDevTools } from 'redux-devtools-extension';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/root-reducer";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;