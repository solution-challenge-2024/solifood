import { Request, Response } from "express";
import { onRequest } from "firebase-functions/v2/https";

import * as express from "express";
import * as admin from "firebase-admin";
import { authorizeRequest } from "./helpers";
import { Basket } from "./models/basket";
import { createOrder } from "./paypal";

// If the environment is development, use the Firestore and Firebase Auth emulators
if (process.env.ENVIRONMENT === "development") {
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:8080";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";
}

// Initialize the Firebase Admin SDK
admin.initializeApp({
  projectId: process.env.PROJECT_ID,
  credential: admin.credential.applicationDefault(),
});

// Create an Express app
const app = express();
app.use(express.json());
app.use(authorizeRequest);

// Create PayPal order route
app.get("/order/:id", async (req: Request, res: Response) => {
  // Get basket data from the Firestore database
  const basketId = req.params.id;
  const basketRef = await admin
    .firestore()
    .collection("baskets")
    .doc(basketId)
    .get();
  if (!basketRef.exists) {
    res.status(404).json({ message: "Basket not found" });
    return;
  }

  // Get the basket data
  const basket = basketRef.data() as Basket;

  // TODO: Check if the user can purchase the basket

  // Create an order in PayPal
  const response = await createOrder(basket);
  res.json(response);
});

export const api = onRequest(app);
