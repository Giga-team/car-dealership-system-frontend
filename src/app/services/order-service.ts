import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderUrl = "http://localhost:8080/v1/car-dealership-system-api";
    constructor(private http: HttpClient) {}


}