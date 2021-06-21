import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import moment from "moment"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { listUserOrders } from "../../actions/orderActions"
import "./UserOrderListScreen.css"

const UserOrderListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const userOrdersList = useSelector((state) => state.userOrdersList)
  const { loading, error, orders } = userOrdersList

  useEffect(() => {
    if (user) {
      dispatch(listUserOrders())
    } else {
      history.push("/")
    }
  }, [dispatch, user, history])

  return (
    <>
      <Helmet>
        <title>Order List</title>
      </Helmet>
      <h1>Recent orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row d-md-block d-none">
            <div className="col-xxl-9 mx-auto">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead>
                    <tr>
                      <th>ORDERS</th>
                      <th>AMOUNT</th>
                      <th>PAYMENT</th>
                      <th>STATUS</th>
                      <th>PLACED AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
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
                        <td>&#8377;{order.totalPrice}</td>
                        <td>{order.paymentMethod}</td>

                        <td>
                          <Link
                            className="btn btn-first"
                            to={`/orders/${order._id}`}
                          >
                            {order.status}
                          </Link>
                        </td>
                        <td>{moment(order.createdAt).format("hh:mm:ss A")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row d-md-none">
            {orders.map((order) => (
              <div className="col-sm-12 order-row p-3" key={order._id}>
                <div className="d-flex justify-content-between">
                  <div>Items</div>
                  <div>Size</div>
                </div>
                {order.pizzaItems.map((pizza) => (
                  <div
                    className="d-flex justify-content-between"
                    key={pizza._id}
                  >
                    <div className="fs-small">
                      {pizza.qty} X {pizza.name}
                    </div>
                    <div className="fs-small">{pizza.size}</div>
                  </div>
                ))}
                <div>Ordered On:</div>
                <div className="fs-small">
                  {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
                </div>
                <div>
                  Total:{" "}
                  <span className="fw-bold ms-3" style={{ color: "#fe5f1e" }}>
                    &#8377;{order.totalPrice}
                  </span>
                </div>
                <div>
                  Payment Method:{" "}
                  <span className="ms-3">{order.paymentMethod}</span>
                </div>
                <div>
                  Status:{" "}
                  <span className="ms-3">
                    <Link className="btn btn-first" to={`/orders/${order._id}`}>
                      {order.status}
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default UserOrderListScreen
