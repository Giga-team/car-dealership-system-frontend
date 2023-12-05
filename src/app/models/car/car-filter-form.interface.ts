import {IdentifiedCar} from "./identified-car.interface";

export interface CarFilterForm {
    article: string;
    brand: string;
    model: string;
    engineCapacityLowerBound: number;
    engineCapacityUpperBound: number;
    powerLowerBound: number;
    powerUpperBound: number;
    numberOfSeats: number;
    gearBox: string;
    priceLowerBound: number;
    priceUpperBound: number;
}