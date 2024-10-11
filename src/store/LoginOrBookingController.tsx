import { createSlice } from "@reduxjs/toolkit";

interface LoginOrBookingControllerSliceType {
    loginOrBooking: null | boolean;
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
            console.log(LoginOrBookingControllerStore)
        },
        SelectidDate(state, action) {
            state.selectedDate = action.payload.selectedDate;
            state.loginOrBooking = action.payload.booking;
            state.formWindowVisibility = !state.formWindowVisibility;
        }
    }
})
export default LoginOrBookingControllerSlice;

