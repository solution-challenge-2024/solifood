import { Component, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { UserAvatarComponent } from "../user-avatar/user-avatar.component";
import { StorageService } from "../../core/data/storage.service";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, UserAvatarComponent],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  public storage = inject(StorageService);
  public authentication = inject(AuthenticationService);
  public router = inject(Router);
  links = [
    { path: "/home", label: "Home" },
    { path: "/basket", label: "Basket" },
    { path: "/explore", label: "Explore" },
    { path: "/order", label: "Order" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  constructor() {}

  handleSignOut() {
    if (confirm("Are you sure you want to sign out?")) {
      this.authentication.signOut();
      this.router.navigate(["/login"]);
    }
  }
}
