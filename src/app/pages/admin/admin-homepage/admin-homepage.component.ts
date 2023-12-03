import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from "../../../services/car-service";
import {IdentifiedCar} from "../../../models/car/identified-car.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, mergeMap, Subscription} from "rxjs";
import {RsqlOperators} from "../../../services/rsql/rsql-operators";
import {FieldOperatorPair} from "../../../services/rsql/field-operator-pair";
import {PagerService} from "../../../services/pager-service";
import {CarFilterForm} from "../../../models/car/car-filter-form.interface";
import {RsqlQueryBuilder} from "../../../services/rsql/rsql-query-builder";
import {ExactNumberOperatorPair} from "../../../services/rsql/impl/exact-number-operator-pair";
import {StringSearchOperatorPair} from "../../../services/rsql/impl/string-search-operator-pair";
import {LowerBoundRangeOperatorPair} from "../../../services/rsql/impl/lower-bound-range-operator-pair";
import {UpperBoundRangeOperatorPair} from "../../../services/rsql/impl/upper-bound-range-operator-pair";
import {ExactStringOperatorPair} from "../../../services/rsql/impl/exact-string-operator-pair";


@Component({
    selector: 'app-admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit, OnDestroy {
    private _cars: IdentifiedCar[] = [];
    private carsSubscription: Subscription | undefined;
    private readonly operatorsForFilter = new Map<string, FieldOperatorPair<any>>([
        ['id', new ExactNumberOperatorPair('id')],
        ['brand', new StringSearchOperatorPair('brand')],
        ['model', new StringSearchOperatorPair('model')],
        ['engineCapacityLowerBound', new LowerBoundRangeOperatorPair('engineCapacity')],
        ['engineCapacityUpperBound', new UpperBoundRangeOperatorPair('engineCapacity')],
        ['powerLowerBound', new LowerBoundRangeOperatorPair('power')],
        ['powerUpperBound', new UpperBoundRangeOperatorPair('power')],
        ['numberOfSeats', new ExactNumberOperatorPair('numberOfSeats')],
        ['gearBox', new ExactStringOperatorPair('gearBox')],
        ['priceLowerBound', new LowerBoundRangeOperatorPair('price')],
        ['priceUpperBound', new UpperBoundRangeOperatorPair('price')],
        ['article', new StringSearchOperatorPair('article')]
    ]);
    private carsCount!: number;
    private pagesCount!: number;
    private limit: number = 8;
    private _carFilter!: CarFilterForm;
    private readonly DEFAULT_QUERY = "status==AVAILABLE";


    constructor(private readonly carService: CarService,
                private readonly router: Router,
                private readonly route: ActivatedRoute) {}

    ngOnInit(): void {
        this.initFilterFields();
        this.initCarsPage();
    }

    get cars(): IdentifiedCar[] {
        return this._cars;
    }

    get carFilter(): CarFilterForm {
        return this._carFilter
    }

    get numberOfPages(): number {
        return this.pagesCount
    }

    search() {
        const queryBuilder: RsqlQueryBuilder = new RsqlQueryBuilder();

        for (const [key, value] of Object.entries(this._carFilter)) {
            queryBuilder.appendWithAndOperator(<string>this.operatorsForFilter.get(key)?.toQuery(value));
        }

        const query: string = queryBuilder.getFinalQuery();
        console.log("Final query: ", query)

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

    reset() {
        this.router.navigate(['']);
    }

    createCar() {
        this.router.navigate(['car-create'])
    }

    deleteCar(carId: number): void {
        this.carsSubscription = this.carService.deleteCar(carId)
        .subscribe(
            () => {
                this.initCarsPage()
            },
            (error) => {
                console.error(`Failed to delete car with ID ${carId}:`, error)
            }
        )
    }

    editCar(carId: number): void {
        this.router.navigate(['/car-edit', carId])
    }

    viewCar(carId: number): void {
        this.router.navigate(['/car-view', carId])
    }

    ngOnDestroy() {
        if (this.carsSubscription) {
            this.carsSubscription.unsubscribe()
        }
    }

    private initFilterFields(): void {
        this._carFilter = {
            article: '',
            brand: '',
            model: '',
            engineCapacityLowerBound: 0,
            engineCapacityUpperBound: 0,
            powerLowerBound: 0,
            powerUpperBound: 0,
            numberOfSeats: 0,
            gearBox: '',
            priceLowerBound: 0,
            priceUpperBound: 0
        };
    }

    private initCarsPage(): void {
        this.carsSubscription = this.route.queryParams.pipe(
            map((params: Params) => {
                return [
                    (params['query'] ? `${params['query']};` : '') + this.DEFAULT_QUERY,
                    params['page'] ? params['page'] : 0
                ];
            }),
            mergeMap(([query, page]) => {
                console.log("Query onInit: ",query)
                return this.carService.getCarsCount(query)
                    .pipe(
                        map((response) => {
                            return [query, page, response.body]
                        })
                    )
            }),
            mergeMap(([query, page, count]) => {
                this.carsCount = count;
                this.pagesCount = Math.trunc(count / this.limit) + 1;
                return this.carService.getCarsPage(query, page, this.limit)
            })
        )
            .subscribe((response) => {
                console.log(`PAGES COUNT: ${this.pagesCount}`);
                console.log(`PAGE SIZE: ${response.body?.length}`);

                if (response.body !== null) {
                    this._cars = response.body;
                }
            })
    }

}
