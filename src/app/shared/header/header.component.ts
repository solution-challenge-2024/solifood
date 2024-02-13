import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { UserAvatarComponent } from "../user-avatar/user-avatar.component";
import { StorageService } from "../../core/data/storage.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, UserAvatarComponent],
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  public storage = inject(StorageService);
  links = [
    { path: "/home", label: "Home" },
    { path: "/basket", label: "Basket" },
    { path: "/explore", label: "Explore" },
    { path: "/order", label: "Order" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  constructor() {}
}
