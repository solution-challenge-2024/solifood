import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { FileInputComponent } from "../../components/file-input/file-input.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { ChoiceComponent } from "../../components/choice/choice.component";
import { StorageService } from "../../core/data/storage.service";
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: "app-basket-form",
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    InputComponent,
    FileInputComponent,
    TagsInputComponent,
    ChoiceComponent,
    MapComponent,
  ],
  templateUrl: "./basket-form.component.html",
})
export class BasketFormComponent {
  public storage = inject(StorageService);

  basket = {
    title: "",
    description: "",
    images: [],
    tags: [],
    ingredients: [],
    price: 0,
    expiredAt: new Date(),
    isAvailable: true,
    location: { latitude: 33.589886, longitude: -7.603869 },
  };

  loading = false;
  mapCenter = { latitude: 33.589886, longitude: -7.603869 };

  async saveBasket() {
    if (this.loading) return;

    this.loading = true;
    console.log(this.basket);

    // TODO: Implement API call to save the basket
  }

  locationChange(location: { latitude: number; longitude: number }) {
    this.basket.location = location;
  }
}
