import {Component, OnInit} from '@angular/core';
import {Car} from "../../models/car/car.interface";
import {CarService} from "../../services/car-service";
import {ActivatedRoute, Router} from "@angular/router";
import {IdentifiedCar} from "../../models/car/identified-car.interface";

@Component({
    selector: 'app-car-create',
    templateUrl: './car-create.component.html',
    styleUrls: ['./car-create.component.css']
})
export class CarCreateComponent implements OnInit{
    private _car!: IdentifiedCar;

    constructor(private readonly carService: CarService,
                private readonly router: Router,
                private readonly route: ActivatedRoute) {
    }

    createCar() {
        this.carService.createCar(this._car).subscribe(response => {
            this.router.navigate(['catalogue']);
        })
    }

    back() {
        this.router.navigate(['catalogue']);
    }

    get car(): IdentifiedCar {
        return this._car
    }

    ngOnInit(){
        this._car = this.initCar()
    }

    private initCar(): IdentifiedCar {
        return {
            id: 0,
            article: '',
            brand: '',
            model: '',
            engineCapacity: 0,
            power: 0,
            numberOfSeats: 0,
            gearBox: '',
            price: 0,
            status: 'AVAILABLE'
        };
    }
}
