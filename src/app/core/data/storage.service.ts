import { Injectable, signal } from "@angular/core";
import { User } from "../models/user";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  user!: User;
  product!: Product;
}
