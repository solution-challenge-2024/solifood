import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";
import { SigninWithGoogleComponent } from "../../shared/signin-with-google/signin-with-google.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule, SigninWithGoogleComponent],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  showPassword = false;
  buttonsDisabled = false;
  user = {
    email: "",
    password: "",
  };

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  async handleSubmit() {
    this.buttonsDisabled = true;

    // TODO: Add form validation

    // Sign in user
    const result = await this.authentication.signIn(
      this.user.email,
      this.user.password,
    );
    if (result.error) {
      switch (result.error.code) {
        case "auth/user-not-found" || "auth/wrong-password":
          this.toastr.error("Oops! The email or password is incorrect");
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
