import {Component, Input, OnInit} from '@angular/core';
import {IdentifiedCar} from "../../models/car/identified-car.interface";
import {ApiResponse} from "../../models/api-response.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order-service";
import {FullOrder} from "../../models/order/fullorder.interface";

@Component({
    selector: 'app-order-view',
    templateUrl: './order-view.component.html',
    styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
    private _order!: FullOrder;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private orderService: OrderService) {
    }

    ngOnInit(): void {
        this.getOrderDetails()
    }

    get order(): FullOrder {
        return this._order
    }

    back() {
        this.router.navigate(['orders'])
    }

    private getOrderDetails(): void {
        this.activatedRoute.params.subscribe(params => {
            this.orderService.getOrder(Number(params['id'])).subscribe(
              (response: ApiResponse<FullOrder>) => {
                  console.log(typeof response)
                  if (response && response.body) {
                      this._order = response.body;
                      console.log(JSON.stringify(this._order))
                  } else {
                      console.error(`Order with ID: ${this.order?.id} not found`)
                  }
              }
            )
        })
    }

}
