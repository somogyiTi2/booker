import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import style from '../style/CreateDate.module.css'
import formstyle from "../style/Form.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, LoginOrBookingActions } from '../store';


const CreateDate = () => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const digitalTime = new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format()
    const [startClock, setstartClock] = useState<string>(digitalTime)
    const [teamNumber, setTeamNumber] = useState<number>(1);
    const adminController = useSelector((state: IRootState) => state.Admin)
    const adminRedux: boolean = adminController.admin;
    const adminLocal: boolean = !!localStorage.getItem('admin');
    const fullAdmin: boolean = adminRedux && adminLocal;


    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const timeSplit = startClock.split(":");
        startDate?.setHours(+timeSplit[0], +timeSplit[1], 0);
        if (startDate) {
            if (fullAdmin === true) {
                console.log(startDate, teamNumber, fullAdmin, "DO IT");
            } else {
                dispatch(LoginOrBookingActions.SelectedLogin({ login: 0 }))
            }
        }
    }

    return (
        <>
            {adminLocal && <h1 className={fullAdmin ? style.fullAdmin : style.needLoginAdmin}>Admin mode:</h1>}
            <form onSubmit={submitHandler} className={`${style.form} ${formstyle.form}`}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="Y/M/d"
                    type="date"
                />
                <input type="time" id="appt" name="appt" defaultValue={startClock} onChange={(time) => setstartClock(time.target.value)} />
                <details>
                    <summary>▽Csoport</summary>
                    <p>
                        <input type='number' min={1} defaultValue={1} onBlur={(event) => setTeamNumber(+event.target.value)} />
                    </p>
                </details>
                <button type="submit">Létrehoz</button>
            </form>
        </>
    );
};

export default CreateDate