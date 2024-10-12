import { createSlice } from "@reduxjs/toolkit";

interface AdminControllerSliceType {
    admin: boolean;
    passwordHandler: boolean;
}
const AdminControllerSliceStore: AdminControllerSliceType = {
    admin: false,
    passwordHandler: false,
}

const AdminControllerSlice = createSlice({
    name: 'Admin',
    initialState: AdminControllerSliceStore,
    reducers: {
        AdminMode(state) {
            state.passwordHandler = true;
        },
        AdminModeTrue(state) {
            state.admin = true;
            console.log("Admin mode start");
        },
    }
})
export default AdminControllerSlice;

