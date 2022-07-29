import React, {FC} from "react"
import {NavLink} from "react-router-dom";
import styles from './profile-menu.module.css'
import {useDispatch} from "../../service/hooks";
import {userLogout} from "../../redux/actions/auth-actions";

export const ProfileMenu: FC = () => {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(userLogout())
    }


    // из Слака

    // const { url } = useRouteMatch();
    //
    // return (
    //     <div className={styles.profile}>
    //         <div className={styles.left}>
    //             <ul className={styles.menu}>
    //                 <NavLink
    //                     to={url}
    //                     exact
    //                     className={styles.menu_item}
    //                     activeClassName={styles.active_menu_item}
    //                 >
    //                     <span>Профиль</span>
    //                 </NavLink>
    //                 <NavLink
    //                     to={`${url}/orders`}
    //                     exact
    //                     className={styles.menu_item}
    //                     activeClassName={styles.active_menu_item}
    //                 >
    //                     <span>История заказов</span>
    //                 </NavLink>
    //                 <div
    //                     className={styles.menu_item}
    //                     style={{ cursor: "pointer" }}
    //                     onClick={handleLogout}
    //                 >
    //                     <span>Выход</span>
    //                 </div>
    //             </ul>
    //             <p className="text_type_main-default text_color_inactive">
    //                 В этом разделе вы можете изменить свои персональные данные
    //             </p>
    //         </div>
    //         <div className={styles.right}>
    //             <Switch>
    //                 <ProtectedRoute path={url} exact={true}>
    //                     <Profile />
    //                 </ProtectedRoute>
    //                 <ProtectedRoute path={`${url}/orders`} exact={true}>
    //                     <div style={{ width: "100%", height: "100%", paddingTop: "20px" }}>
    //                         <Orders />
    //                     </div>
    //                 </ProtectedRoute>
    //             </Switch>
    //         </div>
    //     </div>
    // );

    return (
        <div className={styles.menu}>
            <ul className={styles.menuItem}>
                <li>
                    <h3>
                        <NavLink to={'/profile'}
                                 className={({isActive}: any) => (
                                     isActive ? styles.activeMenu : ''
                                 )}
                        >Профиль</NavLink>
                    </h3>
                </li>
                <li>
                    <h3>
                        <NavLink to={{pathname: `/orders`}}
                                 className={({isActive}: any) => (
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