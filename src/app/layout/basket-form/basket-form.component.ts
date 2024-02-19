import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { FileInputComponent } from "../../components/file-input/file-input.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { ChoiceComponent } from "../../components/choice/choice.component";
import { StorageService } from "../../core/data/storage.service";
import { MapComponent } from "../../components/map/map.component";
import { ToastrService } from "ngx-toastr";
import { BasketService } from "../../core/services/basket.service";
import { Router } from "@angular/router";
import { Timestamp } from "@angular/fire/firestore";
import dayjs from "dayjs";

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
  private service = inject(BasketService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  basket = {
    title: "",
    description: "",
    images: [] as File[],
    price: 0,
    location: { lat: 33.589886, lon: -7.603869 },
    available: true,
    tags: [],
    ingredients: [],
    expiredAt: dayjs().format("YYYY-MM-DD"),
  };

  loading = false;
  mapCenter = { latitude: 33.589886, longitude: -7.603869 };

  async saveBasket() {
    if (this.loading) return;

    this.loading = true;
    if (!this.validateBasket()) {
      this.loading = false;
      this.toastr.error("Please fill all the required fields");
      return;
    }

    try {
      // Upload images
      const images = await this.service.uploadImages(this.basket.images);
      if (images.length == 0) {
        this.loading = false;
        this.toastr.error("Please upload valid image files");
        return;
      }

      // Create basket
      const id = await this.service.createBasket({
        ...this.basket,
        images,
        blocked: false,
        claimedBy: null,
        soldAt: null,
        expiredAt: Timestamp.fromDate(dayjs(this.basket.expiredAt).toDate()),
        createdAt: Timestamp.now(),
        createdBy: this.storage.user,
      });

      // Redirect to explore
      this.toastr.success("Basket created successfully");
      this.router.navigate(["/explore", id]);
      this.loading = false;
    } catch (error) {
      this.toastr.error("An error occurred while creating the basket");
      this.loading = false;
    }
  }

  locationChange(location: { latitude: number; longitude: number }) {
    this.basket.location = {
      lat: location.latitude,
      lon: location.longitude,
    };
  }

  validateBasket() {
    return (
      this.basket.title.length > 0 && // Check if title is not empty
      this.basket.description.length > 0 && // Check if description is not empty
      this.basket.price > 0 && // Check if price is greater than 0
      dayjs(this.basket.expiredAt).isAfter(dayjs()) // Check if expiredAt is in the future
    );
  }
}
