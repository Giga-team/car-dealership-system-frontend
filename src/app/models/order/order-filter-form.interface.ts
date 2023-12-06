export interface OrderFilterFormInterface {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    creationDateLowerBound: Date,
    creationDateUpperBound: Date,
    status: string
}