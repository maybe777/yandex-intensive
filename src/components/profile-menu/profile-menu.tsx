import React, {FC} from "react"
import {NavLink, useRouteMatch} from "react-router-dom";
import styles from './profile-menu.module.css'
import {useDispatch} from "../../service/hooks";
import {userLogout} from "../../redux/actions/auth-actions";

export const ProfileMenu: FC = () => {

    const {url} = useRouteMatch()

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(userLogout())
    }

    return (
        <div className={styles.menu}>
            <ul className={styles.menuItem}>
                <li>
                    <NavLink to={url} className={({isActive}: any) => (isActive ? styles.activeMenu : '')}>
                        Профиль
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/orders`} className={({isActive}: any) => (isActive ? styles.activeMenu : '')}>
                        Заказы
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/login`} onClick={logoutHandler}>
                        Выход
                    </NavLink>
                </li>
                <li>
                    <p className={styles.dark}>В этом разделе вы можете изменить свои персональные данные</p>
                </li>
            </ul>
        </div>
    );
}