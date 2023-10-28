import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./core/components/header/header.component";
import {BodyComponent} from "./core/components/body/body.component";
import {FooterComponent} from "./core/components/footer/footer.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: "full"
  },
  {
    path: 'home',
    title: "Homepage",
    component: BodyComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
