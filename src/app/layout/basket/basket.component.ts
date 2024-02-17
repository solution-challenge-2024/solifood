import { Component, OnInit, inject } from "@angular/core";
import { Basket } from "../../core/models/basket";
import { ButtonComponent } from "../../components/button/button.component";
import dayjs from "dayjs";
import { StorageService } from "../../core/data/storage.service";
import { BasketService } from "../../core/services/basket.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: "app-basket",
  standalone: true,
  imports: [ButtonComponent, LoadingComponent],
  templateUrl: "./basket.component.html",
})
export class BasketComponent implements OnInit {
  public storage = inject(StorageService);
  private service = inject(BasketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  basket: Basket | null = null;
  activeImage = 0;

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
  }

  willExpireSoon(): boolean {
    if (!this.basket) return false;

    const now = dayjs();
    const willExpireAt = dayjs(this.basket.expiredAt.toDate());

    return willExpireAt.diff(now, "day") < 1; // less than 1 day
  }

  timeAgo(date: Date): string {
    return dayjs(date).fromNow();
  }
}
