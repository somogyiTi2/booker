import { Reservation } from "./DataTypes";

export interface UpdateBookingPropsType {
    selectedDate: string;
    name: string;
    email: string;
    phone: string;
    functionID: string;
    updateData?: Reservation;
    plussFunction?: any;
}

export interface BookingData {
    reservations?: Reservation[];
    teamNumber?: number;
}