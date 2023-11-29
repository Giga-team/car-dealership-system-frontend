import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../services/car-service";
import {IdentifiedCar} from "../../models/car/identified-car.interface";
import {ApiResponse} from "../../models/api-response.interface";
import {catchError, switchMap, tap} from "rxjs";

@Component({
    selector: 'app-car-edit',
    templateUrl: './car-edit.component.html',
    styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
    private _car!: IdentifiedCar;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private carService: CarService) {}

    ngOnInit() {
        this.getCarDetails()
    }

    back(){
        this.router.navigate(['catalogue'])
    }

    updateCar() {
        this.carService.updateCar(this._car.id, this.car).subscribe(
            response => {
                this.router.navigate(['catalogue']);
            }
        )
    }

    get car(): IdentifiedCar {
        return this._car
    }

    private getCarDetails(): void {
        this.activatedRoute.params.subscribe(params => {
            this.carService.getCar(Number(params['id'])).subscribe(
                (response: ApiResponse<IdentifiedCar>) => {
                    console.log(typeof response)
                    if (response && response.body) {
                        this._car = response.body;
                        console.log(JSON.stringify(this._car))
                    } else {
                        console.error(`Car with ID: ${this.car?.id} not found`)
                    }
                }
            )
        })
    }
}
