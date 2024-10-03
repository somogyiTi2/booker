import React from 'react';
import style from "../style/ModalWindow.module.css"
import { ModalWindowProps } from '../type/ModalWindowsPropsType';



const ModalWindow: React.FC<ModalWindowProps> = ({ show, onClose, children }) => {

    if (!show) {
        return null;
    }

    return (
        <div className={style.modalBackdrop} onClick={onClose} >
            <div className={style.modalContainer} >
                <div className={style.modalHeader} onClick={event => event.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
