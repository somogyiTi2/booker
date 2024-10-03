import React from 'react';
import ModalWindow from './ModalWindow';
import { SaveDataModalProps } from '../type/SaveDataModalPropsType';



const SaveDataModal: React.FC<SaveDataModalProps> = ({ update, showWindow, show }) => {
    const buttonHandler = (SaveDate: boolean) => {
        showWindow(false);
        update(SaveDate);
    }

    return (
        <ModalWindow show={show}>
            <h1>Szeretnéd menteni ezeket az adatokat a böngészőbe?</h1>
            <button onClick={() => buttonHandler(true)}>Igen</button>
            <button onClick={() => buttonHandler(false)}>Nem</button>
        </ModalWindow>
    );
}

export default SaveDataModal;
