import {Component, Input, OnInit} from '@angular/core';
import {IdentifiedCar} from "../../models/car/identified-car.interface";
import {ApiResponse} from "../../models/api-response.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../services/car-service";

@Component({
    selector: 'app-car-view',
    templateUrl: './car-view.component.html',
    styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {
    private _car!: IdentifiedCar;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private carService: CarService) {
    }
    ngOnInit(): void {
        this.getUserDetails()
    }

    get car(): IdentifiedCar {
        return this._car
    }

    back() {
        this.router.navigate(['catalogue'])
    }

    private getUserDetails(): void {
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
