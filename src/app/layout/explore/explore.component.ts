import { Component, OnInit, inject } from "@angular/core";
import { BasketComponent } from "../../shared/basket/basket.component";
import { FormsModule } from "@angular/forms";
import { initDrawers } from "flowbite";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { ChoiceComponent } from "../../components/choice/choice.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { StorageService } from "../../core/data/storage.service";
import { BasketService } from "../../core/services/basket.service";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NoDataComponent } from "../../components/no-data/no-data.component";

@Component({
  selector: "app-explore",
  standalone: true,
  imports: [
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
  templateUrl: "./explore.component.html",
})
export class ExploreComponent implements OnInit {
  public storage = inject(StorageService);
  private basket = inject(BasketService);

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
}
