import { DateDataType } from "../type/DataType";
import styles from '../style/BookingDate.module.css';

const BookingDate = (props: { data: DateDataType }) => {
    const { data: appointment } = props;
    return (
        <button
        className={styles.bookingButton}
            style={{ background: appointment.available ? "green" : "gray" }}>
            <span>
                {new Intl.DateTimeFormat("hu-HU", { dateStyle: 'full' }).format(appointment.date)}
            </span>
            <span>
                {new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format(appointment.date)}
            </span>
        </button>
    );
};

export default BookingDate;