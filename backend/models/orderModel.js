const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pizzaItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        pizzaId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Pizza",
        },
      },
    ],
    deliveryAddress: { type: String, required: true },
    contact: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "order_placed" },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
