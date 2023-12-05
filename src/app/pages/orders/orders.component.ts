import {Component, OnDestroy, OnInit} from '@angular/core';
import {FullOrder} from "../../models/order/fullorder.interface";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {OrderService} from "../../services/order-service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{
    private _orders: FullOrder[] = []
    private orderSubscription: Subscription | undefined

    constructor(private userService: OrderService,
                private router: Router) {
    }

    get orders(): FullOrder[]{
      this._orders = this._orders.map((order) => {
        const timestamp = order.creationDate;
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString(); // Adjust this based on your desired format
        order.creationDate = formattedDate;

        return order;
      });

      return this._orders
    }

    private getOrders() {
        this.orderSubscription = this.userService.getOrderPage('', 0, 9)
          .subscribe(
            (response) => {
                if (response.body !== null) {
                    this._orders = response.body
                }
            },
            (error) => {
                console.error('Error fetching users:',error);
            }
          )
    }

    ngOnInit() {
        this.getOrders();
    }

    public editOrder(orderId: number): void {
        this.router.navigate(['/order-edit', orderId])
    }

    viewOrder(orderId: number): void {
        this.router.navigate(['/order-view', orderId])
    }

    ngOnDestroy() {
        if (this.orderSubscription) {
            this.orderSubscription.unsubscribe()
        }
    }
}
