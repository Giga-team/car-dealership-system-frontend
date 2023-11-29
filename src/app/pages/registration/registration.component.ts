import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service";
import {StorageService} from "../../services/storage-service";
import {Router} from "@angular/router";
import {SignUpUserInterface} from "../../models/user/sign-up-user.interface";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    isRegistered = false;
    registrationData!: SignUpUserInterface;

    private setRegistrationData(): SignUpUserInterface {
        return {name: ``, surname: ``, password: ``, phoneNumber: ``, email: ``}
    }

    ngOnInit() {
        this.registrationData = this.setRegistrationData();
    }

    constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

    onSignUp() {
        console.log('Registration Data:', this.registrationData);

        this.authService.signUp(this.registrationData).subscribe({
            next: data => {
                console.log("OK!");
                this.isRegistered = true;
                this.reloadPage();
            }
        });
    }

    reloadPage(): void {
        this.router.navigate([`/login`]);
    }
}
