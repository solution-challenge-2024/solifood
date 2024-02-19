import { Component, inject } from "@angular/core";
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
import { initDrawers } from "flowbite";
import { BasketComponent } from "../../shared/basket/basket.component";
import { Router } from "@angular/router";

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
  ],
  templateUrl: "./profil.component.html",
  styleUrl: "./profil.component.scss",
})
export class ProfilComponent {
  public storage = inject(StorageService);
  private basket = inject(BasketService);
  private router = inject(Router);

  basketsLoading = false;

  searchQuery = "";
  filters = {
    maxDistance: 300,
    sortBy: "newest",
    tags: [],
  };

  ngOnInit() {
    initDrawers();
    // Load baskets
    if (!this.storage.basketsState.loaded) {
      this.loadBaskets();
    }
  }

  async handleScroll() {
    if (this.basketsLoading || this.storage.basketsState.endReached) return;

    this.basketsLoading = true;
    await this.loadBaskets();
    this.basketsLoading = false;
  }

  async loadBaskets() {
    // Get last result to start after
    const basketsCount = this.storage.basketsState.baskets.length;
    const lastResult =
      basketsCount > 0
        ? this.storage.basketsState.baskets[basketsCount - 1]
        : null;

    // Get baskets
    const baskets = await this.basket.getBaskets(lastResult);

    // If no baskets, end reached
    if (baskets.length === 0) {
      this.storage.basketsState.endReached = true;
      return;
    }

    // Add baskets to storage
    this.storage.basketsState.baskets = [
      ...this.storage.basketsState.baskets,
      ...baskets,
    ];
    this.storage.basketsState.loaded = true;
  }

  searchBaskets() {
    console.log(this.searchQuery);
  }

  filterBaskets() {
    console.log(this.filters);
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
}
