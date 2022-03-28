import React from 'react';
import styles from './ingredient-nav.module.css';


export default class IngredientNav extends React.Component {


    render() {

        const ITEMS = ['Булки', 'Соусы', 'Начинка'];

        const list = ITEMS.map((item, index) =>
            (
                <span className={"text text_type_main-default pb-5"} key={'tab_nav_' + index}>
                    {item}
                </span>
            )
        );

        return (
            <div className={styles.navigationContainer + " mb-3 pt-3"}>
                {list}
            </div>
        );
    };

}
