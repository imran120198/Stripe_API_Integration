const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const { connection } = require("./Connection/Connection");
const { CartRoute } = require("./Routes/Cart.routes");
const { PaymentRoute } = require("./Routes/Payment.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to React E-Commerce server");
});

app.use("/cart", CartRoute);
app.use("/payment", PaymentRoute);

app.post("/checkout", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
        images: [product.image],
      },
      unit_amount: product.price * 100,
    },
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/sucess",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(err);
  }
  console.log("Listing to PORT 8080");
});
