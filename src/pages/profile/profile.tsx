import React from 'react'
import styles from './profile.module.css'
import {ProfileEdit} from "../../components/profile-edit/profile-edit";
import {ProfileMenu} from "../../components/profile-menu/profile-menu";
import {Switch, useRouteMatch} from "react-router-dom";
import {ProtectedRoute} from "../../components/protected-route/protected-route";
import {OrderHistory} from "../../components/order-history/order-history";


export function ProfilePage() {

    const {url} = useRouteMatch();

    return (
        <div className={styles.profile}>
            <ProfileMenu/>
            <div className={styles.orderList}>
                <Switch>
                    <ProtectedRoute isAuthOnly={true} path={url} exact={true}>
                        <ProfileEdit/>
                    </ProtectedRoute>
                    <ProtectedRoute isAuthOnly={true} path={`${url}/orders`} exact={true}>
                        <OrderHistory/>
                    </ProtectedRoute>
                </Switch>
            </div>
        </div>
    );

}