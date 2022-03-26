import React from 'react';
import styles from './ingredient-nav.module.css';


export default class IngredientNav extends React.Component {


    render() {

        const ITEMS = ['Булки', 'Соусы', 'Начинка'];

        const list = ITEMS.map((item, index) =>
            (
                <span className={styles.navigation} key={index}>
                    {item}
                </span>
            )
        );

        return (
            <div className={styles.navigationContainer}>
                {list}
            </div>
        );
    };

}
