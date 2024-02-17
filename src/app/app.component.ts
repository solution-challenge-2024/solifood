import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Auth } from "@angular/fire/auth";
import { StorageService } from "./core/data/storage.service";
import { AuthenticationService } from "./core/services/authentication.service";
import { Subscription } from "rxjs";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { LoadingComponent } from "./shared/loading/loading.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
  ],
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit, OnDestroy {
  auth$!: Subscription;
  constructor() {}

  private authentication = inject(AuthenticationService);
  private auth = inject(Auth);
  private storage = inject(StorageService);
  private router = inject(Router);

  ngOnInit() {
    // Load user data
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.auth$ = this.authentication
          .getUser(user.uid)
          .subscribe((userData) => {
            this.storage.user = userData;
          });
        return;
      }
      this.storage.user = undefined;
    });

    // Scroll to top on route change
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.auth$.unsubscribe();
  }
}
