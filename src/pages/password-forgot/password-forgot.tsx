import React, {useState} from 'react'
import styles from "./password-forgot.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {passwordForgot} from "../../api/api";


export function PasswordForgotPage() {

    const [email, setEmail] = useState("")

    //@ts-ignore
    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const history = useHistory()

    const handleSubmit = () => {
        passwordForgot(email).then(res => {
            if (res){
                history.push("/reset-password")
            }else {
                throw Error("Запрос на сброс пароля не увенчался успехом")
            }
        })
    }

    return (
        <div>
            <ul className={styles.forgotForm}>
                <li>
                    <h2>Восстановление пароля</h2>
                </li>
                <li>
                    <Input value={email} placeholder="Укажите e-mail" onChange={handleEmail}/>
                </li>
                <li>
                    <Button type="primary" size="large" onClick={handleSubmit}>Восстановить</Button>
                </li>
                <li>
                    <p className="mt-9">Вспомнили пароль?&nbsp; <Link to={'/login'}>Войти</Link></p>
                </li>
            </ul>

        </div>
    );

}