const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sizes: [
      {
        size: {
          type: String,
          enum: ["regular", "medium", "large"],
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    pizzamania: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
