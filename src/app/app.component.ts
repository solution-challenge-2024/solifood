import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "solution_challenge";

  ngOnInit() {
    initFlowbite();
  }
}
