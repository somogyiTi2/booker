import { DateDataType } from "../type/DataType";
import styles from '../style/BookingDate.module.css';
import { useDispatch } from "react-redux";
import { AdminActions, LoginOrBookingActions } from "../store";

const BookingDate = ({ data: appointment }: { data: DateDataType }) => {
    const dispatch = useDispatch();
    const isAdmin: boolean = !!localStorage.getItem('admin');

    const handleAdminClick = () => {
        const reduxAppointment = {
            date: appointment.date.toString(),
            available: appointment.available,
            reservations: appointment.reservations,
        };
        dispatch(AdminActions.AdminControlPanel(reduxAppointment));
    };

    const handleUserClick = () => {
        dispatch(LoginOrBookingActions.SelectidDate({
            selectedDate: appointment.date.toString(),
            booking: 1
        }));
    };

    const clickHandler = isAdmin ? handleAdminClick : handleUserClick;

    return (
        <button
            onClick={clickHandler}
            className={`${styles.bookingButton} ${appointment.available ? styles.available : styles.unavailable}`}
        >
            <span>
                {new Intl.DateTimeFormat("hu-HU", { dateStyle: 'full' }).format(appointment.date)}
            </span>
            <span>
                {new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format(appointment.date)}
            </span>
            {isAdmin && appointment.reservations && (
                <>
                    <hr />
                    {appointment.reservations.map((person, index) => (
                        <span key={`${person.name}-${index}`}>{person.name}</span>
                    ))}
                </>
            )}
        </button>
    );
};

export default BookingDate;
