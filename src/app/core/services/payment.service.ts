import { Basket } from "../models/basket";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  private auth = inject(AuthenticationService);

  async createOrder(basket: Basket) {
    // Get user access token
    const accessToken = await this.auth.getAccessToken();
    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    // Send request to the API
    const response = await fetch(`${environment.apiURL}/order/${basket?.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Return response
    const data = await response.json();
    return data;
  }
}
