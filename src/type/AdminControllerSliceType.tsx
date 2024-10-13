import { DateDataType } from "./DataType";

export interface AdminControllerSliceType  {
    admin: boolean;
    passwordHandler: boolean;
    adminControlPanelShow: boolean;
    adminControllerDatas: DateDataType | {};
}