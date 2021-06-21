const crypto = require("crypto")
const mongoose = require("mongoose")
const asyncHandler = require("express-async-handler")
const Razorpay = require("razorpay")
const { default: ShortUniqueId } = require("short-unique-id")
const Order = require("../models/orderModel")
const Pizza = require("../models/pizzaModel")

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ status: { $ne: "completed" } }).populate(
    "user",
    "id name email"
  )
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(10)
  res.json(orders)
})

// @desc        Create order
// @route       POST /api/orders
// @access      Private
const createOrder = asyncHandler(async (req, res) => {
  const { pizzaItems, deliveryAddress, totalPrice, paymentMethod, contact } =
    req.body
  if (pizzaItems && pizzaItems.length === 0) {
    res.status(400)
    throw new Error("No order items!")
  }

  let price = 0
  let validPrices = true

  for (i in pizzaItems) {
    const pizza = pizzaItems[i]
    const savedPizza = await Pizza.findById(pizza.pizzaId)
    if (pizza.size === "regular") {
      price += savedPizza.sizes[0].price * pizza.qty
      validPrices = validPrices && pizza.price === savedPizza.sizes[0].price
    } else if (pizza.size === "medium") {
      price += savedPizza.sizes[1].price * pizza.qty
      validPrices = validPrices && pizza.price === savedPizza.sizes[1].price
    } else {
      price += savedPizza.sizes[2].price * pizza.qty
      validPrices = validPrices && pizza.price === savedPizza.sizes[2].price
    }
  }

  if (!validPrices || price !== totalPrice) {
    res.status(400)
    throw new Error("Something went wrong. Try again!")
  }

  const order = new Order({
    user: req.user._id,
    pizzaItems,
    deliveryAddress,
    contact,
    totalPrice,
    paymentMethod,
  })
  const createdOrder = await order.save()
  await createdOrder.populate("user", "name email").execPopulate()

  if (paymentMethod === "cod") {
    const eventEmitter = req.app.get("eventEmitter")
    eventEmitter.emit("orderPlaced", createdOrder)
  }
  res.status(201).json(createdOrder)
})

// @desc    Create razor order
// @route   GET /api/orders/:id/razorOrder
// @access  Private
const createRazorOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    })

    const uid = new ShortUniqueId()

    const options = {
      amount: Math.round(order.totalPrice * 100),
      currency: "INR",
      receipt: uid(),
    }

    const orderInstance = await instance.orders.create(options)

    if (!orderInstance) {
      res.status(500)
      throw new Error("Something went wrong! Try again.")
    }

    res.json(orderInstance)
  } else {
    res.status(404)
    throw new Error("Order not Found!")
  }
})

// @desc    Order payment successful
// @route   /api/orders/success
// @access  Private

const orderSuccess = asyncHandler(async (req, res) => {
  const {
    orderCreationId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = req.body

  const shasum = crypto.createHmac("sha256", process.env.KEY_SECRET)
  shasum.update(`${orderCreationId}|${razorpayPaymentId}`)
  const digest = shasum.digest("hex")

  if (digest !== razorpaySignature) {
    res.status(400)
    throw new Error("Transaction is not legit!")
  }
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
    status: "Completed",
  })
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    const updatedOrder = await order.save()
    await updatedOrder.populate("user", "name email").execPopulate()
    const eventEmitter = req.app.get("eventEmitter")
    eventEmitter.emit("orderPlaced", updatedOrder)
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.status = req.body.status
    await order.save()
    const eventEmitter = req.app.get("eventEmitter")
    eventEmitter.emit("orderUpdated", {
      id: req.params.id,
      status: req.body.status,
      updatedAt: order.updatedAt,
    })
    res.json({ message: "Order status updated" })
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

const getOrderById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400)
    throw new Error("Invalid order id")
  }
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error("Order not found")
  } else {
    if (req.user._id.toString() === order.user.toString()) {
      res.json(order)
    } else {
      res.status(400)
      throw new Error("Invalid user")
    }
  }
})

module.exports = {
  createOrder,
  createRazorOrder,
  orderSuccess,
  updateOrderToPaid,
  updateOrderStatus,
  getOrders,
  getUserOrders,
  getOrderById,
}
