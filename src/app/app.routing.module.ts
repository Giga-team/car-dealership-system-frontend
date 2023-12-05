import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdminHomepageComponent} from "./pages/admin/admin-homepage/admin-homepage.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {AboutComponent} from "./pages/about/about.component";
import {HelpComponent} from "./pages/help/help.component";
import {CarEditComponent} from "./pages/car-edit/car-edit.component";
import {UsersComponent} from "./pages/users/users.component";
import {CarViewComponent} from "./pages/car-view/car-view.component";
import {OrdersComponent} from "./pages/orders/orders.component";
import {UserCabinetComponent} from "./pages/user-cabinet/user-cabinet.component";
import {UserViewComponent} from "./pages/user-view/user-view.component";
import {UserEditComponent} from "./pages/user-edit/user-edit.component";
import {CarCreateComponent} from "./pages/car-create/car-create.component";
import {OrderViewComponent} from "./pages/order-view/order-view.component";

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
    path: 'user-cabinet',
    title: 'Cabinet',
    component: UserCabinetComponent
  },
  {
    path: 'car-create',
    title: 'New car',
    component: CarCreateComponent
  },
  {
    path: 'car-edit/:id',
    title: 'Car-Edit',
    component: CarEditComponent
  },
  {
    path: 'car-view/:id',
    title: 'Car-View',
    component: CarViewComponent
  },
  {
    path: 'users',
    title: 'Users',
    component: UsersComponent
  },
  {
    path: 'orders',
    title: 'Orders',
    component: OrdersComponent
  },
  {
    path: 'user-view/:id',
    title: 'User-View',
    component: UserViewComponent
  },
  {
    path: 'user-edit/:id',
    title: 'User-Edit',
    component: UserEditComponent
  },
  {
      path: 'order-view/:id',
      title: 'Order-View',
      component: OrderViewComponent
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
