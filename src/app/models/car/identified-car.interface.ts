import {Car} from "./car.interface";

export interface IdentifiedCar extends Car{
  id: number;
}
