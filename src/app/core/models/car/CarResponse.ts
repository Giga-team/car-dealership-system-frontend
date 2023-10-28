import {IdentifiedCar} from "./IdentifiedCar";

export interface CarResponse extends IdentifiedCar{
  responseCode: number
  message: string
}
