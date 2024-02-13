import { Routes } from "@angular/router";
import { HomeComponent } from "./layout/home/home.component";
import { LoginComponent } from "./layout/login/login.component";
import { SignUpComponent } from "./layout/sign-up/sign-up.component";
import { BasketComponent } from "./layout/basket/basket.component";
import { ExploreComponent } from "./layout/explore/explore.component";
import { LandingComponent } from "./layout/landing/landing.component";
import { OrderComponent } from "./layout/order/order.component";
import { ProfilComponent } from "./layout/profil/profil.component";
import { SettingComponent } from "./layout/setting/setting.component";
import { BasketFormComponent } from "./layout/basket-form/basket-form.component";

export const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "home", component: HomeComponent },
  { path: "basket", component: BasketComponent },
  { path: "explore", component: ExploreComponent },
  { path: "order", component: OrderComponent },
  { path: "profil", component: ProfilComponent },
  { path: "setting", component: SettingComponent },
  { path: "signup", component: SignUpComponent },
  { path: "login", component: LoginComponent },
  { path: "basket-form", component: BasketFormComponent },
  { path: "**", redirectTo: "" },
];
