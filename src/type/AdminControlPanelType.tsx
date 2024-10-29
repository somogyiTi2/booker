import { DateDataType } from "./DataTypes";

export interface AdminControlPanelProps {
    show: boolean;
    data: DateDataType | {};
}

export interface AdminFunctionType {
    functionID: string;
    text: string;
    buttonText?: string;
    button?: string;
}