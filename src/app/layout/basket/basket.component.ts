import { Component, OnInit, inject } from "@angular/core";
import { Basket } from "../../core/models/basket";
import { ButtonComponent } from "../../components/button/button.component";
import dayjs from "dayjs";
import { StorageService } from "../../core/data/storage.service";
import { BasketService } from "../../core/services/basket.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { LoadingComponent } from "../../components/loading/loading.component";
import { MapComponent } from "../../components/map/map.component";

@Component({
  selector: "app-basket",
  standalone: true,
  imports: [ButtonComponent, LoadingComponent, RouterLink, MapComponent],
  templateUrl: "./basket.component.html",
})
export class BasketComponent implements OnInit {
  public storage = inject(StorageService);
  private service = inject(BasketService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  basket: Basket | null = null;
  mapCenter = { latitude: 0, longitude: 0 };
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
      return;
    }

    // Set the map center to the basket location
    this.mapCenter = {
      latitude: this.basket.location.lat,
      longitude: this.basket.location.lon,
    };
  }

  willExpireSoon(): boolean {
    if (!this.basket) return false;

    const now = dayjs();
    const willExpireAt = dayjs(this.basket.expiredAt.toDate());

    return willExpireAt.diff(now, "day") < 1; // less than 1 day
  }

  expired(): boolean {
    if (!this.basket) return false;

    const now = dayjs();
    const expiredAt = dayjs(this.basket.expiredAt.toDate());

    return expiredAt.isBefore(now);
  }

  timeAgo(date: Date): string {
    return dayjs(date).fromNow();
  }
}
