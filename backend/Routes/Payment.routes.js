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



module.exports = {
  PaymentRoute,
};
