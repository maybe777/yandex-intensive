import React, {FC} from "react";
import styles from './modal-overlay.module.css'

const ModalOverlay:FC = () => {
    return (
        <div id='overlay' className={styles.overlay}/>
    );
}

export default ModalOverlay