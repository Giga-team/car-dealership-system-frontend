import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {OrderRequest} from "../models/order/order-request.interface";
import {catchError, map, Observable, throwError} from "rxjs";
import {ApiResponse} from "../models/api-response.interface";
import {IdentifiedUser} from "../models/user/identified-user.interface";
import {FullOrder} from "../models/order/full-order.interface";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderUrl = "http://localhost:8080/v1/car-dealership-system-api";
    constructor(private http: HttpClient) {}

    public createOrder(requestOrder: OrderRequest): Observable<ApiResponse<number>> {
        return this.http.post<ApiResponse<number>>(`${this.orderUrl}/orders`, requestOrder, { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<number>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Order created successfully' : 'Failed to create order'
                    };
                }),catchError(this.handleHttpError)
            );
    }

    public getOrder(orderId: number): Observable<ApiResponse<FullOrder>> {
        return this.http.get<ApiResponse<FullOrder>>(`${this.orderUrl}/orders/${orderId}`, { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<FullOrder>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'Order retrieved successfully' : 'Failed to retrieve order'
                    };
                }),catchError(this.handleHttpError)
            );
    }

    public getOrderPage(query: string = '', page: number = 0, limit: number = 20): Observable<ApiResponse<FullOrder[]>> {
        return this.http.get<ApiResponse<FullOrder[]>>(
            `${this.orderUrl}/orders/page?query=${query}&page=${page}&limit=${limit}`,
            { observe: 'response'})
            .pipe(
                map((response: HttpResponse<ApiResponse<FullOrder[]>>) => {
                    return {
                        body: response.body?.body??null,
                        responseCode: response.status,
                        message: response.ok ? 'User created successfully' : 'Failed to create user'
                    };
                }),catchError(this.handleHttpError)
            );
    }

    private handleHttpError(error: HttpErrorResponse): Observable<never> {
        console.error('HTTP error:', error);
        return throwError(() => 'Something went wrong. Please try again.');
    }
}