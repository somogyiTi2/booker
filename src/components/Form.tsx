import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import style from "../style/Form.module.css";
import ModalWindow from './ModalWindow';
import SaveDataModal from './SaveDataModal';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, LoginOrBookingActions } from '../store';

const Form = () => {
    const dispatch = useDispatch();
    const LoginOrBookingControllerStore = useSelector((state: IRootState) => state.LoginOrBooking);
    const showWindow = LoginOrBookingControllerStore.formWindowVisibility;
    const selectedDate = LoginOrBookingControllerStore.selectedDate;
    const loginChoiceButton = LoginOrBookingControllerStore.loginOrBooking;
    const onClose = () => {
        dispatch(LoginOrBookingActions.FormWindowHandler());
    };

    /*Can I save or not the datas*/
    const [saveData, setSaveData] = useState<boolean | null>(null);
    /*Can I need open the data save window*/
    const [saveDataModalShow, setSaveDataModalShow] = useState<boolean>(false);
    /*name*/
    const name = localStorage.getItem('name');
    const [enteredName, setEnteredName] = useState<string>(name || '');
    const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
    /*email*/
    const email = localStorage.getItem('email');
    const [enteredEmail, setEnteredEmail] = useState<string>(email || '');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState<boolean>(false);
    /*phone*/
    const phone = localStorage.getItem('phone');
    const [enteredPhone, setEnteredPhone] = useState<string>(phone || '');
    const [enteredPhoneTouched, setEnteredPhoneTouched] = useState<boolean>(false);
    /*need save window or not*/
    const needWindow = name && email && phone ? false : true;

    // Handle input change event
    /*name*/
    const nameInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredName(event.target.value);
    };
    /*email*/
    const emailInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredEmail(event.target.value);
    };
    /*phone*/
    const phoneInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredPhone(event.target.value);
    };

    // Validate entered 
    /*name*/
    const enteredNameIsValid =
        enteredName.trim() !== '' &&
        enteredName.trim().length > 3 &&
        /^[a-zA-Z\s]+$/.test(enteredName);
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    /*email*/
    const enteredEmailIsValid =
        enteredEmail.trim() !== '' &&
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail);
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
    /*phone*/
    const enteredPhoneIsValid =
        enteredPhone.trim() !== '' && /^[0-9]+$/.test(enteredPhone);
    const phoneInputIsInvalid = !enteredPhoneIsValid && enteredPhoneTouched;
    //formIsValid default, Determine form validity
    let formIsValid = enteredNameIsValid && enteredEmailIsValid && enteredPhoneIsValid;
    // Handle input blur event (when user leaves the input field)
    /*name*/
    const nameInputBlurHandler = () => setEnteredNameTouched(true);
    /*email*/
    const emailInputBlurHandler = () => setEnteredEmailTouched(true);
    /*phone*/
    const phoneInputBlurHandler = () => setEnteredPhoneTouched(true);

    // Submit handler
    const formSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        setEnteredNameTouched(true);
        setSaveDataModalShow(needWindow);
        needWindow === false && onClose();
        if (!formIsValid) {
            return; // Do not proceed if the form is invalid
        }
        {
            loginChoiceButton === 1 &&
                console.log("You signed up with these data:", enteredEmail, enteredName, enteredPhone);
        }
        setEnteredNameTouched(false);
        setEnteredEmailTouched(false);
        setEnteredPhoneTouched(false);
    };

    useEffect(() => {
        if (saveData === true) {
            saveDataHandler();
            onClose();
        }
        if (saveData === false) {
            setEnteredName('');
            setEnteredEmail('');
            setEnteredPhone('');
            onClose();
        }
    }, [saveData]);

    const saveDataHandler = () => {
        localStorage.setItem('name', enteredName);
        localStorage.setItem('email', enteredEmail);
        localStorage.setItem('phone', enteredPhone);
    };

    let selectidDateView;
    if (selectedDate) {
        const dateObj = new Date(selectedDate);
        // Date
        // Month
        const month = (new Intl.DateTimeFormat("hu-HU", { month: "long" }).format(dateObj));
        const writeMonth = month.charAt(0).toUpperCase() + month.slice(1);

        //Date
        const sumDate = `${dateObj.getFullYear()}.${writeMonth}.${dateObj.getDate()}`;
        //Time
        const sumTime = `${dateObj.getHours()}:${String(dateObj.getMinutes()).padStart(2, '0')}`;
        selectidDateView = <div className={style.date}><p>Dátum: {sumDate}</p><p>{sumTime}</p></div>;
    }

    return (
        <ModalWindow show={showWindow} onClose={onClose}>
            <form onSubmit={formSubmitHandler} className={style.form}>
                {loginChoiceButton === 0 && <h1>Bejelentkezés</h1>}
                {selectedDate !== null && selectidDateView}
                <label htmlFor='name'>Név:</label>
                <input
                    className={nameInputIsInvalid ? style.errorData : ''}
                    type='text'
                    id='name'
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={enteredName}
                />
                {nameInputIsInvalid && <p className={style.error}>Helytelen név!</p>}

                <label htmlFor='email'>E-mail:</label>
                <input
                    className={emailInputIsInvalid ? style.errorData : ''}
                    type='text'
                    id='email'
                    onChange={emailInputChangeHandler}
                    onBlur={emailInputBlurHandler}
                    value={enteredEmail}
                />
                {emailInputIsInvalid && <p className={style.error}>Helytelen e-mail!</p>}

                <label htmlFor='phone'>Telefon:</label>
                <input
                    className={phoneInputIsInvalid ? style.errorData : ''}
                    type='text'
                    id='phone'
                    onChange={phoneInputChangeHandler}
                    onBlur={phoneInputBlurHandler}
                    value={enteredPhone}
                />

                {phoneInputIsInvalid && <p className={style.error}>Helytelen Telefonszám!</p>}

                <div className={style.formActions}>
                    <button onClick={() => onClose()} >
                        Bezár
                    </button>
                    {loginChoiceButton === 0 &&
                        <button onClick={() => setSaveDataModalShow(true)} >
                            Bejelentkezés
                        </button>}
                    {loginChoiceButton === 1 &&
                        <button type="submit" disabled={!formIsValid} >
                            Küldés
                        </button>
                    }

                </div>
            </form>
            {saveDataModalShow && (
                <SaveDataModal update={setSaveData} showWindow={setSaveDataModalShow} show={saveDataModalShow} />
            )}

        </ModalWindow>
    );
};

export default Form;