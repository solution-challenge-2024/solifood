import { Component } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from "@angular/common";
import { Collapse, initTWE } from "tw-elements";
import { RouterLink } from "@angular/router";
@Component({
  selector: "app-home",
  standalone: true,
  imports: [ButtonComponent, CommonModule, RouterLink],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  ngOnInit(): void {
    initTWE({ Collapse });
  }
}
