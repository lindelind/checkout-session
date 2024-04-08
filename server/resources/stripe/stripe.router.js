const express = require("express");
const { createCheckoutSession, getProducts, verifySession} = require("./stripe.controllers");
const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/verify-session", verifySession);
router.get("/products", getProducts);

module.exports = router;
