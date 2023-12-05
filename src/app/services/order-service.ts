import {Injectable} from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ApiResponse} from "../models/api-response.interface";
import {FullOrder} from "../models/order/fullorder.interface";
import {CreateOrder} from "../models/order/create-order.interface";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private userUrl = "http://localhost:8080/v1/car-dealership-system-api";
    constructor(private http: HttpClient) {}

    public getOrder(orderId: number):Observable<ApiResponse<FullOrder>>{
        return this.http.get<ApiResponse<FullOrder>>(`${this.userUrl}/orders/${orderId}`, { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<FullOrder>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'User retrieved successfully' : 'Failed to retrieve'
                    };
                }),
                catchError(this.handleHttpError)
            );
    }

    public createOrder(order: CreateOrder): Observable<ApiResponse<number>>{

        return this.http.post<ApiResponse<number>>(`${this.userUrl}/orders`, order, { observe: 'response' })
            .pipe(
                map((response: HttpResponse<ApiResponse<number>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Order created successfully' : 'Failed to create order'
                    };
                }),
                catchError(this.handleHttpError)
            );
    }

    public updateOrder(orderId: number, status: string): Observable<ApiResponse<void>>{
        return this.http.put<ApiResponse<void>>(`${this.userUrl}/orders/${orderId}/status`,{status: status}, { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<void>>) => {
                    return {
                        body: null,
                        responseCode: response.status,
                        message: response.ok ? 'Order updated successfully' : 'Failed to update order'
                    };
                }),
                catchError(this.handleHttpError)
            );
    }

    public getOrderPage(query: string = '', page: number = 0, limit: number = 20): Observable<ApiResponse<FullOrder[]>> {
        return this.http.get<ApiResponse<FullOrder[]>>(
            `${this.userUrl}/orders/page?query=${query}&page=${page}&limit=${limit}`,
            { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<FullOrder[]>>) => {
                    return {
                        body: response.body?.body??[],
                        responseCode: response.status,
                        message: response.ok ? 'User page retrieved successfully' :
                                               'Failed to retrieve user page'
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