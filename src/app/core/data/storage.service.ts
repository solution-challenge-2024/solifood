import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Basket } from "../models/basket";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  user: User | undefined;
  basketsState = {
    loaded: false,
    baskets: [] as Basket[],
    endReached: false,
  };
}
