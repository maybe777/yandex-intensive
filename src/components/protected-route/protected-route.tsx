import React from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";


// @ts-ignore
export function ProtectedRoute({isAuthOnly = false, children, ...rest}) {

    //@ts-ignore
    const user = useSelector(store => store.auth.user)
    const location = useLocation()

    if (!isAuthOnly && user) {
        //@ts-ignore
        const {from} = location.state || {from: {pathname: '/'}}

        return (
            <Route {...rest}>
                <Redirect to={from}/>
            </Route>
        )
    }

    if (isAuthOnly && !user) {
        return (
            <Route {...rest}>
                <Redirect to={{pathname: '/login', state: {from: location}}}/>
            </Route>
        )
    }

    return (
        <Route {...rest}>
            {children}
        </Route>);
}