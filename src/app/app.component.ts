import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "solution_challenge";

  ngOnInit() {
    initFlowbite();
  }
}
