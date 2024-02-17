import { Component, Inject, OnInit } from "@angular/core";
import { BasketService } from "../../core/services/basket.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  constructor(@Inject(BasketService) private serviceFierbase: BasketService) {}

  ngOnInit(): void {
    this.serviceFierbase.getBaskets().subscribe((data: any) => {
      console.log(data);
    });
  }
}
