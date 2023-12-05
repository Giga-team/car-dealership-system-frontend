import {Component, Input, OnInit} from '@angular/core';
import {IdentifiedCar} from "../../models/car/identified-car.interface";
import {ApiResponse} from "../../models/api-response.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {CarService} from "../../services/car-service";
import {StorageService} from "../../services/storage-service";
import {CreateOrder} from "../../models/order/create-order.interface";
import {OrderService} from "../../services/order-service";

@Component({
    selector: 'app-car-view',
    templateUrl: './car-view.component.html',
    styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {
    private _car!: IdentifiedCar;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private carService: CarService,
                private storageService: StorageService,
                private orderService: OrderService) {
    }
    ngOnInit(): void {
        this.getCarDetails()
    }

    get car(): IdentifiedCar {
        return this._car
    }

    back() {
        this.router.navigate(['catalogue'])
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

  public makeOrder() {
      const order: CreateOrder = {
          userId: this.storageService.getUserId(),
          carId: this._car.id
      }

      this.orderService.createOrder(order).subscribe(
        response => {
            this.router.navigate(['catalogue']);
        }
      )
  }
}
