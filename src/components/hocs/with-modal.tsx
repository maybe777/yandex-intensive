import React from "react";
import ReactDOM from "react-dom";
import styles from "./with-modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";


// @ts-ignore
const withModal = (WrappedComponent) => (props) => {

    if (!props.isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modal}>
            <div className={styles.modalContainer}>
                <div className={styles.close}>
                    <CloseIcon type={'primary'} onClick={props.onClose}/>
                </div>
                <div className={styles.content}>
                    <WrappedComponent {...props}/>
                </div>
            </div>
        </div>,
        // @ts-ignore
        document.getElementById('modal')
    );
};

export default withModal;
