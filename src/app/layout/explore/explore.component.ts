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
  ],
  templateUrl: "./explore.component.html",
})
export class ExploreComponent implements OnInit {
  public storage = inject(StorageService);

  pagination = {
    page: 1,
    pageSize: 12,
    total: 0,
  };

  searchQuery = "";
  filters = {
    maxDistance: 300,
    sortBy: "newest",
    tags: [],
  };

  ngOnInit() {
    initDrawers();
  }

  searchBaskets() {
    console.log(this.searchQuery);
  }

  filterBaskets() {
    console.log(this.filters);
  }
}
