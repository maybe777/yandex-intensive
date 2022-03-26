import React from 'react';
import styles from './wrapper.module.css'

export default class Wrapper extends React.Component {

    render() {
        return (
            <div className={styles.wrapper}>
                <h1>Соберите бургер</h1>
            </div>
        );
    }


}