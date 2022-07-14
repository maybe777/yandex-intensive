import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";


//@ts-ignore
const Modal = ({title, onClose, children}) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: any) => {
            if (modalRef.current != null) {
                if (!modalRef.current.contains(event.target)) {
                    onClose()
                }
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [onClose])

    useEffect(() => {
        let handler = (event: any) => {
            if (modalRef.current != null) {
                if (event.keyCode === 27) {
                    console.log(event.keyCode)
                    onClose()
                }
            }
        }
        document.addEventListener("keydown", handler)
        return () => {
            document.removeEventListener("keydown", handler)
        }
    }, [onClose])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay/>
            <div ref={modalRef} className={styles.modal}>
                <div className={styles.modalContainer}>
                    <div className={styles.head}>
                        <p className={"text text_type_main-large pt-2"}>{title}</p>
                    </div>
                    <div className={styles.close}>
                        <CloseIcon type={'primary'} onClick={onClose}/>
                    </div>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </>,
        // @ts-ignore
        document.getElementById('modal')
    );
}

export default Modal;
