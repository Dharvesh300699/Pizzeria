import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import axios from "axios"
import { Link } from "react-router-dom"
import FlipMove from "react-flip-move"
import { store } from "react-notifications-component"
import isMobilePhone from "validator/lib/isMobilePhone"
import { addToCart, removeFromCart, cartReset } from "../../actions/cartActions"
import { createOrder, payOrder } from "../../actions/orderActions"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import * as actionTypes from "../../actions/actionTypes"
import "./CartScreen.css"

const notification = {
  insert: "top",
  container: "top-right",
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
}

const CartScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  // Calculate prices
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const orderCreate = useSelector((state) => state.orderCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success,
    order,
  } = orderCreate

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay } = orderPay

  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState(
    user && user.address ? user.address : ""
  )
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [sdkReady, setSdkReady] = useState(true)
  const [localError, setLocalError] = useState(null)

  function getScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = src
      script.className = "payment"
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  useEffect(() => {
    const loadScript = async () => {
      const res = await getScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      )

      if (!res) {
        setSdkReady(false)
        return
      } else {
        setSdkReady(true)
      }
    }

    if (!document.querySelector(".payment")) {
      loadScript()
    }

    const paymentHandler = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
        const result = await axios.get(
          `/api/orders/${order._id}/razorOrder`,
          config
        )

        const { amount, id: order_id, currency } = result.data
        const KEY_ID = await axios.get("/api/config/razorPay")

        const options = {
          key: KEY_ID,
          amount: amount.toString(),
          currency: currency,
          name: "PIZZERIA",
          description: "Thanks for shopping with us.",
          image:
            "https://res.cloudinary.com/dswp5qfpm/image/upload/v1617004723/sm-icons-facebook-logo_s9pj5u.webp",
          order_id: order_id,
          handler: async function (response) {
            const successData = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            }

            const { data } = await axios.post(
              "/api/orders/success",
              successData,
              config
            )
            dispatch(payOrder(order._id, data))
          },
          prefill: {
            name: order.user?.name,
            email: order.user?.email,
          },
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
      } catch (error) {
        setLocalError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      }
    }
    if (
      (success && paymentMethod === "cod") ||
      (success && successPay && paymentMethod === "online")
    ) {
      history.push(`/orders/${order._id}?order=true`)
      dispatch({ type: actionTypes.ORDER_PAY_RESET })
      dispatch(cartReset())
    }

    if (success && paymentMethod === "online" && !successPay) {
      paymentHandler()
    }
  }, [history, success, dispatch, paymentMethod, successPay, order, user])

  const changeQtyHandler = (pizza, qty) => {
    dispatch(addToCart(pizza, Math.abs(qty)))
  }

  const removeFromCartHandler = (id, name, size) => {
    dispatch(removeFromCart(id, size))
    store.addNotification({
      ...notification,
      title: `${name}`,
      message: `Removed From Cart!`,
      type: "success",
      dismiss: {
        duration: 1000,
        onScreen: true,
      },
    })
  }

  const orderHandler = async (e) => {
    e.preventDefault()
    if (!user) {
      history.push("/login?redirect=cart")
    } else if (!isMobilePhone(phone)) {
      store.addNotification({
        ...notification,
        message: "Contact No. is required!",
        type: "danger",
        dismiss: {
          duration: 5000,
          onScreen: true,
          showIcon: true,
        },
      })
    } else if (!address.trim()) {
      store.addNotification({
        ...notification,
        message: "Delivery address is required!",
        type: "danger",
        dismiss: {
          duration: 5000,
          onScreen: true,
          showIcon: true,
        },
      })
    } else {
      dispatch(
        createOrder({
          pizzaItems: cart.cartItems,
          deliveryAddress: address,
          contact: phone,
          paymentMethod: paymentMethod,
          totalPrice: cart.itemsPrice,
        })
      )
    }
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems.length === 0 ? (
        <div className="empty_cart">
          <div>
            Your cart is empty{" "}
            <Link className="btn" to="/">
              <button type="button" className="btn btn-first">
                Go Back
              </button>
            </Link>
          </div>
          <img src="/images/empty_cart.png" alt="empty-cart" />
        </div>
      ) : (
        <div className="py-4">
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <img src="/images/cart_black.png" alt="cart-icon" />{" "}
            <span className="ms-2 fs-4 fw-bold">Order Summary</span>
            <hr></hr>
          </div>
          <FlipMove>
            {cartItems.map((item) => (
              <div
                className="row item-row my-3 p-3"
                key={`${item.pizzaId}${item.size}`}
              >
                <div className="col-md-2 text-center mb-1">
                  <img className="img-fluid" src={item.image} alt={item.name} />
                </div>
                <div className="col-md-3 text-center name fw-bold">
                  {item.name}
                </div>
                <div className="col-md-2 text-center size">{item.size}</div>
                <div className="col-md-2 text-center price">
                  &#8377; {item.price}
                </div>
                <div className="col-md-3">
                  <div className="row row-center">
                    <div className="col-8 text-center">
                      <input
                        value={item.qty}
                        type="number"
                        min="1"
                        className="form-control"
                        placeholder="Quantity"
                        onChange={(e) => changeQtyHandler(item, e.target.value)}
                      ></input>
                    </div>
                    <div
                      className="col-4 text-center"
                      onClick={() =>
                        removeFromCartHandler(
                          item.pizzaId,
                          item.name,
                          item.size
                        )
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </FlipMove>
          <div className="row order-details">
            <div className="col-md-6 ms-auto">
              <div className="text-center mb-3 fs-5 fw-bold">
                Total Amount:{" "}
                <span style={{ color: "#fe5f1e" }}>
                  &#8377;{cart.itemsPrice}
                </span>
              </div>
              {loadingCreate && <Loader />}
              {errorCreate && <Message variant="danger">{errorCreate}</Message>}
              {!sdkReady && (
                <Message variant="danger">
                  Unable to proceed! Are you online?
                </Message>
              )}
              {localError && <Message variant="danger">{localError}</Message>}
              <form onSubmit={orderHandler}>
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                  >
                    <option value="cod">Cash On Delivery</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="off"
                    placeholder="Contact No."
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    autoComplete="off"
                    placeholder="Delivery Address"
                  />
                </div>
                <button type="submit" className="btn btn-first">
                  ORDER NOW
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartScreen
