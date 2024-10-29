import { Reservation } from "../type/DataTypes";
import { BookingData, UpdateBookingPropsType } from "../type/UpdateBookingPropsType";


const UpdateBooking = async ({
    selectedDate,
    name,
    email,
    phone,
    functionID,
    updateData,
    plussFunction
}: UpdateBookingPropsType
) => {
    const id = new Date(selectedDate).toISOString().split('.')[0];
    const newReservation: Reservation = {
        name,
        email,
        phone,
    };

    try {
        // Fetch existing booking data
        const response = await fetch(
            `${process.env.REACT_APP_API_LINK}/Time/${id}.json`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch existing booking data.');
        }

        const data: BookingData = await response.json();
        let existingReservations = data?.reservations || [];
        const teamNumber = data?.teamNumber || 0;
        const isAvailable = existingReservations.length < teamNumber;

        // Define a filter function to remove reservations
        const filterReservations = (reservation: Reservation) =>
            reservation.name !== updateData?.name &&
            reservation.email !== updateData?.email &&
            reservation.phone !== updateData?.phone;

        // Handle different function IDs
        switch (functionID) {
            case "booking":
                if (isAvailable) {
                    existingReservations.push(newReservation);
                } else {
                    console.log("No more reservations can be added.");
                    return;
                }
                break;
            case "deletePerson":
                existingReservations = existingReservations.filter(
                    (reservation) =>
                        reservation.name !== newReservation.name ||
                        reservation.email !== newReservation.email ||
                        reservation.phone !== newReservation.phone
                );
                break;
            case "updateData":
                if (updateData) {
                    existingReservations = existingReservations.filter(filterReservations);
                    existingReservations.push(newReservation);
                } else {
                    console.error("updateData is required for updateData function.");
                    return;
                }
                break;
            default:
                console.log("Function ID problem.");
        }

        // Update the team data
        const updateResponse = await fetch(
            `${process.env.REACT_APP_API_LINK}/Time/${id}.json`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    reservations: existingReservations,
                    available: existingReservations.length < teamNumber,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    
        if (!updateResponse.ok) {
            throw new Error('Failed to update booking.');
        }
        plussFunction();
        console.log("Booking updated successfully!");
    } catch (error) {
        console.error("Something went wrong!", error);
    }
};

export default UpdateBooking;
