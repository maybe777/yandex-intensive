import React from "react";
import {Redirect, Route} from "react-router-dom";
import {getLocalStorageItem} from "../../service/token-service";


// @ts-ignore
export function ProtectedRoute({children, ...rest}) {

    //@ts-ignore
    const user = getLocalStorageItem('user')

    return (
        <Route
            {...rest}
            render={({location}) =>
                user ? (children) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />)
            }/>);
}