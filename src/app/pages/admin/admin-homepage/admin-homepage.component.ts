import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from "../../../services/car-service";
import {IdentifiedCar} from "../../../models/car/identified-car.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map, mergeMap, Subscription} from "rxjs";
import {RsqlOperators} from "../../../services/rsql/rsql-operators";
import {FieldOperatorPair} from "../../../services/rsql/field-operator-pair";


@Component({
    selector: 'app-admin-homepage',
    templateUrl: './admin-homepage.component.html',
    styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit, OnDestroy {
    private _cars: IdentifiedCar[] = [];
    private carsSubscription: Subscription | undefined;
    private readonly operatorsForFilter = new Map<string, FieldOperatorPair>([
        ['id', new FieldOperatorPair('id', RsqlOperators.EQUALS)],
        ['brand', new FieldOperatorPair('brand', RsqlOperators.EQUALS)],
        ['model', new FieldOperatorPair('model', RsqlOperators.EQUALS)],
        ['engineCapacityLowerBound', new FieldOperatorPair('engineCapacity', RsqlOperators.GREATER_THAN_OR_EQUAL)],
        ['engineCapacityUpperBound', new FieldOperatorPair('engineCapacity', RsqlOperators.LESS_THAN_OR_EQUAL)],
        ['powerLowerBound', new FieldOperatorPair('power', RsqlOperators.GREATER_THAN_OR_EQUAL)],
        ['powerUpperBound', new FieldOperatorPair('power', RsqlOperators.LESS_THAN_OR_EQUAL)],
        ['numberOfSeats', new FieldOperatorPair('numberOfSeats', RsqlOperators.EQUALS)],
        ['gearBox', new FieldOperatorPair('gearBox', RsqlOperators.EQUALS)],
        ['priceLowerBound', new FieldOperatorPair('price', RsqlOperators.GREATER_THAN_OR_EQUAL)],
        ['priceUpperBound', new FieldOperatorPair('price', RsqlOperators.LESS_THAN_OR_EQUAL)],
        ['article', new FieldOperatorPair('article', RsqlOperators.LESS_THAN_OR_EQUAL)]
    ]);
    private carsCount!: number;
    private pagesCount!: number;
    private limit: number = 4;

    constructor(private readonly carService: CarService,
                private readonly router: Router,
                private readonly route: ActivatedRoute) {}

    ngOnInit(): void {
        this.initCarsPage();
    }

    private initCarsPage(): void {
        this.carsSubscription = this.route.queryParams.pipe(
            map((params: Params) => {
                return [
                    params['query'] ? params['query'] : '',
                    params['page'] ? params['page'] : 0
                ];
            }),
            mergeMap(([query, page]) => {
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

    get cars(): IdentifiedCar[] {
        return this._cars;
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

}
