import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Basket } from "../models/basket";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  firestore = inject(Firestore);
  basketsCollection = collection(this.firestore, "baskets");

  // Basket Crud
  getBaskets(): Observable<any> {
    return collectionData(this.basketsCollection, {
      idField: "id",
    }) as Observable<any>;
  }

  createBasket(basket: any): Observable<any> {
    const promise = addDoc(this.basketsCollection, basket).then((resp) => {
      (resp: any) => resp.id;
    });
    return from(promise);
  }

  deleteBasket(basket: any): Observable<any> {
    const docRef = doc(this.firestore, `baskets/${basket.id}`);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateBasket(basket: any): Observable<any> {
    const docRef = doc(this.firestore, `baskets/${basket.id}`);
    const promise = setDoc(docRef, basket);
    return from(promise);
  }
}
