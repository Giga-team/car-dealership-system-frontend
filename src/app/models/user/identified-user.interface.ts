import {User} from "./user.interface";

export interface IdentifiedUser extends User{
    id: number;
}