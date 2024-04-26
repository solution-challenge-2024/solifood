import { Injectable, inject } from "@angular/core";
import { Basket } from "../models/basket";
import {
  Firestore,
  QueryConstraint,
  Timestamp,
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
  where,
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@angular/fire/storage";
import { StorageService } from "../data/storage.service";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  firestore = inject(Firestore);
  storage = inject(Storage);
  storageService = inject(StorageService);
  basketsCollection = collection(this.firestore, "baskets");
  reportsCollection = collection(this.firestore, "reports");

  async getBaskets(
    lastResult: Basket | null = null,
    size = 12,
  ): Promise<Basket[]> {
    // Build query
    const q: QueryConstraint[] = [
      where("available", "==", true), // Only available baskets
      where("soldAt", "==", null), // Not sold yet
      orderBy("createdAt", "desc"),
      limit(size),
    ];

    // If we have a last result, start after it
    if (lastResult) {
      q.push(startAfter(lastResult.createdAt));
    }

    // Get data
    const qry = query(this.basketsCollection, ...q);
    const basketsSnapshots = await getDocs(qry);
    return basketsSnapshots.docs.map((doc) => doc.data() as Basket);
  }

  async getBasketsByUser(userId: string): Promise<Basket[]> {
    const qry = query(
      this.basketsCollection,
      where("createdBy.id", "==", userId),
      orderBy("createdAt", "desc"),
      limit(100),
    );
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

  async uploadImages(images: File[]): Promise<string[]> {
    const promises = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      if (image) {
        // Extract file info
        const file = {
          name: image.name.split(".")[0],
          extension: image.name.split(".")[1],
        };

        // Create a new file name
        const filename = file.name + "-" + Date.now() + "." + file.extension;
        const storageRef = ref(this.storage, `baskets/${filename}`);

        // Upload file
        promises.push(
          uploadBytes(storageRef, image).then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          }),
        );
      }
    }

    return Promise.all(promises);
  }

  async reportAbuse(basketId: string, reason: string[], details: string) {
    // Get basket & current user
    const basket = await this.getBasket(basketId);
    const user = this.storageService.user;

    // Create report object
    const report = {
      basket,
      reportedBy: user,
      reason: reason.join(", "),
      details,
      createdAt: Timestamp.now(),
    };

    // Report abuse
    await addDoc(this.reportsCollection, report);
  }

  async searchBaskets(search: string): Promise<Basket[]> {
    // Get basket IDs from the search API
    const response = await fetch(
      environment.searchAPI + "/search?query=" + search,
    );
    const data = await response.json();
    const basketIds = data.ids;

    if (basketIds.length === 0) {
      return [];
    }

    // Get baskets
    const qry = query(this.basketsCollection, where("id", "in", basketIds));
    const basketsSnapshots = await getDocs(qry);
    const baskets = basketsSnapshots.docs.map((doc) => doc.data() as Basket);

    return baskets;
  }
}
