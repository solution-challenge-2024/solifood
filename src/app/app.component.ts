import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "solution_challenge";

  ngOnInit() {
    initFlowbite();
  }
}
