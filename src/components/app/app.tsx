import React from 'react'
import MainPage from "../../pages/main/main"
import {Switch, Route, useLocation, useHistory, useParams} from 'react-router-dom'
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
import {AuthRoute} from "../../authorized-route/authorized-route";
import Modal from "../modal/modal";
import {useDispatch} from "react-redux";
import {showDetails} from "../../redux/actions/details-actions";


function App() {

    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()

    const params = useParams()

    //@ts-ignore
    const background = location.state && location.state.background

    return (
        <div className={styles.container}>
            <AppHeader/>
            <div className={styles.content}>
                <Switch location={background || location}>
                    <Route path={"/ingredients/:id"} exact={true}>
                        <MainPage />
                    </Route>
                    <AuthRoute path={"/forgot-password"} exact={true}>
                        <PasswordForgotPage/>
                    </AuthRoute>
                    <AuthRoute path={"/reset-password"} exact={true}>
                        <PasswordResetPage/>
                    </AuthRoute>
                    <ProtectedRoute path={"/profile"} exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <AuthRoute path={"/register"} exact={true}>
                        <RegisterPage/>
                    </AuthRoute>
                    <AuthRoute path={"/login"} exact={true}>
                        <LoginPage/>
                    </AuthRoute>
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
                        </>
                    )
                }
            </div>
        </div>
    )
        ;
}

export default App;
