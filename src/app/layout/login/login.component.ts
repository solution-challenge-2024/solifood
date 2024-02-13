import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule],
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
