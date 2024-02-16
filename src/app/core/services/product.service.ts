import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Basket } from "../models/basket";
import { User } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private http = inject(HttpClient);
  private url = environment.apiUrl;

  constructor() {}

  // Basket Crud
  getBaskets() {
    return this.http.get("/api/basket");
  }

  getBasketById(id: number): Observable<any> {
    return this.http.get(`${this.url}/basket/${id}`);
  }

  createBasket(basket: Basket): Observable<any> {
    return this.http.post(`${this.url}/basket`, basket);
  }

  updateBasket(basket: Basket): Observable<any> {
    return this.http.put(`${this.url}/basket/${basket.id}`, basket);
  }

  deleteBasket(id: number): Observable<any> {
    return this.http.delete(`${this.url}/basket/${id}`);
  }

  // Orders Crud
  getOrders(user: User): Observable<any> {
    return this.http.get(`${this.url}/orders`);
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.url}/orders/${id}`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post(`${this.url}/orders`, order);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.put(`${this.url}/orders/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.url}/orders/${id}`);
  }
}
