import React, { useEffect, useState } from 'react';
import style from '../style/DatePicker.module.css';
import DatePickerHandler, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker: React.FC<DatePickerProps> = ({ setSelectedDate, selectedDate, today }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [datePickerShow, setDatePickerShow] = useState<boolean>(true)

    useEffect(() => {
        (startDate instanceof Date) && setSelectedDate(startDate);
        setDatePickerShow(!datePickerShow);
    }, [startDate])

    const plusOneDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() + 1);
        setSelectedDate(currentDate)
    }
    const minusOneDay = () => {
        const currentDate = new Date(selectedDate);
        currentDate.setDate(currentDate.getDate() - 1);
        setSelectedDate(currentDate)
    }

    const buttonHandler = (action: string | Date) => {
        switch (action) {
            case 'plusOneDay':
                plusOneDay()
                break;
            case 'minusOneDay':
                minusOneDay()
                break;
            case 'today':
                setSelectedDate(today);
                break;
            default:
                console.log("somthing is wrong...:DatePickker.tsx");
                (action instanceof Date) && setSelectedDate(action)
        }
    };

    return (
        <>
            <div className={`${style["button-container"]}`}>
                <button className={`${style["arrow-btn"]} ${style.left}`} onClick={() => buttonHandler('minusOneDay')}>←</button>
                <div className={`${style["calendar-icon"]}`} onClick={() => setDatePickerShow(!datePickerShow)} title="Dátum választó" >📅</div>
                {datePickerShow &&
                    <DatePickerHandler
                        selected={startDate}
                        onChange={(date: React.SetStateAction<Date | null>) => setStartDate(date)}
                        dateFormat="Y/M/d"
                    />
                }
                <div className={`${style["calendar-icon"]}`} onClick={() => buttonHandler('today')} title="Ma()" >☀️</div>
                <button className={`${style["arrow-btn"]} ${style.right}`} onClick={() => buttonHandler('plusOneDay')}>→</button>
            </div>
        </>
    );
};

export default DatePicker;

