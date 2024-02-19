import { Component, Input } from "@angular/core";
import { Basket } from "../../core/models/basket";
import { RouterLink } from "@angular/router";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

@Component({
  selector: "app-basket",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./basket.component.html",
})
export class BasketComponent {
  @Input() basket: Basket | null = null;

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
