import { configureStore } from "@reduxjs/toolkit";
import LoginOrBookingControllerSlice from "./LoginOrBookingController";
import AdminControllerSlice from "./AdminController";



const store = configureStore({
    reducer: {
        LoginOrBooking: LoginOrBookingControllerSlice.reducer,
        Admin: AdminControllerSlice.reducer
    }
})

// Exporting the actions and store
export const LoginOrBookingActions = LoginOrBookingControllerSlice.actions;
export const AdminActions = AdminControllerSlice.actions;

export type IRootState = ReturnType<typeof store.getState>
export default store;
