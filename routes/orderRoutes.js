const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// ✅ This matches your frontend POST request
router.post("/add", orderController.placeOrder);

// Other routes (optional):
router.get("/", orderController.getAllOrders);
router.patch("/:id/mark-paid", orderController.markAsPaid);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
