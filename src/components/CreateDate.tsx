import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import style from '../style/CreateDate.module.css'


const CreateDate = () => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const digitalTime = new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format()
    const [startClock, setstartClock] = useState<string>(digitalTime)
    const [teamNumber, setTeamNumber] = useState<number>(1)

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const timeSplit = startClock.split(":");
        startDate?.setHours(+timeSplit[0], +timeSplit[1], 0);
        startDate && console.log(startDate, teamNumber);
    }

    return (
        <form onSubmit={submitHandler} className={style.form}>
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
    );
};

export default CreateDate