import React from 'react';
import {ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default class AppHeader extends React.Component {

    render() {
        return (
            <header>
                <nav>
                    <ul className={"mr-2 mt-2 mb-2 p-0"}>
                        <li>
                            <BurgerIcon type={"secondary"}/>
                        </li>
                        <li>
                            <a href={"#"}>Конструктор</a>
                        </li>
                    </ul>
                    <ul className={"mr-2 mt-2 mb-2 p-0"}>
                        <li>
                            <ListIcon type={"secondary"}/>
                        </li>
                        <li>
                            <a href={"#"}>Лента заказов</a>
                        </li>
                    </ul>
                </nav>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <nav>
                    <ul>
                        <li>
                            <ProfileIcon type={"secondary"}/>
                        </li>
                        <li>
                            <a href={"#"}>Личный кабинет</a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }

}