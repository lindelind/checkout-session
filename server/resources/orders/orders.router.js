
const express = require("express");
const {getOrders} = require("./orders.controller");
const router = express.Router();

router.get("/getorders", getOrders);

module.exports = router;
