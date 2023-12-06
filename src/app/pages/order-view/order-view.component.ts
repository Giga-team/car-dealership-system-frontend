import {Component, Input, OnInit} from '@angular/core';
import {IdentifiedCar} from "../../models/car/identified-car.interface";
import {ApiResponse} from "../../models/api-response.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/order-service";
import {FullOrder} from "../../models/order/fullorder.interface";
import {Location} from "@angular/common";

@Component({
    selector: 'app-order-view',
    templateUrl: './order-view.component.html',
    styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
    private _order!: FullOrder;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private orderService: OrderService,
                private location: Location) {
    }

    ngOnInit(): void {
        this.getOrderDetails()
    }

    get order(): FullOrder {
        const timestamp = this._order.creationDate;
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString(); // Adjust this based on your desired format
        this._order.creationDate = formattedDate;

        return this._order
    }

    back() {
        this.location.back()
    }

    cancel() {
        this.orderService.cancelOrder(this.order.id).subscribe(response => {
                this.router.navigate(['orders']);
            }
        )
    }

    private getOrderDetails(): void {
        this.activatedRoute.params.subscribe(params => {
            this.orderService.getOrder(Number(params['id'])).subscribe(
                (response: ApiResponse<FullOrder>) => {
                    if (response && response.body) {
                        this._order = response.body;
                    } else {
                        console.error(`Order with ID: ${this.order?.id} not found`)
                    }
                }
            )
        })
    }

    public updateOrder() {
        this.orderService.updateOrder(this._order.id, this._order.status).subscribe(
            response => {
                this.router.navigate(['orders']);
            }
        )
    }

}
