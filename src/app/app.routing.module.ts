import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminHomepageComponent} from "./pages/admin/admin-homepage/admin-homepage.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AboutComponent} from "./pages/about/about.component";
import {HelpComponent} from "./pages/help/help.component";
import {CarEditComponent} from "./pages/car-edit/car-edit.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'login'
  },
  {
    path: 'catalogue',
    title: 'Catalogue',
    component: AdminHomepageComponent
  },
  {
    path: 'login',
    title: 'Login',
    component: LoginComponent
  },
  {
    path: 'registration',
    title: 'Registration',
    component: RegistrationComponent
  },
  {
      path: 'about',
      title: 'About',
      component: AboutComponent
  },
  {
    path: 'help',
    title: 'Help',
    component: HelpComponent
  },
  {
    path: 'car-edit',
    title: 'Car-Edit',
    component: CarEditComponent
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
