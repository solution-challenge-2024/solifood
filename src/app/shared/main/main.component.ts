import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./main.component.html",
})
export class MainComponent {}
