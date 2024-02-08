import { Timestamp } from "@angular/fire/firestore";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  picture: string;
  email: string;
  location: { lat: number; lon: number };
  ratings: { rating: number; by: string }[];
  blocked: string[];
  lastLogin: Timestamp;
  joinedAt: Timestamp;
}
