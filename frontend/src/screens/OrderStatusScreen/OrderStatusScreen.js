import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import moment from "moment"
import { Helmet } from "react-helmet"
import { store } from "react-notifications-component"
import { io } from "socket.io-client"
import Loader from "../../components/Loader/Loader"
import { getOrderDetails } from "../../actions/orderActions"
import "./OrderStatusScreen.css"
import { ORDER_CREATE_RESET } from "../../actions/actionTypes"

const OrderStatusScreen = ({ history, match, location }) => {
  const orderId = match.params.id
  const orderStatus = location.search ? location.search.split("=")[1] : false
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const orderCreate = useSelector((state) => state.orderCreate)

  const { success } = orderCreate

  const { loading, error, order } = orderDetails

  useEffect(() => {
    function updateStatus(order) {
      let statuses = document.querySelectorAll(".status_line")
      let stepCompleted = true
      let time = document.createElement("small")
      statuses.forEach((status) => {
        status.classList.remove("step-completed")
        status.classList.remove("current")
        if (status.children[1]) {
          status.children[1].remove()
        }
      })
      statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
          status.classList.add("step-completed")
        }
        if (dataProp === order.status) {
          stepCompleted = false
          time.innerText = moment(order.updatedAt).format("hh:mm A")
          status.appendChild(time)
          if (status.nextElementSibling) {
            status.nextElementSibling.classList.add("current")
          }
        }
      })
    }

    if (orderStatus && success) {
      store.addNotification({
        message: `Order Placed Successfully!`,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      })
      dispatch({ type: ORDER_CREATE_RESET })
    }

    if (user) {
      if (!order || order._id !== orderId) {
        dispatch(getOrderDetails(orderId))
      }
    } else {
      history.push("/login")
    }

    if (order) {
      updateStatus(order)

      let socket = io()
      //Join
      socket.emit("join", `order_${order._id}`)
      socket.on("orderUpdated", (data) => {
        const updatedOrder = { ...order }
        updatedOrder.updatedAt = data.updatedAt
        updatedOrder.status = data.status
        updateStatus(updatedOrder)
      })
    }
  }, [dispatch, user, history, orderId, order, orderStatus, success])

  return (
    <div className="status">
      <Helmet>
        <title>Order Status</title>
      </Helmet>
      <div className="row">
        <div className="status-box m-2 col-xl-9 mx-auto">
          <h1 className="text-center mb-5">Delivery Status</h1>
          {loading && <Loader />}
          {error && <Redirect to="/" />}
          <div className="d-flex justify-content-center order-status mx-2">
            <ul>
              <li className="status_line pb-5" data-status="order_placed">
                <span>Order Placed</span>
              </li>
              <li className="status_line pb-5" data-status="confirmed">
                <span>Order Confirmed</span>
              </li>
              <li className="status_line pb-5" data-status="prepared">
                <span>Order Prepared</span>
              </li>
              <li className="status_line pb-5" data-status="delivered">
                <span>Out For Delivery</span>
              </li>
              <li className="status_line" data-status="completed">
                <span>Complete</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderStatusScreen
