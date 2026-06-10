const express = require("express");
const router = express.Router();
const paymentController = require("../controller/paymentController");
router.post("/payment", paymentController.payment);
router.get("/check-payment", paymentController.checkPayment);
module.exports = router;
