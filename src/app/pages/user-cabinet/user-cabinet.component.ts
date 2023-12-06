import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdentifiedUser} from "../../models/user/identified-user.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {map, mergeMap, Subscription} from "rxjs";
import {StorageService} from "../../services/storage-service";
import {OrderService} from "../../services/order-service";
import {FullOrder} from "../../models/order/fullorder.interface";
import {calculatePageCount} from "../../services/pagination/pagination";
import {Page} from "../../models/page/page-interface";

@Component({
    selector: 'app-user-cabinet',
    templateUrl: './user-cabinet.component.html',
    styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit, OnDestroy{
    private _user!: IdentifiedUser;
    private _userOrders: FullOrder[] | null = [];
    private userSubscription: Subscription | undefined;
    private _userCabinetPage!: Page;
    private readonly DEFAULT_QUERY = "userId=="
    constructor(private router: Router,
                private route: ActivatedRoute,
                private orderService: OrderService,
                private storageService: StorageService) {
    }

    ngOnInit() {
        this.getUser();
        this.getUserOrders();
        this.initPageFields();
    }

    get user(){
        return this._user
    }

    get orders(){
        return this._userOrders
    }

    private getUser() {
        this._user = this.storageService.getUser()
    }

    viewOrder(orderId: number) {
        this.router.navigate(['user-order', orderId])
    }

    private initPageFields(): void{
        this._userCabinetPage = {
            recordsCount: 0,
            pagesCount: 0,
            currentPage: 0,
            limit: 8
        }
    }

    private getUserOrders(){
        this.userSubscription = this.route.queryParams.pipe(
            map((params: Params) => {
                return [
                    (params['query'] ? `${params['query']};` : '') + `${this.DEFAULT_QUERY}` + `${this._user.id}`,
                    params['page'] ? params['page'] : 0
                ];
            }),
            mergeMap(([query, page]) => {
                return this.orderService.getOrderPage(query)
                    .pipe(
                        map((response) => {
                            return [query, page, response.body]
                        })
                    )
            }),
            mergeMap(([query, page, count]) => {
                this._userCabinetPage.recordsCount = count;
                this._userCabinetPage.currentPage = parseInt(page, 10);
                this._userCabinetPage.pagesCount = calculatePageCount(count, this._userCabinetPage.limit);
                return this.orderService.getOrderPage(query, page, this._userCabinetPage.limit)
            })
        )
            .subscribe((response) => {
                if (response.body !== null) {
                    this._userOrders = response.body;
                }
            })
    }

    ngOnDestroy() {
        if(this.userSubscription){
            this.userSubscription.unsubscribe()
        }
    }

    public logout() {
        this.storageService.clean();
        this.reloadPage();
    }


    reloadPage(): void {
        this.router.navigate([`/login`]);
    }
}
