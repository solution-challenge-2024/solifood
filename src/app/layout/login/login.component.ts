import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  showPassword = false;
  buttonsDisabled = false;
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  handleSubmit() {
    this.buttonsDisabled = true;

    console.log("email: ", this.loginForm.value.email);
    console.log("password: ", this.loginForm.value.password);
  }

  handleGoogleSignIn() {
    this.buttonsDisabled = true;
    console.log("Sign in with Google");
  }
}
