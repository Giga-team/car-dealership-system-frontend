import {Order} from "./order.interface";

export interface FullOrder extends Order{
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
}