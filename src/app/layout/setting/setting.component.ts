import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { StorageService } from "../../core/data/storage.service";
import { InputComponent } from "../../components/input/input.component";
import { FileInputComponent } from "../../components/file-input/file-input.component";
import { FormsModule } from "@angular/forms";
import { MapComponent } from "../../components/map/map.component";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";

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
})
export class SettingComponent {
  public storage = inject(StorageService);
  private toastr = inject(ToastrService);
  private authentication = inject(AuthenticationService);
  private router = inject(Router);

  user = {
    firstName: this.storage.user?.firstName,
    lastName: this.storage.user?.lastName,
    location: {
      lat: this.storage.user?.location.lat || 0,
      lon: this.storage.user?.location.lon || 0,
    },
  };

  mapCenter = {
    latitude: this.user.location.lat,
    longitude: this.user.location.lon,
  };
  picture: File | null = null;
  loading = false;

  previewImage(event: Event) {
    // If there is no file selected, exit
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    // Store the selected file
    this.picture = input.files[0];

    // Create the file preview
    let reader = new FileReader();
    reader.onload = (e: any) => {
      const url = e.target.result;
      document.getElementById("preview-user-picture")!.setAttribute("src", url);
    };
    reader.readAsDataURL(input.files[0]);
  }

  locationChange(location: { latitude: number; longitude: number }) {
    this.user.location = {
      lat: location.latitude,
      lon: location.longitude,
    };
  }

  async saveUser() {
    if (this.loading || this.storage.user == null) return;
    this.loading = true;
    if (!this.validateUser()) {
      this.loading = false;
      this.toastr.error("Please fill all the required fields");
      return;
    }

    try {
      // Upload images
      let image = this.storage.user.picture;
      if (this.picture) {
        image = await this.authentication.uploadProfilePicture(this.picture);
        if (!image) {
          this.loading = false;
          this.toastr.error("Please upload valid image file");
          return;
        }
      }

      // Create basket
      await this.authentication.updateUser(this.storage.user.id, {
        ...this.user,
        picture: image,
      });

      // Redirect to explore
      this.toastr.success("Profile updated successfully");
      this.router.navigate(["/profil"]);
      this.loading = false;
    } catch (error) {
      this.toastr.error("An error occurred while updating the profile");
      this.loading = false;
    }
  }

  validateUser() {
    return (
      this.user.firstName &&
      this.user.firstName.length > 0 &&
      this.user.lastName &&
      this.user.lastName.length > 0
    );
  }
}
