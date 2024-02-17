import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { Auth } from "@angular/fire/auth";
import { StorageService } from "./core/data/storage.service";
import { AuthenticationService } from "./core/services/authentication.service";
import { Subscription } from "rxjs";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { LoadingComponent } from "./shared/loading/loading.component";
import { BasketService } from "./core/services/basket.service";

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
  private basket = inject(BasketService);
  private auth = inject(Auth);
  private storage = inject(StorageService);

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

    // Load baskets
    if (!this.storage.basketsState.loaded) {
      this.basket.getBaskets().subscribe((baskets) => {
        this.storage.basketsState.baskets = baskets;
        this.storage.basketsState.loaded = true;
      });
    }
  }

  ngOnDestroy(): void {
    this.auth$.unsubscribe();
  }
}
