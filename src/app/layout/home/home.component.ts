import { Component } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {}
