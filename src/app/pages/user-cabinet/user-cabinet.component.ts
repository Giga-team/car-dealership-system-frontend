import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdentifiedUser} from "../../models/user/identified-user.interface";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {Subscription} from "rxjs";
import {StorageService} from "../../services/storage-service";

@Component({
    selector: 'app-user-cabinet',
    templateUrl: './user-cabinet.component.html',
    styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit, OnDestroy{
    private _user!: IdentifiedUser;
    private userSubscription: Subscription | undefined

    constructor(private router: Router,
                private userService: UserService,
                private storageService: StorageService) {
    }

    ngOnInit() {
        this.getUser();
    }

    public get user(){
        return this._user
    }

    private getUser() {
        this._user = this.storageService.getUser()
    }

    viewOrder() {

    }

    ngOnDestroy() {
        if(this.userSubscription){
            this.userSubscription.unsubscribe()
        }
    }

    public logout() {
        this.storageService.clean();
        this.reloadPage();
    }


    reloadPage(): void {
        this.router.navigate([`/login`]);
    }
}
