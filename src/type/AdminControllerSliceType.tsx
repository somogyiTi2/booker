import { DateDataType } from "./DataTypes";

export interface AdminControllerSliceType  {
    admin: boolean;
    passwordHandler: boolean;
    adminControlPanelShow: boolean;
    adminControllerDatas: DateDataType | {};
}