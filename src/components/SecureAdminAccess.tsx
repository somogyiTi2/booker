import React, { FormEvent, useState } from 'react';
import ModalWindow from './ModalWindow';
import { useDispatch } from 'react-redux';
import { AdminActions } from '../store';
import style from '../style/Form.module.css';

const SecureAdminAccess = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
    const [enteredPassword, setEnteredPassword] = useState<string>('');
    const [isPasswordIncorrect, setIsPasswordIncorrect] = useState<boolean | null>(null);
    const storedAdminPassword = process.env.REACT_APP_ADMINPASSWORD;
    const dispatch = useDispatch();

    const handlePasswordSubmit = (event: FormEvent) => {
        event.preventDefault();
        const isPasswordCorrect = storedAdminPassword === enteredPassword;

        if (isPasswordCorrect) {
            dispatch(AdminActions.AdminModeTrue());
            localStorage.setItem('admin', 'true');
            setIsPasswordIncorrect(false);
            setTimeout(() => {
                setIsModalVisible(false)
            }, 1000);
        } else {
            setIsPasswordIncorrect(true);
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredPassword(event.target.value);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <ModalWindow show={isModalVisible} onClose={handleCloseModal}>
            <form
                onSubmit={handlePasswordSubmit}
                className={`${style.form} ${isPasswordIncorrect === false ? style.success : ''}`}
            >
                <label htmlFor='password'>
                    <h1>Password:</h1>
                </label>
                <input
                    id='password'
                    type="password"
                    value={enteredPassword}
                    onChange={handlePasswordChange}
                />
                {isPasswordIncorrect && <p className={style.error}>Sikertelen bejelentkezés</p>}
                <p>
                    <button type="submit">Bejelentkez</button>
                </p>
            </form>
        </ModalWindow>
    );
};

export default SecureAdminAccess;