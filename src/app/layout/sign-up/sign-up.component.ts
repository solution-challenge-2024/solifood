import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent {
  showPassword = false;
  buttonsDisabled = false;
  user = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
  ) {}

  async handleSubmit() {
    this.buttonsDisabled = true;

    // TODO: Add form validation

    // Sign up
    const result = await this.authentication.signUp(this.user);
    if (result.error || !result.user) {
      console.error(result.error);
      this.buttonsDisabled = false;
      return;
    }

    // Redirect to explore page
    this.router.navigate(["/explore"]);
  }

  handleGoogleSignIn() {
    this.buttonsDisabled = true;
    console.log("Sign in with Google");
  }
}
