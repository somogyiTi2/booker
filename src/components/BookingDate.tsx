import { DateDataType } from "../type/DataType";
import styles from '../style/BookingDate.module.css';
import { useDispatch } from "react-redux";
import { AdminActions, LoginOrBookingActions } from "../store";

const BookingDate = ({ data: appointment }: { data: DateDataType }) => {
    const dispatch = useDispatch();
    const isAdmin: boolean = !!localStorage.getItem('admin');
    const available = appointment
        && (appointment.reservations?.length ?? 0) >= appointment.teamNumber &&
        new Date(appointment.date) >= new Date();

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

    const startDate = new Date(appointment.date);
    const finishTime = new Date(appointment.finishTime);
    return (
        <button
            onClick={clickHandler}
            className={`${styles.bookingButton} ${available ? styles.available : styles.unavailable}`}
        >
            <span>
                {new Intl.DateTimeFormat("hu-HU", { dateStyle: 'full' }).format(startDate)}
            </span>
            <span>
                {`${new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format(startDate)} -
                 ${new Intl.DateTimeFormat("hu-HU", { hour: '2-digit', minute: "2-digit" }).format(finishTime)}  `}
            </span>
            {isAdmin && appointment.reservations && (
                <>
                    <hr />
                    {appointment.reservations.map((person, index) => (
                        <span key={`${person.name}-${index}`}>{index+1} {person.name}</span>
                    ))}
                </>
            )}
        </button>
    );
};

export default BookingDate;
