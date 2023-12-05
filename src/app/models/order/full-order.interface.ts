import {IdentifiedOrder} from "./identified-order.interface";

export interface FullOrder extends IdentifiedOrder{
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
}