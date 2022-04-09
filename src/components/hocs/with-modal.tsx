import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styles from "./with-modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";


const withModal = (WrappedComponent: any) => (props: any) => {

        const [isOpen, setIsOpen] = useState(true)

        const modalRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            let handler = (event: any) => {
                if (modalRef.current != null) {
                    if (!modalRef.current.contains(event.target)) {
                        console.log(event.keyCode)
                        setIsOpen(!isOpen)
                    }
                }
            }
            document.addEventListener("mousedown", handler)
            return () => {
                document.removeEventListener("mousedown", handler)
            }
        })

        useEffect(() => {
            let handler = (event: any) => {
                if (modalRef.current != null) {
                    if (event.keyCode === 27) {
                        console.log(event.keyCode)
                        setIsOpen(!isOpen)
                    }
                }
            }
            document.addEventListener("keydown", handler)
            return () => {
                document.removeEventListener("keydown", handler)
            }
        })

        if (!props.isOpen || !isOpen) return null;

        return ReactDOM.createPortal(
            <div ref={modalRef} className={styles.modal}>
                <div className={styles.modalContainer}>
                    {props.header && props.header.length > 0 && <div className={styles.head}>
                        <p className={"text text_type_main-large pt-2"}>{props.header}</p>
                    </div>}
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
    }
;

export default withModal;
