const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")
const User = require("../models/userModel")

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      address: user.address,
      token: generateToken(user._id.toString()),
    })
  } else {
    res.status(404)
    throw new Error("Invalid email or password")
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await new User({ name, email, password }).save()
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id.toString()),
  })
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, isAdmin, address } = req.user
  res.json({
    _id,
    name,
    email,
    isAdmin,
    address,
  })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const allowedUpdates = ["name", "email", "address"]
  let updates = Object.keys(req.body)
  if (updates.indexOf("password") === -1) {
    res.status(400)
    throw new Error("Missing password")
  } else {
    updates.splice(updates.indexOf("password"), 1)
  }
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if (!isValidOperation) {
    res.status(400)
    throw new Error("Invalid updates")
  }

  if (!(await bcrypt.compare(req.body.password, req.user.password))) {
    res.status(400)
    throw new Error("Incorrect Password")
  }

  updates.forEach((update) => {
    req.user[update] = req.body[update]
  })
  const user = await req.user.save()
  const { _id, name, email, isAdmin, address } = user
  res.json({
    _id,
    name,
    email,
    isAdmin,
    address,
  })
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc    Change admin status
// @route   PUT /api/users/:id
// @access  Private/Admin
const adminUpdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.isAdmin = !user.isAdmin
    await user.save()
    res.json({ message: "Admin status changed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  adminUpdate,
}
