import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginOrBookingControllerSliceType } from "../type/LoginOrBookingControllerSliceType";


const LoginOrBookingControllerStore: LoginOrBookingControllerSliceType = {
    option: null, /*login 0, booking 1, updatePersonData 2*/
    formWindowVisibility: false,
    selectedDate: undefined,
    updatePersonData: undefined,
    login:false,
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
        },
        LoginHandler(state,action){
            state.login = action.payload;
        }
    }
})
export default LoginOrBookingControllerSlice;

