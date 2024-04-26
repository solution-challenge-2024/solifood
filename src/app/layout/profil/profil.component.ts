import { Component, OnInit, inject } from "@angular/core";
import { StorageService } from "../../core/data/storage.service";
import dayjs from "dayjs";
import { ButtonComponent } from "../../components/button/button.component";
import { FormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ChoiceComponent } from "../../components/choice/choice.component";
import { InputComponent } from "../../components/input/input.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { NoDataComponent } from "../../components/no-data/no-data.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { BasketService } from "../../core/services/basket.service";
import { BasketComponent } from "../../shared/basket/basket.component";
import { Router, RouterLink } from "@angular/router";
import { Basket } from "../../core/models/basket";
import { Auth } from "@angular/fire/auth";

@Component({
  selector: "app-profil",
  standalone: true,
  imports: [
    ButtonComponent,
    BasketComponent,
    FormsModule,
    ButtonComponent,
    InputComponent,
    TagsInputComponent,
    ChoiceComponent,
    LoadingComponent,
    InfiniteScrollModule,
    NoDataComponent,
    RouterLink,
  ],
  templateUrl: "./profil.component.html",
})
export class ProfilComponent implements OnInit {
  public storage = inject(StorageService);
  public auth = inject(Auth);
  private basket = inject(BasketService);
  private router = inject(Router);

  basketsLoading = true;
  baskets: Basket[] = [];
  searchQuery = "";

  async ngOnInit() {
    const currUser = await this.auth.currentUser;
    if (currUser) {
      this.baskets = await this.basket.getBasketsByUser(currUser.uid);
    }

    this.basketsLoading = false;
  }

  searchBaskets() {
    console.log(this.searchQuery);
  }

  joinedAt(date: Date): string {
    return dayjs(date).format("MMM YYYY");
  }

  navigateToSettings() {
    this.router.navigate(["/setting"]);
  }

  navigateToBasketForm() {
    this.router.navigate(["/basket-form"]);
  }
  navigateToDashboad() {
    this.router.navigate(["/dashboard"]);
  }
}
