import { Component, Input } from "@angular/core";
import { Basket } from "../../core/models/basket";

@Component({
  selector: "app-basket",
  standalone: true,
  imports: [],
  templateUrl: "./basket.component.html",
  styleUrl: "./basket.component.scss",
})
export class BasketComponent {
  @Input() basket?: Basket;
}
