const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const Emitter = require("events")
const connectDB = require("./config/db")
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const pizzaRouter = require("./routes/pizzaRoutes")
const userRouter = require("./routes/userRoutes")
const orderRouter = require("./routes/orderRoutes")

dotenv.config()

// database connection
connectDB()

const app = express()

app.use(express.json())

app.use("/api/pizzas", pizzaRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)

app.get("/api/config/razorPay", (req, res) => {
  res.send(process.env.KEY_ID)
})

const __dirname = path.resolve()

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")))

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  )
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
})

// Event emitter
const eventEmitter = new Emitter()
app.set("eventEmitter", eventEmitter)

// Socket
const io = require("socket.io")(server)
io.on("connection", (socket) => {
  // Join
  socket.on("join", (room) => {
    socket.join(room)
  })
})

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data)
})

eventEmitter.on("orderPlaced", (data) => {
  io.to(`adminRoom`).emit("orderPlaced", data)
})
