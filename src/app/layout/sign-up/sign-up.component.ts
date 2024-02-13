import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";
import { SigninWithGoogleComponent } from "../../shared/signin-with-google/signin-with-google.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [RouterLink, FormsModule, SigninWithGoogleComponent],
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent {
  constructor() {}

  private authentication = inject(AuthenticationService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  showPassword = false;
  buttonsDisabled = false;

  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  async handleSubmit() {
    this.buttonsDisabled = true;

    // TODO: Add form validation

    // Sign up
    const result = await this.authentication.signUp(this.user);
    if (result.error || !result.user) {
      switch (result.error.code) {
        case "auth/email-already-in-use":
          this.toastr.error("Oops! This email is already in use");
          break;
        default:
          this.toastr.error("Oops! Something went wrong");
          break;
      }
      this.buttonsDisabled = false;
      return;
    }

    // Redirect to explore page
    this.router.navigate(["/explore"]);
  }
}
