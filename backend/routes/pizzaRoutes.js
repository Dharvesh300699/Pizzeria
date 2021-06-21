const path = require("path");
const express = require("express");
const multer = require("multer");
const router = new express.Router();
const {
  getVegPizzas,
  getNonVegPizzas,
  getPizzamania,
  getAllPizzas,
  getPizzaById,
  deletePizza,
  createPizza,
  updatePizza,
} = require("../controllers/pizzaController");
const { auth, admin } = require("../middleware/authMiddleware");

function checkFileType(file, cb) {
  const filetypes = /.jpg|.jpeg|.png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb("Images only!");
  }
}

const upload = multer({
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1048576,
  },
});

router.post("/", auth, admin, upload.single("image"), createPizza);

router.put("/:id", auth, admin, upload.single("image"), updatePizza);

router.get("/", getAllPizzas);

router.get("/veg", getVegPizzas);

router.get("/nonveg", getNonVegPizzas);

router.get("/pizzamania", getPizzamania);

router.get("/:id", getPizzaById);

router.delete("/:id", auth, admin, deletePizza);

module.exports = router;
