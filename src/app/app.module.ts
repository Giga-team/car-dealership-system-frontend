import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app.routing.module";
import { LoginComponent } from './pages/login/login.component';
import { AdminHomepageComponent } from './pages/admin/admin-homepage/admin-homepage.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserCabinetComponent } from './pages/user-cabinet/user-cabinet.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { CarEditComponent } from './pages/car-edit/car-edit.component';
import {UsersComponent} from "./pages/users/users.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomepageComponent,
    RegistrationComponent,
    UserCabinetComponent,
    UsersComponent,
    AboutComponent,
    HelpComponent,
    CarEditComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
