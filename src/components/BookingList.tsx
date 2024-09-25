import React from 'react'
import { DateDataType } from '../type/dataType';
import BookingDate from './BookingDate'
import styles from '../style/BookingList.module.css';

const dummy_data: DateDataType[] = [
    {
        date: new Date("2024-09-25T10:00:00"),
        available: false,
        reservations: [{
            name: "Alice Green",
            email: "alice@example.com",
            phone: 1234567890
        }]
    },
    {
        date: new Date("2024-09-26T14:00:00"),
        available: true,
    },
    {
        date: new Date("2024-09-27T09:30:00"),
        available: false,
        reservations: [{
            name: "Bob Smith",
            email: "bob@example.com",
            phone: 9876543210
        }]
    },
    {
        date: new Date("2024-09-28T16:00:00"),
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

const BookingList = () => {
  

    return (
        <div className={styles.bookingList}>
            {dummy_data.map((data, index) => {
                return (<BookingDate key={index} data={data} />)
            })}
        </div>
    )
}

export default BookingList