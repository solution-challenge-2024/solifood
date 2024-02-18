import { Component } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-after-payment",
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: "./after-payment.component.html",
})
export class AfterPaymentComponent {}
