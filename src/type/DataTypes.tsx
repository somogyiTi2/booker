export type Reservation = {
    name: string;
    email: string;
    phone: number;
};

export type DateDataType = {
    date: Date;
    available: boolean;
    reservations?: Reservation[];
    finishTime:Date;
    nameClass?:string;
    teamNumber:number;
};