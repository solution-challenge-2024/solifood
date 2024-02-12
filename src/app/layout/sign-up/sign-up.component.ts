import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent {
  showPassword = false;
  buttonsDisabled = false;
  signupForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
  });

  handleSubmit() {
    this.buttonsDisabled = true;

    console.log(this.signupForm.value);
  }

  handleGoogleSignIn() {
    this.buttonsDisabled = true;
    console.log("Sign in with Google");
  }
}
