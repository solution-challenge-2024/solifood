import { Injectable, inject } from "@angular/core";
import { Basket } from "../models/basket";
import {
  Firestore,
  QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  firestore = inject(Firestore);
  basketsCollection = collection(this.firestore, "baskets");

  async getBaskets(
    lastResult: Basket | null = null,
    size = 12,
  ): Promise<Basket[]> {
    // Build query
    const q: QueryConstraint[] = [orderBy("createdAt", "desc"), limit(size)];

    // If we have a last result, start after it
    if (lastResult) {
      q.push(startAfter(lastResult.createdAt));
    }

    // Get data
    const qry = query(this.basketsCollection, ...q);
    const basketsSnapshots = await getDocs(qry);
    return basketsSnapshots.docs.map((doc) => doc.data() as Basket);
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
