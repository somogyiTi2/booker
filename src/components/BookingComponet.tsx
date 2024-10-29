import React, { useState } from 'react';
import NumberOfDays from "./NumberOfDays";
import DatePicker from './DatePicker';
import BookingList from './BookingList';
import CreateDate from './CreateDate';
import ReadBookableDates from '../services/ReadBookableDates'
import { DateDataType } from '../type/DataType';

const BookingComponent = () => {
    const [bookableDates, setBookableDates] = useState<DateDataType[] | []>([]);
    const [numberOfDays, setNumberOfDays] = useState<number>(3);
    let today = new Date();
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const adminLocal = localStorage.getItem('admin');
   
    return (
        <>
            {!!adminLocal === true && <CreateDate />}
            <NumberOfDays setNumberOfDay={setNumberOfDays} numberOfDays={numberOfDays} />
            <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} today={today} />
            <BookingList date={selectedDate} numberofDays={numberOfDays} bookableDates={bookableDates} />
            <ReadBookableDates setBookableDates={setBookableDates} />
        </>
    );
};

export default BookingComponent;
