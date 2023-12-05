import { Injectable } from '@angular/core';
import {IdentifiedUser} from "../models/user/identified-user.interface";

const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() {}

    clean(): void {
        window.sessionStorage.clear();
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    public getUserRole(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            const userData = JSON.parse(user);
            if (userData && userData.body && userData.body.userRole) {
                return userData.body.userRole;
            }
        }

        return null;
    }

    public getUserId(): any {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
        const userData = JSON.parse(user);
        if (userData && userData.body && userData.body.id) {
          return userData.body.id;
        }
      }
    }


    // @ts-ignore
    public getUser(): IdentifiedUser {
        const user = window.sessionStorage.getItem(USER_KEY);
        console.log(user);
        if (user) {
            const userData = JSON.parse(user);

            console.log(userData);

            if (userData && userData.body) {
                return {
                    id: userData.body.id,
                    name: userData.body.name,
                    surname: userData.body.surname,
                    phoneNumber: userData.body.phoneNumber,
                    email: userData.body.email,
                    role: userData.body.userRole
                };
            }
        }
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }

        return false;
    }
}