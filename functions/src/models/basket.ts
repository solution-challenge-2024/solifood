import { Timestamp } from "firebase-admin/firestore";
import { User } from "./user";

export interface Basket {
  id: string;
  title: string;
  description: string;
  images: string[];
  realPrice: number;
  price: number;
  location: { lat: number; lon: number };
  available: boolean;
  blocked: boolean;
  tags: string[];
  ingredients: string[];
  createdBy: User;
  claimedBy?: User;
  expiredAt: Timestamp;
  soldAt?: Timestamp;
  createdAt: Timestamp;
}
