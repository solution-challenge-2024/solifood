import { Component } from "@angular/core";
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
  links = [
    { path: "/explore", label: "Explore" },
    { path: "/about", label: "About" },
    { path: "/blog", label: "Blog" },
    { path: "/team", label: "Team" },
    { path: "/contact", label: "Contact" },
  ];

  user = this.storage.user;
  constructor(private storage: StorageService) {}
}
