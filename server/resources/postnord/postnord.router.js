
const express = require("express");
const {getServicePoints} = require("./postnord.controller")
const router = express.Router();

router.get("/servicepoints", getServicePoints);

module.exports = router;
