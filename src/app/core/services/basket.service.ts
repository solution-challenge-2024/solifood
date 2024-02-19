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
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from "@angular/fire/storage";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  firestore = inject(Firestore);
  storage = inject(Storage);
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
}
