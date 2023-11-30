import { Component } from '@angular/core';
import {IdentifiedUser} from "../../models/user/identified-user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {ApiResponse} from "../../models/api-response.interface";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
    private _user!: IdentifiedUser;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private userService: UserService) {
    }
    ngOnInit(): void {
        this.getUserDetails()
    }

    updateUser() {
        this.userService.updateUser(this._user.id, this.user).subscribe(
          response => {
              this.router.navigate(['users']);
          }
        )
    }

    get user(): IdentifiedUser {
        return this._user
    }

    back() {
        this.router.navigate(['users'])
    }

    private getUserDetails(): void {
        this.activatedRoute.params.subscribe(params => {
            this.userService.getUser(Number(params['id'])).subscribe(
              (response: ApiResponse<IdentifiedUser>) => {
                  console.log(typeof response)
                  if (response && response.body) {
                      this._user = response.body;
                      console.log(JSON.stringify(this._user))
                  } else {
                      console.error(`User with ID: ${this.user?.id} not found`);
                  }
              }
            )
        })
    }
}
