import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../components/button/button.component";
import { InputComponent } from "../../components/input/input.component";
import { FileInputComponent } from "../../components/file-input/file-input.component";
import { TagsInputComponent } from "../../components/tags-input/tags-input.component";
import { ChoiceComponent } from "../../components/choice/choice.component";

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
  ],
  templateUrl: "./basket-form.component.html",
})
export class BasketFormComponent {
  basket = {
    title: "",
    description: "",
    images: [],
    tags: [],
    ingredients: [],
    price: 0,
    expiredAt: new Date(),
    isAvailable: true,
  };

  loading = false;

  async saveBasket() {
    if (this.loading) return;

    this.loading = true;
    console.log(this.basket);

    // TODO: Implement API call to save the basket
  }
}
