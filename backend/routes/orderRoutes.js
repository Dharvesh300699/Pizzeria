const express = require("express");
const router = new express.Router();
const {
  createOrder,
  createRazorOrder,
  orderSuccess,
  updateOrderToPaid,
  updateOrderStatus,
  getOrders,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController");
const { auth, admin } = require("../middleware/authMiddleware");

router.get("/", auth, admin, getOrders);
router.get("/me", auth, getUserOrders);
router.post("/", auth, createOrder);
router.put("/:id/pay", auth, updateOrderToPaid);
router.get("/:id/razorOrder", auth, createRazorOrder);
router.post("/success", auth, orderSuccess);
router.post("/:id", auth, admin, updateOrderStatus);
router.get("/:id", auth, getOrderById);

module.exports = router;
