import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { initFlowbite } from "flowbite";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { Auth } from "@angular/fire/auth";
import { StorageService } from "./core/data/storage.service";
import { AuthenticationService } from "./core/services/authentication.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "solution_challenge";

  constructor(
    private auth: Auth,
    private authentication: AuthenticationService,
    private storage: StorageService,
  ) {}

  ngOnInit() {
    initFlowbite();

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.authentication.getUser(user.uid).subscribe((userData) => {
          console.log(userData);
          this.storage.user = userData;
        });
        return;
      }

      this.storage.user = null;
    });
  }
}
