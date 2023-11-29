import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { StorageService } from '../../services/storage-service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: any = {
        usermail: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    role = '';

    constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

    ngOnInit(): void {
        console.log(this.role);

        if (this.storageService.isLoggedIn()) {
            this.isLoggedIn = true;
            this.role = this.storageService.getUserRole();

            console.log(this.role);

            this.reloadPage();
        }
    }

    onSubmit(): void {
        const { usermail, password } = this.form;

        this.authService.login(usermail, password).subscribe({
            next: data => {
                this.storageService.saveUser(data);

                this.isLoginFailed = false;
                this.isLoggedIn = true;
                this.role = this.storageService.getUserRole();
                this.reloadPage();
            }
            // error: err => {
            //     this.errorMessage = err.error.message;
            //     this.isLoginFailed = true;
            // }
        });
    }

    reloadPage(): void {
        if (this.isLoggedIn) {
            this.router.navigate([`/catalogue`]);
        }
    }
}