
const express = require("express");
const { loggedIn } = require("../../middlewares/loggedIn");
const { getCustomers } = require("./customers.controllers");
const router = express.Router();

router.get("/", loggedIn, getCustomers);

module.exports = router;
