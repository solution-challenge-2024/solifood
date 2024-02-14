import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterOutlet } from "@angular/router";
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, LoadingComponent],
  templateUrl: "./main.component.html",
})
export class MainComponent {}
