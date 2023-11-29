import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SignUpUserInterface} from "../models/user/sign-up-user.interface";

const AUTH_API = 'http://localhost:8080/v1/car-dealership-system-api';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post(
          AUTH_API + '/auth/login',
          {
              email,
              password,
          },
          httpOptions
        );
    }

    signUp(request: SignUpUserInterface): Observable<any> {
        return this.http.post(AUTH_API + '/auth/sign-up', request, httpOptions);
    }
}