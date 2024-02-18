import { Component, OnInit, inject } from "@angular/core";
import { ButtonComponent } from "../../components/button/button.component";
import { Basket } from "../../core/models/basket";
import { StorageService } from "../../core/data/storage.service";
import { BasketService } from "../../core/services/basket.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingComponent } from "../../components/loading/loading.component";
import dayjs from "dayjs";
import { IPayPalConfig, NgxPayPalModule } from "ngx-paypal";
import { environment } from "../../../environments/environment.development";
import { PaymentService } from "../../core/services/payment.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-order",
  standalone: true,
  imports: [ButtonComponent, LoadingComponent, NgxPayPalModule],
  templateUrl: "./order.component.html",
})
export class OrderComponent implements OnInit {
  public storage = inject(StorageService);
  private service = inject(BasketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private payment = inject(PaymentService);
  private toastr = inject(ToastrService);

  basket: Basket | null = null;
  public payPalConfig?: IPayPalConfig;

  async ngOnInit() {
    // Get basket id from route
    const basketId = this.route.snapshot.paramMap.get("id") || "";

    // Get basket from storage if exists, else get from service
    this.basket =
      this.storage.basketsState.baskets.find((b) => b.id === basketId) ||
      (await this.service.getBasket(basketId));

    // If still not found, redirect to not found
    if (!this.basket) {
      this.router.navigate(["/not-found"]);
    }

    // Init PayPal
    this.initPaypalConfig();
  }

  initPaypalConfig() {
    this.payPalConfig = {
      clientId: environment.PaypalConfig.clientId,
      createOrderOnServer: async (data: any) => {
        if (!this.basket) return "";

        const response = await this.payment.createOrder(this.basket);
        return response.orderId;
      },
      onClientAuthorization: (data) => {
        // Redirect to basket details page
        this.router.navigate(["/payment-success"]);
      },
      onError: (err) => {
        this.toastr.error(
          "Ooops! An error occurred while processing the payment.",
        );
      },
      style: {
        label: "paypal",
        layout: "vertical",
        color: "gold",
        shape: "pill",
      },
    };
  }

  willExpireSoon(): boolean {
    if (!this.basket) return false;

    const now = dayjs();
    const willExpireAt = dayjs(this.basket.expiredAt.toDate());

    return willExpireAt.diff(now, "day") < 1; // less than 1 day
  }

  formatDate(date: Date): string {
    return dayjs(date).format("DD/MM/YYYY HH:mm");
  }
}
