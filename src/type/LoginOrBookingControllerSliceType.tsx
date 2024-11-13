import { Reservation } from "./DataTypes";

export interface LoginOrBookingControllerSliceType {
    option: null | number;
    formWindowVisibility: boolean;
    selectedDate: undefined | string;
    updatePersonData: undefined | Reservation;
    login: boolean;
}