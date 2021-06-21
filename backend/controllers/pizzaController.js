const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const Pizza = require("../models/pizzaModel");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// @desc    Get all pizzas
// @route   GET /api/pizzas
// @access  Public
const getAllPizzas = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find({});
  res.json(pizzas);
});

// @desc    Get all veg pizzas
// @route   GET /api/pizzas/veg
// @access  Public
const getVegPizzas = asyncHandler(async (req, res) => {
  const vegPizzas = await Pizza.find({ category: "veg", pizzamania: false });
  res.json(vegPizzas);
});

// @desc    Get all non-veg pizzas
// @route   GET /api/pizzas/nonveg
// @access  Public
const getNonVegPizzas = asyncHandler(async (req, res) => {
  const nonVegPizzas = await Pizza.find({
    category: "nonveg",
    pizzamania: false,
  });
  res.json(nonVegPizzas);
});

// @desc    Get all pizzamania pizzas
// @route   GET /api/pizzas/pizzamania
// @access  Public
const getPizzamania = asyncHandler(async (req, res) => {
  const pizzamania = await Pizza.find({ pizzamania: true });
  res.json(pizzamania);
});

// @desc    Fetch single pizza
// @route   GET /api/pizzas/:id
// @access  Public
const getPizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);
  if (pizza) {
    res.json(pizza);
  } else {
    res.status(404);
    throw new Error("Pizza not found");
  }
});

// @desc    Create pizza
// @route   POST /api/pizzas
// @access  Private/Admin
const createPizza = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Image is required!");
  }
  const { name, description, category, sizes, pizzamania } = req.body;

  const public_id = `${req.file.originalname.split(".")[0]}_${Date.now()}`;

  const imageBuffer = await sharp(req.file.buffer)
    .resize({ width: 265, height: 265 })
    .jpeg({ mozjpeg: true })
    .toBuffer();

  const base64URI = `data:image/${
    req.file.originalname.split(".")[1]
  };base64,${imageBuffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64URI, {
    public_id: public_id,
  });

  const pizza = new Pizza({
    name,
    description,
    category,
    sizes: JSON.parse(req.body.sizes),
    pizzamania,
    image: result.secure_url,
    public_id: result.public_id,
    user: req.user._id,
  });

  await pizza.save();

  res.status(201).json({ message: "Pizza created successfully" });
});

// @desc    Update a pizza
// @route   /api/pizzas/:id
// @access  Private/admin
const updatePizza = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);
  if (!pizza) {
    res.status(404);
    throw new Error("Pizza not found");
  } else {
    const allowedUpdates = [
      "name",
      "description",
      "category",
      "sizes",
      "pizzamania",
    ];

    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
      res.status(400);
      throw new Error("Invalid updates");
    }

    updates.forEach((update) => {
      pizza[update] = req.body[update];
    });

    pizza.sizes = JSON.parse(req.body.sizes);

    if (req.file) {
      const public_id = `${req.file.originalname.split(".")[0]}_${Date.now()}`;

      const imageBuffer = await sharp(req.file.buffer)
        .resize({ width: 265, height: 265 })
        .jpeg({ mozjpeg: true })
        .toBuffer();

      const base64URI = `data:image/${
        req.file.originalname.split(".")[1]
      };base64,${imageBuffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64URI, {
        public_id: public_id,
      });

      await cloudinary.uploader.destroy(pizza.public_id);

      pizza.image = result.secure_url;
      pizza.public_id = result.public_id;
    }

    await pizza.save();
    res.json({ message: "Pizza updated" });
  }
});

// @desc    Delete a pizza
// @route   DELETE /api/pizzas/:id
// @access  Private/Admin
const deletePizza = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);
  if (pizza) {
    await pizza.remove();
    res.json({ message: "Pizza removed" });
  } else {
    res.status(404);
    throw new Error("Pizza not found");
  }
});

module.exports = {
  getVegPizzas,
  getNonVegPizzas,
  getPizzamania,
  getAllPizzas,
  getPizzaById,
  deletePizza,
  createPizza,
  updatePizza,
  deletePizza,
};
