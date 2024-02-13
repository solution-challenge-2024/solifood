import { Component, Input } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin-with-google",
  standalone: true,
  imports: [],
  templateUrl: "./signin-with-google.component.html",
})
export class SigninWithGoogleComponent {
  @Input() disabled = false;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
  ) {}

  async handleGoogleSignIn() {
    const result = await this.authentication.signInWithGoogle();
    if (result.error || !result.user) {
      console.error(result.error);
      return;
    }

    // Redirect to explore page
    this.router.navigate(["/explore"]);
  }
}
