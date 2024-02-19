import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { StorageService } from "../../core/data/storage.service";
import { InputComponent } from "../../components/input/input.component";
import { FileInputComponent } from "../../components/file-input/file-input.component";
import { FormsModule } from "@angular/forms";
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: "app-setting",
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    FileInputComponent,
    FormsModule,
    MapComponent,
  ],
  templateUrl: "./setting.component.html",
  styleUrl: "./setting.component.scss",
})
export class SettingComponent {
  public storage = inject(StorageService);
  loading = false;
  mapCenter = { latitude: 0, longitude: 0 };
  firstName = "";
  lastName = "";

  async saveBasket() {
    // TODO: Implement API call to modify the user settings
  }
}
