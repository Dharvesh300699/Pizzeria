const express = require("express")
const router = new express.Router()
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  adminUpdate,
} = require("../controllers/userController")
const { auth, admin } = require("../middleware/authMiddleware")

router.get("/profile", auth, getUserProfile)
router.put("/profile", auth, updateUserProfile)
router.post("/login", authUser)
router.post("/", registerUser)
router.get("/", auth, admin, getUsers)
router.delete("/:id", auth, admin, deleteUser)
router.put("/:id", auth, adminUpdate)

module.exports = router
