import React, { useEffect, useState } from 'react';
import BookingDate from './BookingDate';
import styles from '../style/BookingList.module.css';
import { DateDataType } from '../type/DataTypes';
import { IRootState } from '../store';
import { useSelector } from 'react-redux';

const BookingList: React.FC<{ date: Date, numberofDays: number, bookableDates: DateDataType[] | [] }> = ({ date, numberofDays, bookableDates }) => {

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
                        {selectedTime(bookableDates, day.date).map((data, index) => (
                            (data.available || fullAdmin) && (
                                <BookingDate key={`${data.date.toISOString()}-${index}`} data={data} />
                            )
                        ))}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default BookingList;
