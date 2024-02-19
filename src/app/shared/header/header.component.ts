import { Component, OnInit, inject } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { UserAvatarComponent } from "../user-avatar/user-avatar.component";
import { StorageService } from "../../core/data/storage.service";
import { AuthenticationService } from "../../core/services/authentication.service";
import { initFlowbite } from "flowbite";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, UserAvatarComponent, ButtonComponent],
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  public storage = inject(StorageService);
  public authentication = inject(AuthenticationService);
  public router = inject(Router);
  links = [
    { label: "Explore", path: "/explore" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  constructor() {}

  ngOnInit() {
    initFlowbite();
  }

  handleSignOut() {
    if (confirm("Are you sure you want to sign out?")) {
      this.authentication.signOut();
      this.router.navigate(["/login"]);
    }
  }
  navigateToBasketForm() {
    this.router.navigate(["/basket-form"]);
  }
  navigateToProfile() {
    this.router.navigate(["/profil"]);
  }
}
