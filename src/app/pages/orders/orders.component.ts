import {Component, OnDestroy, OnInit} from '@angular/core';
import {FullOrder} from "../../models/order/fullorder.interface";
import {map, mergeMap, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrderService} from "../../services/order-service";
import {FieldOperatorPair} from "../../services/rsql/field-operator-pair";
import {StringSearchOperatorPair} from "../../services/rsql/impl/string-search-operator-pair";
import {ExactStringOperatorPair} from "../../services/rsql/impl/exact-string-operator-pair";
import {Page} from "../../models/page/page-interface";
import {OrderFilterFormInterface} from "../../models/order/order-filter-form.interface";
import {calculatePageCount, generatePagesNumbers} from "../../services/pagination/pagination";
import {
    LowerBoundDateRangeOperatorPair
} from "../../services/rsql/impl/lower-bound-date-range-operator-pair";
import {
    UpperBoundDateRangeOperatorPair
} from "../../services/rsql/impl/upper-bound-date-range-operator-pair";
import {RsqlQueryBuilder} from "../../services/rsql/rsql-query-builder";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy{
    private _orders: FullOrder[] = []
    private orderSubscription: Subscription | undefined
    private readonly operatorsForFilter = new Map<string, FieldOperatorPair<any>>([
        ['name', new StringSearchOperatorPair('name')],
        ['surname', new StringSearchOperatorPair('surname')],
        ['email', new StringSearchOperatorPair('email')],
        ['phoneNumber', new StringSearchOperatorPair('phoneNumber')],
        ['creationDateLowerBound', new LowerBoundDateRangeOperatorPair('creationDate')],
        ['creationDateUpperBound', new UpperBoundDateRangeOperatorPair('creationDate')],
        ['status', new ExactStringOperatorPair('status')]
    ]);
    private _orderPage!: Page;
    private _orderFilter!: OrderFilterFormInterface;
    private readonly DEFAULT_QUERY = '';

    constructor(private orderService: OrderService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    get orders(): FullOrder[]{
      return this._orders.map((order) => {
        const timestamp = order.creationDate;
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString(); // Adjust this based on your desired format
        order.creationDate = formattedDate;

        return order;
      });
    }

    get orderFilter(): OrderFilterFormInterface {
        return this._orderFilter;
    }

    private initOrders() {
        this.orderSubscription = this.route.queryParams.pipe(
            map((params: Params) => {
                return [
                    (params['query'] ? `${params['query']}` : '') + `${this.DEFAULT_QUERY ? ';' + this.DEFAULT_QUERY : ''}`,
                    params['page'] ? params['page'] : 0
                ];
            }),
            mergeMap(([query, page]) => {
                return this.orderService.getOrdersCount(query)
                .pipe(
                    map((response) => {
                        return [query, page, response.body]
                    })
                )
            }),
            mergeMap(([query, page, count]) => {
                this._orderPage.recordsCount = count;
                this._orderPage.currentPage = parseInt(page, 10);
                this._orderPage.pagesCount = calculatePageCount(count, this._orderPage.limit);
                return this.orderService.getOrderPage(query, page, this._orderPage.limit)
            })
        )
        .subscribe((response) => {
            if (response.body !== null) {
                this._orders = response.body;
            }
        })
    }

    ngOnInit() {
        this.initPageFields();
        this.initFilterFields();
        this.initOrders();
    }

    private initPageFields(): void {
        this._orderPage = {
            recordsCount: 0,
            pagesCount: 0,
            currentPage: 0,
            limit: 8
        }
    }

    private initFilterFields(): void {
        this._orderFilter = {
            name: '',
            surname: '',
            email: '',
            phoneNumber: '',
            creationDateLowerBound: new Date(),
            creationDateUpperBound: new Date(),
            status: ''
        };
        console.log("Filter fields: ", this._orderFilter)
        const creationDateLowerBound: Date = this._orderFilter.creationDateLowerBound;
        creationDateLowerBound.setDate(creationDateLowerBound.getDate() - 7); //Hardcode to minus week from now();
        this._orderFilter.creationDateLowerBound = creationDateLowerBound;
    }

    convertUTCDateToLocalDate(date: Date): Date {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return date;
    }

    search() {
        console.log('HELP before', typeof this.orderFilter.creationDateLowerBound);
        console.log('HELP before', this.orderFilter.creationDateLowerBound);
        // this.orderFilter.creationDateLowerBound = new Date(this.orderFilter.creationDateLowerBound);
        // this.orderFilter.creationDateUpperBound = new Date(this.orderFilter.creationDateUpperBound);
        console.log('HELP after', typeof this.orderFilter.creationDateLowerBound);
        console.log('HELP after', this.orderFilter.creationDateLowerBound);
        const queryBuilder: RsqlQueryBuilder = new RsqlQueryBuilder();

        for (const [key, value] of Object.entries(this._orderFilter)) {
            queryBuilder.appendWithAndOperator(<string>this.operatorsForFilter.get(key)?.toQuery(value));
        }
        const query: string = queryBuilder.getFinalQuery();

        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {
                    query: query,
                    page: 0
                }
            }
        )
    }

    fromDatetimeLocal(str: string): Date {
        return new Date(str);
    }

    reset() {
        this.router.navigate(
            ['/orders'],
            {
                relativeTo: this.route,
                queryParams: {
                    page: 0
                }
            }
        ).then(() => window.location.reload())
    }

    generatePagesButtons(): number[] {
        return generatePagesNumbers(this._orderPage.pagesCount);
    }

    selectPage(uiPage: number): void {
        const pageToSend = uiPage - 1;

        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {
                    page: pageToSend
                }
            }
        )
    }

    isActivePage(uiPageNumber: number) {
        return this._orderPage.currentPage === (Number(uiPageNumber) - 1);
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
