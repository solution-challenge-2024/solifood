import { Request, Response } from "express";
import { onRequest } from "firebase-functions/v2/https";

import { onDocumentCreated } from "firebase-functions/v2/firestore";

import * as express from "express";
import * as admin from "firebase-admin";
import * as cors from "cors";
import { Timestamp } from "firebase-admin/firestore";
import { authorizeRequest } from "./helpers";
import { Basket } from "./models/basket";
import { createOrder, verifyWebhook } from "./paypal";
import { User } from "./models/user";

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
app.use(cors());

// Create PayPal order route
app.get("/order/:id", authorizeRequest, async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user;
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
  const response = await createOrder(basket, user);
  res.json(response);
});

// Webhook route
app.post("/webhook", async (req: Request, res: Response) => {
  // Check if the event type is CHECKOUT.ORDER.APPROVED
  if (req.body.event_type !== "CHECKOUT.ORDER.APPROVED") {
    res.status(400).json({ message: "Invalid event type" });
    return;
  }

  // Verify the webhook
  const verified = await verifyWebhook(req.headers, req.body);
  if (!verified) {
    res.status(400).json({ message: "Invalid webhook" });
    return;
  }

  // Get the basket and user ID from the webhook data
  const basketId = req.body.resource.purchase_units[0].reference_id;
  const userId = req.body.resource.purchase_units[0].custom_id;

  // Check if the basket and user exist in the database
  const basketRef = await admin
    .firestore()
    .collection("baskets")
    .doc(basketId)
    .get();
  const userRef = await admin.firestore().collection("users").doc(userId).get();
  if (!basketRef.exists || !userRef.exists) {
    res.status(404).json({ message: "Basket or user not found" });
    return;
  }

  // TODO: Check if the basket is still available

  // Get user data
  const user = userRef.data() as User;

  // Update the basket status
  await basketRef.ref.update({
    claimedBy: user,
    soldAt: Timestamp.now(),
  });

  // Return a success response
  res.status(200).json({ message: "Webhook verified" });
});

export const api = onRequest(app);

export const createBasket = onDocumentCreated("baskets/{basketId}", (event) => {
  if (!event.data) {
    return;
  }

  // Get only the needed fields
  const basket = event.data.data() as Basket;
  const data = {
    id: event.params.basketId,
    available: basket.available,
    expiredAt: basket.expiredAt.seconds,
    createdAt: basket.createdAt.seconds,
    location: basket.location,
    title: basket.title,
    description: basket.description,
    ingredients: basket.ingredients,
    tags: basket.tags,
  };

  // Send the basket data to the search API
  fetch(process.env.SEARCH_API + "/add-baskets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      baskets: [data],
    }),
  });
});
