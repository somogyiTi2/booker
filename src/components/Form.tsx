import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';
import style from "../style/Form.module.css";

const Form = () => {
    /*name*/
    const [enteredName, setEnteredName] = useState<string>('');
    const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);
    /*email*/
    const [enteredEmail, setEnteredEmail] = useState<string>('');
    const [enteredEmailTouched, setEnteredEmailTouched] = useState<boolean>(false);
    /*phone*/
    const [enteredPhone, setEnteredPhone] = useState<string>('');
    const [enteredPhoneTouched, setEnteredPhoneTouched] = useState<boolean>(false);

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
        enteredName.trim().length > 2 &&
        /^[a-zA-Z]+$/.test(enteredName);
    const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
    /*email*/
    const enteredEmailIsValid =
        enteredEmail.trim() !== '' &&
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(enteredEmail);
    const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;
    /*phone*/
    const enteredPhoneIsValid =
        enteredPhone.trim() !== '' /*TODOFIX*/
    const phoneInputIsInvalid = !enteredPhoneIsValid && enteredPhoneTouched;

    //formIsValid default
    let formIsValid = false;

    // Determine form validity
    if (enteredNameIsValid && enteredEmailIsValid && enteredPhoneIsValid) {
        formIsValid = true;
    }

    // Handle input blur event (when user leaves the input field)
    /*name*/
    const nameInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
        setEnteredNameTouched(true);
    };
    /*email*/
    const emailInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
        setEnteredEmailTouched(true);
    };
    /*phone*/
    const phoneInputBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
        setEnteredPhoneTouched(true);
    };

    // Submit handler
    const formSubmitHandler = (event: FormEvent) => {
        event.preventDefault();
        setEnteredNameTouched(true);
        console.log(enteredName)
        if (!enteredNameIsValid && !enteredEmailIsValid && !enteredPhoneIsValid) {
            return; // Do not proceed if the form is invalid
        }

        // Reset the form after submission
        setEnteredName('');
        setEnteredEmail('');
        setEnteredPhone('');
        setEnteredNameTouched(false);
        setEnteredEmailTouched(false);
        setEnteredPhoneTouched(false);
    };


    return (
        <form onSubmit={formSubmitHandler} className={style.form}>
            <label htmlFor='name'>Your Name:</label>
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

            <label htmlFor='phone'>Phone:</label>
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
                <button onClick={() => console.log("close")} >
                    Bezár
                </button>
                <button type="submit" disabled={!formIsValid}>
                    Küldés
                </button>
            </div>
        </form>

    );
};

export default Form;