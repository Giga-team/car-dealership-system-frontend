import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdentifiedUser} from "../../models/user/identified-user.interface";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-user-cabinet',
    templateUrl: './user-cabinet.component.html',
    styleUrls: ['./user-cabinet.component.css']
})
export class UserCabinetComponent implements OnInit, OnDestroy{
    private _user!: IdentifiedUser;
    private userSubscription: Subscription | undefined

    constructor(private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        this.getUser(this._user.id);
    }

    public get user(){
        return this._user
    }

    private getUser(userId: number) {
        this.userSubscription = this.userService.getUser(userId)
            .subscribe(
                (response) => {
                    if (response.body !== null) {
                        this._user = response.body
                    }
                },
                (error) => {
                    console.error('Error fetching users:',error);
                }
            )
    }

    viewOrder() {

    }

    ngOnDestroy() {
        if(this.userSubscription){
            this.userSubscription.unsubscribe()
        }
    }
}
