import React, {useState} from 'react';
import {ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


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
                <ul className={"mr-2 mt-2 mb-2 p-0"}>
                    <li>
                        <BurgerIcon type={state.isHoverConstr ? "primary" : "secondary"}/>
                        <a onMouseEnter={hoverHandlerConstr} onMouseOut={hoverHandlerConstr} href={"#"}>
                            &nbsp;Конструктор
                        </a>
                    </li>
                </ul>
                <ul className={"mr-2 mt-2 mb-2 p-0"}>
                    <li>
                        <ListIcon type={state.isHoverFeed ? "primary" : "secondary"}/>
                        <a onMouseEnter={hoverHandlerFeed} onMouseOut={hoverHandlerFeed} href={"#"}>
                            &nbsp;Лента заказов
                        </a>
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
                        <a onMouseEnter={hoverHandlerProfile} onMouseOut={hoverHandlerProfile} href={"#"}>
                            &nbsp;Личный кабинет
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );

}