

const initStripe = require("../../utils/stripe");

const createCheckoutSession = async (req, res) => {
  const cart = req.body;
  const stripe = initStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: cart.map((checkoutItem) => {
      return {
        price: checkoutItem.price,
        quantity: checkoutItem.quantity,
      };
    }),
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173",
  });

  res.status(200).json({ url: session.url });
};
const getProducts = async (req, res) => {
  const stripe = initStripe();
  const productPriceData = await stripe.prices.list({
    expand: ["data.product"],
  });

  res.status(200).json(productPriceData);
};

module.exports = { createCheckoutSession, getProducts };