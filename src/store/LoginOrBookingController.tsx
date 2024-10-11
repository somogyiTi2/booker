import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginOrBookingControllerSliceType {
    loginOrBooking: null | number;
    formWindowVisibility: boolean;
    selectedDate: undefined | string;
}
const LoginOrBookingControllerStore: LoginOrBookingControllerSliceType = {
    loginOrBooking: null, /*login 0, booking 1*/
    formWindowVisibility: false,
    selectedDate: undefined
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
            state.loginOrBooking = action.payload.booking;
            state.formWindowVisibility = !state.formWindowVisibility;
        },
        SelectedLogin(state, action: PayloadAction<{ login: number }>) {
            state.loginOrBooking = action.payload.login;
            state.selectedDate = undefined;
            state.formWindowVisibility = !state.formWindowVisibility
        }
    }
})
export default LoginOrBookingControllerSlice;

