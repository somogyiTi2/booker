import React from 'react'
import { useSelector } from "react-redux";
import SecureAdminAccess from './SecureAdminAccess';
import { IRootState } from '../store';
import AdminControlPanel from './AdminControlPanel';
import { AdminControllerSliceType } from '../type/AdminControllerSliceType';
import { DateDataType } from '../type/DataType';

const AdminHandlers = () => {
    const adminController:AdminControllerSliceType = useSelector((state: IRootState) => state.Admin)
    const passwordHandler:boolean = adminController.passwordHandler;
    const adminControllerPanel:boolean = adminController.adminControlPanelShow;
    const adminControllerDatas: DateDataType | {} = adminController.adminControllerDatas;
    return (
        <>
            {passwordHandler === true && <SecureAdminAccess />}
            <AdminControlPanel show={adminControllerPanel} data={adminControllerDatas} />
        </>
    )
}

export default AdminHandlers