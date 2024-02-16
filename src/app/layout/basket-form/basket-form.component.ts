import { Component, EventEmitter, Output } from "@angular/core";
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
  styleUrl: "./basket-form.component.scss",
})
export class BasketFormComponent {
  @Output() ingredientsChange = new EventEmitter<string[]>();
  inputTitle: string = "";
  inputDescription: string = "";
  tags: string[] = [];
  ingredients: string[] = [];
}
