import { Injectable, inject } from "@angular/core";
import { Basket } from "../models/basket";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  firestore = inject(Firestore);
  basketsCollection = collection(this.firestore, "baskets");

  // Basket Crud
  getBaskets(): Observable<Basket[]> {
    return collectionData(this.basketsCollection, {
      idField: "id",
    }) as Observable<Basket[]>;
  }

  createBasket(basket: Basket): Observable<void> {
    const promise = addDoc(this.basketsCollection, basket).then((resp) => {
      (resp: any) => resp.id;
    });
    return from(promise);
  }

  deleteBasket(basket: Basket): Observable<void> {
    const docRef = doc(this.firestore, `baskets/${basket.id}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateBasket(basket: Basket): Observable<void> {
    const docRef = doc(this.firestore, `baskets/${basket.id}`);
    const promise = setDoc(docRef, basket);
    return from(promise);
  }
}
