import { Component } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: "./not-found.component.html",
})
export class NotFoundComponent {
  goBack() {
    window.history.back();
  }
}
