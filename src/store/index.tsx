import { configureStore } from "@reduxjs/toolkit";
import LoginOrBookingControllerSlice from "./LoginOrBookingController";



const store = configureStore({
    reducer: {
        LoginOrBooking: LoginOrBookingControllerSlice.reducer,
    }
})

// Exporting the actions and store
export const LoginOrBookingActions = LoginOrBookingControllerSlice.actions;


export type IRootState = ReturnType<typeof store.getState>
export default store;
