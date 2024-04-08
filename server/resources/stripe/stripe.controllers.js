

const initStripe = require("../../utils/stripe");
const fs = require("fs").promises

const createCheckoutSession = async (req, res) => {
  const cart = req.body;
  const stripe = initStripe();
  console.log(cart);

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["SE"],
    },
    customer: req.session.customer.id,
    mode: "payment",
    line_items: cart.map((checkoutItem) => {
      return {
        price: checkoutItem.price,
        quantity: checkoutItem.quantity,
      };
    }),
    success_url: "http://localhost:5173/confirmation",
    cancel_url: "http://localhost:5173",
  });

  res.status(200).json({ url: session.url, sessionId: session.id });
  console.log(session.id)
};

const verifySession = async (req, res) => {
    const stripe = initStripe()

    const sessionId = req.body.sessionId

    const session = await stripe.checkout.sessions.retrieve(sessionId);
  

        if (session.payment_status === "paid") {
        const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)


        const order = {
            orderNumber: Math.floor(Math.random() * 100000000),
            customerName: session.customer_details.name,
            products: lineItems.data,
            total: session.amount_total,
            date: new Date()
        }

        const orders = JSON.parse(await fs.readFile("../server/data/orders.json"))
        orders.push(order)
        await fs.writeFile("../server/data/orders.json", JSON.stringify(orders, null, 4))

        res.status(200).json({ verified: true })
    }
  }

// }
    

const getProducts = async (req, res) => {
  const stripe = initStripe();
  const productPriceData = await stripe.prices.list({
    expand: ["data.product"],
  });

  res.status(200).json(productPriceData);
};

module.exports = { createCheckoutSession, getProducts, verifySession};