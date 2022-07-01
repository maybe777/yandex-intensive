import React, {useCallback} from "react"
import {NavLink, useHistory} from "react-router-dom";
import styles from './profile-menu.module.css'
import {useDispatch} from "react-redux";
import {userLogout} from "../../redux/actions/auth-actions";

export function ProfileMenu() {

    const dispatch = useDispatch()
    const history = useHistory()

    const logoutHandler = useCallback(() => {
        //@ts-ignore
        dispatch(userLogout())
        history.push('/login')
    }, [history, userLogout])

    return (
        <div className={styles.menu}>
            <ul className={styles.menuItem}>
                <li>
                    <h3>
                        <NavLink to={'/profile'}
                            //@ts-ignore
                                 className={({isActive}) => (
                                     isActive ? styles.activeMenu : ''
                                 )}
                        >Профиль</NavLink>
                    </h3>
                </li>
                <li>
                    <h3>
                        <NavLink to={{pathname: `/orders`}}
                            //@ts-ignore
                                 className={({isActive}) => (
                                     isActive ? styles.activeMenu : ''
                                 )}>Заказы</NavLink>
                    </h3>
                </li>
                <li>
                    <h3>
                        <NavLink to={{pathname: `/login`}} onClick={logoutHandler}>Выход</NavLink>
                    </h3>
                </li>
                <li>
                    <p className={styles.dark}>В этом разделе вы можете изменить свои персональные данные</p>
                </li>
            </ul>
        </div>
    );

}