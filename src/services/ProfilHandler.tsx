import { ProfileType, Reservation } from '../type/DataTypes';

const ProfilHandler = async (newReservation: Reservation, id: string) => {

    try {
        /*fix the phone is not number cause I want the hulli number 06 ->6 ->+36 vagy fixáld a formba. */
        const mixData = `${newReservation.name.split(' ').join('')}${newReservation.email.split('.').join('')}${newReservation.phone}`;
        const response = await fetch(
            `${process.env.REACT_APP_API_LINK}/Profil/${mixData}.json`
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Request failed: ${errorData.message || 'Unknown error'}`);
        }
        const data: ProfileType = await response.json();
        const bookingData = data ? [...data.bookingData, id] : [id];

        const patch = await fetch(
            `${process.env.REACT_APP_API_LINK}/Profil/${mixData}.json`,

            {
                method: 'PATCH',
                body: JSON.stringify({
                    name: newReservation.name,
                    email: newReservation.email,
                    phone: newReservation.phone,
                    bookingData: bookingData
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        if (!patch.ok) {
            const errorData = await response.json();
            throw new Error(`Request failed: ${errorData.message || 'Unknown error'}`);
        }
    } catch (error) {
        console.error("Error occurred while updating profile:", error);
        throw error;
    }
}

export default ProfilHandler;
