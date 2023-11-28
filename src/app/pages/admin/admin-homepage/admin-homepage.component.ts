import {Component, OnInit} from '@angular/core';
import {CarService} from "../../../services/car-service";
import {IdentifiedCar} from "../../../models/car/identified-car.interface";
import {Router} from "@angular/router";

@Component({
    selector: 'app-admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {
    private _cars: IdentifiedCar[] = [];
    constructor(private readonly carService: CarService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getCars();
    }

    private getCars(): void {
        this.carService.getCarsPage('',0 ,10).subscribe(
            response => {
                if (response.body !== null)
                    this._cars = response.body
            }
        )
    }

    get cars(): IdentifiedCar[] {
        return this._cars;
    }

}
