import { Component, Inject, OnInit } from "@angular/core";
import { Timestamp } from "@angular/fire/firestore";
import { ProductService } from "../../core/services/product.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(ProductService) private serviceFierbase: ProductService,
  ) {}

  ngOnInit(): void {
    this.serviceFierbase.getBaskets().subscribe((data: any) => {
      console.log(data);
    });
  }
}
