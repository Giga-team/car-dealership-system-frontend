import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {Car} from "../models/car/car.interface";
import {IdentifiedCar} from "../models/car/identified-car.interface";
import {ApiResponse} from "../models/api-response.interface";

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private carUrl = "http://localhost:8080/v1/car-dealership-system-api"

    constructor(private http: HttpClient) {}

    public getCar(carId: number): Observable<ApiResponse<IdentifiedCar>> {
        return this.http.get<ApiResponse<IdentifiedCar>>(`${this.carUrl}/cars/${carId}`, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<ApiResponse<IdentifiedCar>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Car retrieved successfully' : 'Failed to retrieve'
                    };
                }),
                catchError(this.handleHttpError)
            );
    }

    public createCar(car: Car): Observable<ApiResponse<IdentifiedCar>> {
        return this.http.post<ApiResponse<IdentifiedCar>>(`${this.carUrl}/cars`, car, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<ApiResponse<IdentifiedCar>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Car created successfully' : 'Failed to create car'
                    };
                }),
                catchError(this.handleHttpError)
            )
    }

<<<<<<< Updated upstream
    public updateCar(carId: number, car: IdentifiedCar): Observable<ApiResponse<IdentifiedCar>> {
        return this.http.put<ApiResponse<IdentifiedCar>>(`${this.carUrl}/cars/${carId}`, car, { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<IdentifiedCar>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Car updated successfully' : 'Failed to update car'
                    };
                }),
                catchError(this.handleHttpError)
            )
    }
=======
   //public updateCar(): Observable<ApiResponse<IdentifiedCar>> {
        // return this.http.put<IdentifiedCar>(`${this.carUrl}/cars/${carId}`, car, { observe: 'response'})
        //     .pipe(
        //         map((response: HttpResponse<IdentifiedCar>) => {
        //             return {
        //                 body: response.body || null,
        //                 responseCode: response.status,
        //                 message: response.ok ? 'Car updated successfully' : 'Failed to update car'
        //             };
        //         }),
        //         catchError(this.handleHttpError)
        //     )
   // }
>>>>>>> Stashed changes

    public getCarsPage(query: string ='',page: number = 0, limit: number = 20): Observable<ApiResponse<IdentifiedCar[]>> {
        return this.http.get<ApiResponse<IdentifiedCar[]>>(
            `${this.carUrl}/cars/page?query=${query}&page=${page}&limit=${limit}`,
            { observe: 'response' })
            .pipe(
                map((response: HttpResponse<ApiResponse<IdentifiedCar[]>>) => {
                    return {
                        body: response.body?.body??[],
                        responseCode: response.status,
                        message: response.ok ? 'Car page retrieved successfully' :
                                               'Failed to retrieve car page'
                    };
                }),
                catchError(this.handleHttpError)
            )
    }

    public deleteCar(carId: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.carUrl}/cars/${carId}`, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<ApiResponse<void>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Car deleted successfully' : 'Failed to delete car'
                    }
                }),
                catchError(this.handleHttpError)
            )
    }

    private handleHttpError(error: HttpErrorResponse): Observable<never> {
        console.error('HTTP error:', error);
        return throwError(() => 'Something went wrong. Please try again.');
    }
}