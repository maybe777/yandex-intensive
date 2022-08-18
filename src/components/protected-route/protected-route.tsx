import React, {FC} from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {getLocalStorageItem} from "../../service/token-service";


export const ProtectedRoute: FC<TProtectedRoute> = ({isAuthOnly = false, children, ...rest}) => {

    // const {user} = useSelector(store => store.auth)
    const user = getLocalStorageItem('user')
    const location = useLocation()

    if (!isAuthOnly && user) {
        console.log(user)
        const {from}: any = location.state || {from: {pathname: '/'}}

        return (
            <Route {...rest}>
                <Redirect to={from}/>
            </Route>
        )
    }

    if (isAuthOnly && !user) {
        console.log(user)
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