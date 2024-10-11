import { DateDataType } from "../type/DataType";
import styles from '../style/BookingDate.module.css';
import { useDispatch } from "react-redux";
import { LoginOrBookingActions } from "../store";

const BookingDate = (props: { data: DateDataType }) => {
    const { data: appointment } = props;
    const dispatch = useDispatch()
    const clickHandler = () => {
        let selectidDate = appointment.date.toISOString()
        dispatch(LoginOrBookingActions.SelectidDate({ selectedDate: selectidDate, booking: 1 }));
    }
    return (
        <button
            onClick={clickHandler}
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