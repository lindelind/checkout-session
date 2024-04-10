const express = require("express");
require("dotenv").config();

const cookieSession = require("cookie-session");
const cors = require("cors");

const stripeRouter = require("./resources/stripe/stripe.router");
const customersRouter = require("./resources/customers/customers.router");
const authRouter = require("./resources/auth/auth.router");
const postnordRouter = require("./resources/postnord/postnord.router");
const ordersRouter = require("./resources/orders/orders.router")
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  cookieSession({
    secret: "s3cr3tk3yz",
    maxAge: 1000 * 60 * 60,
  })
);

//routes
app.use("/payments", stripeRouter);
app.use("/api/auth", authRouter);
app.use("/api/customers", customersRouter);
app.use("/api/postnord", postnordRouter);
app.use("/api/orders", ordersRouter);

app.listen(3001, () => console.log("Server is up and running"));
