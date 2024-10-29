import { Reservation } from "./DataTypes";

export interface UpdateBookingPropsType {
    selectedDate: string;
    name: string;
    email: string;
    phone: number;
    functionID: string;
    updateData?: Reservation;
}

export interface BookingData {
    reservations?: Reservation[];
    teamNumber?: number;
}