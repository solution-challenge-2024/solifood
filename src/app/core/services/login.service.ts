import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor() {}

  public login(user: User) {
    //logic

    return;
  }

  public logout() {
    //logic
  }
}
