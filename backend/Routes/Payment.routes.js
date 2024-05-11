const stripe = require("stripe")(process.env.STRIPE_KEY);
const { Router } = require("express");

const PaymentRoute = Router();

PaymentRoute.post("/:amount", async (req, res) => {
  try {
    const { amount } = req.params;
    const payment = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: "usd",
    });
    res.send(payment);
  } catch (err) {
    res.send(err);
  }
});

const createCheckoutSession = async (req, res) => {
  try {
    const items = req.body.products;
    let lineItems = items.map((item) => ({
      price: item.id,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: "https://ecommerce.yashshrestha.net/success",
      cancel_url: "https://ecommerce.yashshrestha.net/failed",
    });

    res.send(JSON.stringify({ url: session.url }));
  } catch (error) {
    console.error("Error creating stripe session: ", error);
    res.status(500).json({ error: "Error creating stripe session" });
  }
};

//Creating stripe checkout session
PaymentRoute.post("/checkout", createCheckoutSession);

module.exports = {
  PaymentRoute,
};
