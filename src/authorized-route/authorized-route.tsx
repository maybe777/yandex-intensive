import React from "react";
import {getLocalStorageItem} from "../service/token-service";
import {Redirect, Route} from "react-router-dom";

// @ts-ignore
export function AuthRoute({children, ...rest}) {

    //@ts-ignore
    const user = getLocalStorageItem('user')

    return (
        <Route
            {...rest}
            render={({location}) =>
                !user ? (children) : (
                    <Redirect
                        to='/'
                    />)
            }/>);

}