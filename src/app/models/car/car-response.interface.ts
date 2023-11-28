import {IdentifiedCar} from "./identified-car.interface";

export interface CarResponse extends IdentifiedCar{
  responseCode: number
  message: string
}
