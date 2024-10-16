import React, { useState } from 'react';
import NumberOfDays from "./NumberOfDays";
import DatePicker from './DatePicker';
import BookingList from './BookingList';
import CreateDate from './CreateDate';

const BookingComponent = () => {
    const [numberOfDays, setNumberOfDays] = useState<number>(3);

    let today = new Date();
    const [selectedDate, setSelectedDate] = useState<Date>(today);


    return (
        <>
        
            <CreateDate/>
            <NumberOfDays setNumberOfDay={setNumberOfDays} numberOfDays={numberOfDays} />
            <DatePicker setSelectedDate={setSelectedDate} selectedDate={selectedDate} today={today} />
            <BookingList date={selectedDate} numberofDays={numberOfDays} />
        </>
    );
};

export default BookingComponent;
