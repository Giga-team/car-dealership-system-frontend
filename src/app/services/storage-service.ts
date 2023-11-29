import { Injectable } from '@angular/core';

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

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        console.log(user);
        if (user) {
            const userData = JSON.parse(user);

            console.log(userData);

            if (userData && userData.body && userData.body.userRole) {
                console.log(userData.body);
                console.log(userData.body.userRole);
                return userData.body.userRole;
            }
        }

        return null;
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(USER_KEY);
        if (user) {
            return true;
        }

        return false;
    }
}