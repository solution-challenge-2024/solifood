import { Routes } from "@angular/router";
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from "@angular/fire/auth-guard";

import { HomeComponent } from "./layout/home/home.component";
import { LoginComponent } from "./layout/login/login.component";
import { SignUpComponent } from "./layout/sign-up/sign-up.component";
import { ExploreComponent } from "./layout/explore/explore.component";
import { LandingComponent } from "./layout/landing/landing.component";
import { OrderComponent } from "./layout/order/order.component";
import { ProfilComponent } from "./layout/profil/profil.component";
import { SettingComponent } from "./layout/setting/setting.component";
import { BasketFormComponent } from "./layout/basket-form/basket-form.component";
import { MainComponent } from "./shared/main/main.component";
import { BasketComponent } from "./layout/basket/basket.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
  },
  {
    path: "",
    component: MainComponent,
    ...canActivate(() => redirectUnauthorizedTo(["/login"])),
    children: [
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "explore",
        component: ExploreComponent,
      },
      {
        path: "explore/:id",
        component: BasketComponent,
      },
      {
        path: "order",
        component: OrderComponent,
      },
      {
        path: "profil",
        component: ProfilComponent,
      },
      {
        path: "setting",
        component: SettingComponent,
      },
      {
        path: "basket-form",
        component: BasketFormComponent,
      },
    ],
  },
  {
    path: "signup",
    component: SignUpComponent,
    ...canActivate(() => redirectLoggedInTo(["/explore"])),
  },
  {
    path: "login",
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo(["/explore"])),
  },
  { path: "**", redirectTo: "" },
];
