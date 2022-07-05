import React, {useState} from 'react'
import styles from "./password-reset.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {passwordReset} from "../../api/api";
import {getLocalStorageItem} from "../../service/token-service";

export function PasswordResetPage() {

    const send = getLocalStorageItem('isSend')

    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    //@ts-ignore
    const handlePassword = e => {
        setPassword(e.target.value)
    }

    //@ts-ignore
    const handleToken = e => {
        setToken(e.target.value)
    }

    const history = useHistory()

    const handleSubmit = () => {
        passwordReset(password, token).then(res => {
            if (res) {
                history.push("/login")
                localStorage.removeItem('isSend')
                console.log('Пароль успешно сброшен')
            } else {
                throw Error("Запрос на сброс пароля не увенчался успехом")
            }
        })
    }

    if (!send) {
        return (<Redirect to={'/forgot-password'}/>)
    }

    return (
        <div>
            <ul className={styles.resetForm}>
                <li>
                    <h2>Восстановление пароля</h2>
                </li>
                <form className={styles.resetForm} onSubmit={handleSubmit}>
                    <li>
                        <Input value={password} placeholder="Введите новый пароль" onChange={handlePassword}/>
                    </li>
                    <li>
                        <Input value={token} placeholder="Введите код из письма" onChange={handleToken}/>
                    </li>
                    <li>
                        <Button type="primary" size="large">Сохранить</Button>
                    </li>
                </form>
                <li>
                    <p className="mt-9">Вспомнили пароль?&nbsp; <Link to={'/login'}>Войти</Link></p>
                </li>
            </ul>

        </div>
    );

}