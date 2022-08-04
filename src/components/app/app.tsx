import React, {FC, useEffect} from 'react'
import MainPage from "../../pages/main/main"
import {Switch, Route, useLocation, useHistory} from 'react-router-dom'
import {LoginPage} from "../../pages/login/login";
import {RegisterPage} from "../../pages/register/register";
import {Error404Page} from "../../pages/error404/Error404";
import {ProfilePage} from "../../pages/profile/profile";
import {PasswordResetPage} from "../../pages/password-reset/password-reset";
import {PasswordForgotPage} from "../../pages/password-forgot/password-forgot";
import IngredientDetails from "../details-ingredient/ingredient-details";
import styles from "./app.module.css";
import AppHeader from "../header/app-header";
import {ProtectedRoute} from "../protected-route/protected-route";
import Modal from "../modal/modal";
import {useDispatch} from "../../service/hooks";
import {getUser} from "../../redux/actions/auth-actions";
import {getData} from "../../redux/actions/ingredients-actions";
import OrderDetails from "../details-order/order-details";
import {getLocalStorageItem} from "../../service/token-service";
import {Feed} from "../../pages/feed/feed";
import {FeedDetails} from "../feed-details/feed-details";
import {wsConnection, wsConnectionClosed} from "../../redux/actions/ws-feed-actions";
import {wsOrderConnection, wsOrderConnectionClosed} from "../../redux/actions/ws-order-actions";


const App: FC = () => {

    const WS_FEED_URL = 'wss://norma.nomoreparties.space/orders/all'
    const WS_ORDER_URL = 'wss://norma.nomoreparties.space/orders'

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch();

    const loggedIn: boolean = !!getLocalStorageItem('user')

    useEffect(() => {
        dispatch(getData())
        dispatch(wsConnection(WS_FEED_URL))
        dispatch(wsOrderConnection(WS_ORDER_URL))
        if (loggedIn) {
            dispatch(getUser())
        }
        return () => {
            dispatch(wsConnectionClosed())
            dispatch(wsOrderConnectionClosed())
        }
    }, [dispatch])

    //@ts-ignore
    const background = location.state && location.state.background

    return (
        <div className={styles.container}>
            <AppHeader/>
            <div className={styles.content}>
                <Switch location={background || location}>
                    <Route path={"/ingredients/:id"} exact={true}>
                        <IngredientDetails/>
                    </Route>
                    <Route path='/feed/:orderId' exact={true}>
                        <FeedDetails/>
                    </Route>
                    <ProtectedRoute isAuthOnly={true} path='/profile/orders/:orderId' exact={true}>
                        <FeedDetails/>
                    </ProtectedRoute>
                    <ProtectedRoute path={"/forgot-password"} exact={true}>
                        <PasswordForgotPage/>
                    </ProtectedRoute>
                    <ProtectedRoute path={"/reset-password"} exact={true}>
                        <PasswordResetPage/>
                    </ProtectedRoute>
                    <ProtectedRoute isAuthOnly={true} path={"/profile"} exact={false}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <ProtectedRoute path={"/register"} exact={true}>
                        <RegisterPage/>
                    </ProtectedRoute>
                    <ProtectedRoute path={"/login"} exact={true}>
                        <LoginPage/>
                    </ProtectedRoute>
                    <Route path={"/feed"} exact={true}>
                        <Feed/>
                    </Route>
                    <Route path={"/"} exact={true}>
                        <MainPage/>
                    </Route>
                    <Route>
                        <Error404Page/>
                    </Route>
                </Switch>
                {
                    background && (
                        <>
                            <Route path='/ingredients/:id' exact={true}>
                                <Modal
                                    onClose={() => {
                                        history.goBack()
                                    }} title={"Детали ингредиента"}>
                                    <IngredientDetails/>
                                </Modal>
                            </Route>
                            <Route path='/feed/:orderId' exact={true}>
                                <Modal
                                    onClose={() => {
                                        history.goBack()
                                        console.log("Onclose pressed!")
                                    }} title={""}>
                                    <FeedDetails/>
                                </Modal>
                            </Route>
                            <ProtectedRoute isAuthOnly={true} path='/profile/orders/:orderId' exact={true}>
                                <Modal
                                    onClose={() => {
                                        history.goBack()
                                        console.log("Onclose pressed!")
                                    }} title={""}>
                                    <FeedDetails/>
                                </Modal>
                            </ProtectedRoute>
                            <ProtectedRoute isAuthOnly={true} path='/order' exact={true}>
                                <Modal
                                    onClose={() => {
                                        history.goBack()
                                    }} title={""}>
                                    <OrderDetails/>
                                </Modal>
                            </ProtectedRoute>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default App;
