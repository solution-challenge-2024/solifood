import { Injectable, inject } from "@angular/core";
import { Basket } from "../models/basket";
import {
  Firestore,
  QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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

  async getBasket(id: string): Promise<Basket | null> {
    const docRef = doc(this.firestore, `baskets/${id}`);
    const docSnap = await getDoc(docRef);

    return docSnap.exists() ? (docSnap.data() as Basket) : null;
  }

  async createBasket(basket: Partial<Basket>) {
    const response = await addDoc(this.basketsCollection, basket);
    await this.updateBasket({ id: response.id, ...basket } as Basket);

    return response.id;
  }

  deleteBasket(basket: Basket): Observable<void> {
    const docRef = doc(this.firestore, `baskets/${basket.id}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  async updateBasket(basket: Basket) {
    const docRef = doc(this.firestore, `baskets/${basket.id}`);
    await setDoc(docRef, basket);
  }
}
