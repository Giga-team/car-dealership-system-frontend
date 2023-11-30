import {Component, OnDestroy, OnInit} from '@angular/core';
import {IdentifiedUser} from "../../models/user/identified-user.interface";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{
    private _users: IdentifiedUser[] = []
    private userSubscription: Subscription | undefined

    constructor(private userService: UserService,
                private router: Router) {
    }

    get users(): IdentifiedUser[]{
        return this._users
    }

    public deleteUser(userId: number){
        this.userSubscription = this.userService.deleteUser(userId)
            .subscribe(
                () => {
                    this.getUsers()
                },
                (error) => {
                    console.error(`Failed to delete user with ID ${userId}:`, error)
                }
            )
    }

    private getUsers() {
        this.userSubscription = this.userService.getUserPage('', 0, 9)
            .subscribe(
                (response) => {
                    if (response.body !== null) {
                        this._users = response.body
                    }
                },
                (error) => {
                    console.error('Error fetching users:',error);
                }
            )
    }

    ngOnInit() {
        this.getUsers();
    }

    public editUser(userId: number): void {
        this.router.navigate(['/user-edit', userId])
    }

    viewUser(userId: number): void {
        this.router.navigate(['/user-view', userId])
    }

    ngOnDestroy() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe()
        }
    }
}
