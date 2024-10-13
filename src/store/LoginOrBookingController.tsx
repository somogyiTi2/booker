import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Reservation } from "../type/DataType";

interface LoginOrBookingControllerSliceType {
    option: null | number;
    formWindowVisibility: boolean;
    selectedDate: undefined | string;
    updatePersonData: undefined | Reservation
}
const LoginOrBookingControllerStore: LoginOrBookingControllerSliceType = {
    option: null, /*login 0, booking 1, updatePersonData 2*/
    formWindowVisibility: false,
    selectedDate: undefined,
    updatePersonData: undefined,
}

const LoginOrBookingControllerSlice = createSlice({
    name: 'LoginOrBookingController',
    initialState: LoginOrBookingControllerStore,
    reducers: {
        FormWindowHandler(state) {
            state.formWindowVisibility = !state.formWindowVisibility
        },
        SelectidDate(state, action: PayloadAction<{ selectedDate: string; booking: number; }>) {
            state.selectedDate = action.payload.selectedDate;
            state.option = action.payload.booking;
            state.formWindowVisibility = !state.formWindowVisibility;
        },
        SelectedLogin(state, action: PayloadAction<{ login: number }>) {
            state.option = action.payload.login;
            state.selectedDate = undefined;
            state.formWindowVisibility = !state.formWindowVisibility
        },
        UpdateDate(state, action) {
            state.formWindowVisibility = !state.formWindowVisibility;
            state.updatePersonData = action.payload.person;
            state.option = action.payload.loginOrBooking;
            console.log(action.payload)
        }
    }
})
export default LoginOrBookingControllerSlice;

