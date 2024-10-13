import { createSlice } from "@reduxjs/toolkit";
import { AdminControllerSliceType } from "../type/AdminControllerSliceType";

const AdminControllerSliceStore: AdminControllerSliceType = {
    admin: false,
    passwordHandler: false,
    adminControlPanelShow: false,
    adminControllerDatas: {}
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
        },
        AdminControlPanel(state, action) {
            state.adminControlPanelShow = !state.adminControlPanelShow
            state.adminControllerDatas=action.payload;
        }
    }
})
export default AdminControllerSlice;

