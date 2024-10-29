import React, { useEffect, useState } from 'react';
import ModalWindow from './ModalWindow';
import style from '../style/Form.module.css';

interface SuccessProps {
    success: boolean;
    setSuccess: (value: boolean) => void;
}

const Success: React.FC<SuccessProps> = ({ success, setSuccess }) => {
    const [showWindow, setShowWindow] = useState<boolean>(success);

    useEffect(() => {
        setShowWindow(success)
        success === true && setTimeout(() => { onClose() }, 1000);
    }, [success])

    const onClose = () => {
        setShowWindow(false);
        setSuccess(false);
    };
    return (
        <>
            <ModalWindow show={showWindow} onClose={onClose}>
                {success ? <img src={"https://em-content.zobj.net/source/joypixels-animations/366/check-mark-button_2705.gif"} /> : <h1>X</h1>}
            </ModalWindow>
        </>
    );
};

export default Success;
