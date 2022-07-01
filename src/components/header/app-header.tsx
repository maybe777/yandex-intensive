import React, {useState} from 'react';
import {ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import {NavLink} from 'react-router-dom';


interface MainState {
    isHoverConstr: Boolean;
    isHoverFeed: Boolean,
    isHoverProfile: Boolean
}

export default function AppHeader() {

    const [state, setState] = useState<MainState>({
        isHoverConstr: false,
        isHoverFeed: false,
        isHoverProfile: false
    });

    const hoverHandlerConstr = () => {

        setState({...state, isHoverConstr: !state.isHoverConstr});
    };

    const hoverHandlerFeed = () => {

        setState({...state, isHoverFeed: !state.isHoverFeed});
    };

    const hoverHandlerProfile = () => {
        setState({...state, isHoverProfile: !state.isHoverProfile});
    };


    return (
        <header className={styles.header}>
            <nav>
                <ul className={"mr-5 mt-2 mb-2 p-0"}>
                    <li>
                        <BurgerIcon type={state.isHoverConstr ? "primary" : "secondary"}/>
                        <NavLink
                            className={styles.link}
                            activeClassName={styles.active}
                            to={'/'}
                            onMouseEnter={hoverHandlerConstr} onMouseOut={hoverHandlerConstr}
                            exact>
                            &nbsp;Конструктор
                        </NavLink>
                    </li>
                </ul>
                <ul className={"mr-5 mt-2 mb-2 p-0"}>
                    <li>
                        <ListIcon type={state.isHoverFeed ? "primary" : "secondary"}/>
                        <NavLink
                            className={styles.link}
                            activeClassName={styles.active}
                            to={'/qwe'}
                            onMouseEnter={hoverHandlerFeed} onMouseOut={hoverHandlerFeed}
                            exact>
                            &nbsp;Лента заказов
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <nav>
                <ul>
                    <li>
                        <ProfileIcon type={state.isHoverProfile ? "primary" : "secondary"}/>
                        <NavLink
                            className={styles.link}
                            activeClassName={styles.active}
                            to={'/profile'}
                            onMouseEnter={hoverHandlerProfile} onMouseOut={hoverHandlerProfile}
                            exact>
                            &nbsp;Личный кабинет
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );

}