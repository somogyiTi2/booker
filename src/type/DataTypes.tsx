export type Reservation = {
    name: string;
    email: string;
    phone: string;
};

export type DateDataType = {
    date: Date;
    available: boolean;
    reservations?: Reservation[];
    finishTime: Date;
    nameClass?: string;
    teamNumber: number;
};
export type ProfileType = Reservation & {
    bookingData: string[];
};