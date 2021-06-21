import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import moment from "moment"
import axios from "axios"
import { io } from "socket.io-client"
import { store } from "react-notifications-component"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { listOrders } from "../../actions/orderActions"

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [loadingError, setLoadingError] = useState(null)
  const [updatedOrders, setUpdatedOrders] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders, success } = orderList

  useEffect(() => {
    if (user && user.isAdmin) {
      if (!success) {
        dispatch(listOrders())
      }
    } else if (user) {
      history.push("/")
    } else {
      history.push("/login")
    }

    if (success) {
      setUpdatedOrders(
        orders.map((order) => {
          return {
            ...order,
            pizzaItems: order.pizzaItems.map((pizza) => ({ ...pizza })),
          }
        })
      )
      const socket = io()
      socket.emit("join", "adminRoom")

      socket.on("orderPlaced", (data) => {
        store.addNotification({
          message: `New Order Placed!`,
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
        orders.push(data)
        setUpdatedOrders(
          orders.map((order) => {
            return {
              ...order,
              pizzaItems: order.pizzaItems.map((pizza) => ({ ...pizza })),
            }
          })
        )
      })
    }
    // eslint-disable-next-line
  }, [dispatch, user, history, success])

  const updateOrderStatus = async (orderId, status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.post(`/api/orders/${orderId}`, { status }, config)
    } catch (e) {
      setLoadingError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    }
  }

  return (
    <>
      <Helmet>
        <title>Order List</title>
      </Helmet>
      <h1>All orders</h1>
      {loadingError && <Message variant="danger">{loadingError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ORDERS</th>
                <th>CUSTOMER</th>
                <th style={{ maxWidth: "200px" }}>ADDRESS</th>
                <th>AMOUNT</th>
                <th>PAID</th>
                <th>STATUS</th>
                <th>PLACED AT</th>
              </tr>
            </thead>
            <tbody>
              {updatedOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <ul>
                      {order.pizzaItems.map((pizza) => (
                        <li key={pizza._id}>
                          {`${pizza.name}-${pizza.size
                            .charAt(0)
                            .toUpperCase()}-${pizza.qty}`}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.user.name}</td>
                  <td style={{ maxWidth: "200px" }}>
                    {order.deliveryAddress}
                    <br />
                    <span style={{ fontWeight: "bold", color: "#fe5f1e" }}>
                      {order.contact}
                    </span>
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                    >
                      <option value="order_placed">Placed</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="prepared">Prepared</option>
                      <option value="delivered">Delivered</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>{moment(order.createdAt).format("hh:mm:ss A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default OrderListScreen
