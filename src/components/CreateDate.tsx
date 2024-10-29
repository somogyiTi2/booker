import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import style from '../style/CreateDate.module.css'
import formstyle from "../style/Form.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { AdminActions, IRootState, LoginOrBookingActions } from '../store';
import CreateTime from '../services/CreateTime';


const CreateDate = () => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const digitalTime = new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format()
    const [startClock, setstartClock] = useState<string>(digitalTime)
    const [teamNumber, setTeamNumber] = useState<number>(100);
    const adminController = useSelector((state: IRootState) => state.Admin)
    const adminRedux: boolean = adminController.admin;
    const adminLocal: boolean = !!localStorage.getItem('admin');
    const fullAdmin: boolean = adminRedux && adminLocal;
    const [nameClass, setNameClass] = useState("");
    const [howLongClass, setHowLongClass] = useState<number>(1);

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const timeSplit = startClock.split(":");
        startDate?.setHours(+timeSplit[0], +timeSplit[1], 0);
        if (startDate) {
            if (fullAdmin === true) {
                const dispatchUpdate = dispatch(AdminActions.UpdateData(true));
                let finishTime = new Date(startDate);
                finishTime.setHours(finishTime.getHours() + Math.floor(howLongClass));
                finishTime.setMinutes(finishTime.getMinutes() + (howLongClass % 1) * 60);
                CreateTime({ finishTime ,nameClass, startDate, teamNumber, dispatchUpdate })
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
                <input type='text' placeholder='Óra cím' onBlur={(event) => setNameClass(event.target.value)} />
                <details>
                    <summary>▽Tobábbiak</summary>
                    <p>
                        Létszám:
                    </p>
                    <p>
                        <input type='number' min={1} defaultValue={teamNumber} onBlur={(event) => setTeamNumber(+event.target.value)} />
                    </p>
                    <p>
                        óra hossza:
                    </p>
                    <p>
                        <input
                            type="number"
                            defaultValue={1}
                            step={0.5}
                            onBlur={(event) => {
                                const value = event.target.value.replace(',', '.');
                                setHowLongClass(+value);
                            }}
                        />
                    </p>
                </details>
                <button type="submit">Létrehoz</button>
            </form>
        </>
    );
};

export default CreateDate