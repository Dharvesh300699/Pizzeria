import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { getAllPizzas, deletePizza } from "../../actions/pizzaActions"

const PizzaListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [id, setId] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const pizzaList = useSelector((state) => state.pizzaList)
  const { loading, error, pizzas } = pizzaList

  const pizzaDelete = useSelector((state) => state.pizzaDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = pizzaDelete

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(getAllPizzas())
    } else if (user) {
      history.push("/")
    } else {
      history.push("/login")
    }
  }, [dispatch, user, history, successDelete])

  const deleteHandler = () => {
    dispatch(deletePizza(id))
  }

  const createPizzaHandler = () => {
    history.push("/admin/createPizza")
  }

  return (
    <>
      <Helmet>
        <title>Pizza List</title>
      </Helmet>
      <div className="row align-middle">
        <div className="col">
          <h1>Pizzas</h1>
        </div>
        <div className="col text-end">
          <button className="btn btn-first my-3" onClick={createPizzaHandler}>
            <i className="fas fa-plus"></i> Create Pizza
          </button>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pizzas.map((pizza) => (
                <tr key={pizza._id}>
                  <td>{pizza._id}</td>
                  <td>{pizza.name}</td>
                  <td>
                    {pizza.pizzamania
                      ? `R-${pizza.sizes[0].price}`
                      : `R-${pizza.sizes[0].price}, M-${pizza.sizes[1].price}, L-${pizza.sizes[2].price}`}
                  </td>
                  <td>
                    {pizza.category === "veg" ? (
                      <img
                        src="https://res.cloudinary.com/dswp5qfpm/image/upload/v1619778686/veg_ldhb9a.jpg"
                        alt="veg"
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      <img
                        src="https://res.cloudinary.com/dswp5qfpm/image/upload/v1619778300/nonveg_ozcu1h.jpg"
                        alt="nonveg"
                        style={{ width: "20px", height: "20px" }}
                      />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/pizza/${pizza._id}/edit`}>
                      <button className="btn">
                        <i className="fas fa-edit"></i>
                      </button>
                    </Link>
                    <button
                      className="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => setId(pizza._id)}
                    >
                      <i
                        className="fas fa-trash"
                        style={{ color: "#fe5f1e" }}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Delete pizza
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Are you sure?</div>
                <div className="modal-footer">
                  <button className="btn btn-primary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => deleteHandler()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PizzaListScreen
