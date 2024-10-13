import React, { useEffect, useState } from 'react';
import BookingDate from './BookingDate';
import styles from '../style/BookingList.module.css';
import { DateDataType } from '../type/DataType';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';

const dummy_data: DateDataType[] = [
    {
        date: new Date("2024-10-11T10:00:00"),
        available: true,
        reservations: [{
            name: "Alice Green",
            email: "alice@example.com",
            phone: 1234567890
        }]
    },
    {
        date: new Date("2024-10-12T12:00:00"),
        available: true,
    },
    {
        date: new Date("2024-10-11T13:00:00"),
        available: false,
        reservations: [{
            name: "Bob Smith",
            email: "bob@example.com",
            phone: 9876543210
        },
        {
            name: "Clara Johnson",
            email: "clara@example.com",
            phone: 4561237890
        }]
    },
    {
        date: new Date("2024-09-26T16:00:00"),
        available: false,
        reservations: [{
            name: "Clara Johnson",
            email: "clara@example.com",
            phone: 4561237890
        }]
    },
    {
        date: new Date("2024-09-29T12:15:00"),
        available: true,
    },
    {
        date: new Date("2024-09-30T11:45:00"),
        available: false,
        reservations: [{
            name: "Daniel Lee",
            email: "daniel@example.com",
            phone: 3216549870
        }]
    }
];

const BookingList: React.FC<{ date: Date, numberofDays: number }> = ({ date, numberofDays }) => {
    const adminController = useSelector((state: IRootState) => state.Admin)
    const adminRedux: boolean = adminController.admin;
    const adminLocal: boolean = !!localStorage.getItem('admin');
    const fullAdmin: boolean = adminRedux && adminLocal;
    const promptDate: Date = date
    const [visibleDates, setVisibleDates] = useState<{ date: Date }[]>([]);
    const numberOfDays = numberofDays;

    const makeDays = (many: number, today: Date) => {
        const genDate: { date: Date }[] = [];
        for (let i = 0; i < many; i++) {
            const datagen = new Date(today);
            datagen.setDate(today.getDate() + i);
            genDate.push({ date: datagen });
        }
        setVisibleDates(genDate);
    };

    useEffect(() => {
        makeDays(numberOfDays, promptDate);
    }, [numberOfDays, promptDate]);

    const selectedTime = (dates: DateDataType[], selectedDate: Date): DateDataType[] => {
        return dates.filter((data) =>
            data.date.getDate() === selectedDate.getDate() &&
            data.date.getMonth() === selectedDate.getMonth() &&
            data.date.getFullYear() === selectedDate.getFullYear()
        );
    };

    return (
        <div className={styles.bookingList}>
            {visibleDates.map((day, index) => (
                <div key={index} className={styles.bookingDayList}>
                    {day.date.toDateString()}
                    <p>
                        {selectedTime(dummy_data, day.date).map((data) => (
                            (data.available || fullAdmin) && (
                                <BookingDate key={data.date.toISOString()} data={data} />
                            )
                        ))}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default BookingList;
