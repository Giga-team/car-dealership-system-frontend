import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from "../../../services/car-service";
import {IdentifiedCar} from "../../../models/car/identified-car.interface";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit, OnDestroy{
    private _cars: IdentifiedCar[] = [];
    private carsSubscription: Subscription | undefined;

    constructor(private readonly carService: CarService,
                private router: Router) {}

    ngOnInit(): void {
        this.getCars();
    }

    private getCars(): void {
        this.carsSubscription = this.carService.getCarsPage('', 0, 9)
            .subscribe(
                (response) => {
                    if (response.body !== null) {
                        this._cars = response.body
                    }
                },
                (error) => {
                    console.error('Error fetching cars:', error);
                }
            )
    }

    get cars(): IdentifiedCar[] {
        return this._cars;
    }

    public deleteCar(carId: number): void {
        this.carsSubscription = this.carService.deleteCar(carId)
            .subscribe(
            () => {
                this.getCars()
            },
            (error) => {
                console.error(`Failed to delete car with ID ${carId}:`, error)
            }
        )
    }

    public editCar(carId: number): void {
        // this.carsSubscription = this.carService.getCar(carId)
        //   .subscribe(
        //     (response) => {
        //         if (response.body !== null) {
        //             this._cars = response.body
        //         }
        //     },
        //     (error) => {
        //         console.error('Error fetching cars:', error);
        //     }
        //   )
    }


    ngOnDestroy() {
        if (this.carsSubscription) {
            console.log("A ya yibu")
            this.carsSubscription?.unsubscribe()
        }
    }

}
