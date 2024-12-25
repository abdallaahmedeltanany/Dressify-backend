const express = require("express");
const stripe = require("stripe")("your_stripe_secret_key");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Handle payment intent creation
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
