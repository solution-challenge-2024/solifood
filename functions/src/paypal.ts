import { v4 as uuidv4 } from "uuid";
import { convertMADToUSD } from "./helpers";
import { Basket } from "./models/basket";
import { User } from "./models/user";

const api = process.env.PAYPAL_BASE_URL;

const generateAccessToken = async () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  const auth = Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const response = await fetch(`${api}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const data = await response.json();
  return data.access_token;
};

export const createOrder = async (basket: Basket, user: User) => {
  try {
    // Generate an access token
    const accessToken = await generateAccessToken();
    const url = `${api}/v2/checkout/orders`;

    // Convert the basket price from MAD to USD
    const amount = await convertMADToUSD(basket.price);

    // Create the order
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: basket.id,
          custom_id: user.id,
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
        },
      ],
    };

    // Send the request to the PayPal API
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "PayPal-Request-Id": uuidv4(),
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    // Get the order data
    const order = await response.json();

    // Return the response
    return {
      status: "SUCCESS",
      orderId: order.id,
    };
  } catch (error) {
    return {
      status: "FAILED",
      orderId: null,
    };
  }
};

export const verifyWebhook = async (headers: any, webhook: any) => {
  // Construct the body of the request
  const body = {
    auth_algo: "SHA256withRSA",
    cert_url: headers["paypal-cert-url"],
    transmission_id: headers["paypal-transmission-id"],
    transmission_sig: headers["paypal-transmission-sig"],
    transmission_time: headers["paypal-transmission-time"],
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: webhook,
  };

  // Generate an access token and send the request to the PayPal API
  const accessToken = await generateAccessToken();
  const url = `${api}/v1/notifications/verify-webhook-signature`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  // Return the verification status
  const data = await response.json();
  return data.verification_status === "SUCCESS";
};
