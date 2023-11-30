import { Component } from '@angular/core';
import {IdentifiedUser} from "../../models/user/identified-user.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user-service";
import {ApiResponse} from "../../models/api-response.interface";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {
  private _user!: IdentifiedUser;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }
  ngOnInit(): void {
    this.getUserDetails()
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
