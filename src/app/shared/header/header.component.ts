import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink],
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
}
