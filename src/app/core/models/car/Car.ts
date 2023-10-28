import {GearBox} from "../enum/GearBox";

export interface Car {
  brand: string;
  model: string;
  number: string;
  engineCapacity: number;
  power: number;
  maxPassenger: number;
  gearBox: GearBox;
  forRent: boolean;
  price: number;
  mileage: number;
}
