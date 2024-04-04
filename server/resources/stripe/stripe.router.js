const express = require("express");
const { createCheckoutSession, getProducts } = require("./stripe.controllers");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.get("/products", getProducts);

module.exports = router;
