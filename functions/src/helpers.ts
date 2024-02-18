import { NextFunction, Request, Response } from "express";
import * as admin from "firebase-admin";
import { Basket } from "./models/basket";
import { User } from "./models/user";

export const authorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Check if the request has an Authorization header
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    res.status(403).send("Unauthorized");
    return;
  }

  // Get the ID token from the Authorization header
  let idToken = req.headers.authorization.split("Bearer ")[1];

  // Extract user data from the ID token
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    const userId = decodedIdToken.uid;

    // Get the user data from the Firestore database
    const user = await admin.firestore().collection("users").doc(userId).get();
    if (!user.exists) {
      res.status(403).send("Unauthorized");
      return;
    }

    // @ts-ignore
    req.user = user.data();
    next();
    return;
  } catch (error) {
    res.status(403).send("Unauthorized");
    return;
  }
};

export const isProduction = () => process.env.ENVIRONMENT === "production";

export const canPurchaseBasket = (basket: Basket, user: User) => {
  return (
    basket.expiredAt.toDate() > new Date() && // Basket is not expired
    !user.blocked && // User is not blocked
    basket.createdBy.id !== user.id && // User is not the owner
    basket.claimedBy === undefined // Basket has not been claimed
  );
};

export const convertMADToUSD = async (amount: number) => {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/MAD",
  );
  const data = await response.json();
  return amount * data.rates.USD;
};
