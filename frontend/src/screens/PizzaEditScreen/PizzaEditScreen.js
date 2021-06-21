import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { pizzaInfo, updatePizza } from "../../actions/pizzaActions"
import * as actionTypes from "../../actions/actionTypes"

const UpdatePizzaScreen = ({ history, match }) => {
  const pizzaId = match.params.id

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("veg")
  const [pizzamania, setPizzamania] = useState(false)
  const [regular, setRegular] = useState(0)
  const [medium, setMedium] = useState(0)
  const [large, setLarge] = useState(0)
  const [message, setMessage] = useState(null)

  const formData = new FormData()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const pizzaDetails = useSelector((state) => state.pizzaDetails)
  const { loading, error, pizza } = pizzaDetails

  const pizzaUpdate = useSelector((state) => state.pizzaUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = pizzaUpdate

  useEffect(() => {
    if (user && user.isAdmin) {
      if (successUpdate) {
        dispatch({ type: actionTypes.PIZZA_UPDATE_RESET })
        dispatch({ type: actionTypes.PIZZA_DETAILS_RESET })
        history.push("/admin/pizzalist")
      } else {
        if (!pizza || pizza._id !== pizzaId) {
          dispatch(pizzaInfo(pizzaId))
        } else {
          setName(pizza.name)
          setDescription(pizza.description)
          setCategory(pizza.category)
          setPizzamania(pizza.pizzamania)
          if (pizza.pizzamania) {
            setRegular(pizza.sizes[0].price)
          } else {
            setRegular(pizza.sizes[0].price)
            setMedium(pizza.sizes[1].price)
            setLarge(pizza.sizes[2].price)
          }
        }
      }
    } else if (user) {
      history.push("/")
    } else {
      history.push("/login")
    }
  }, [dispatch, history, user, successUpdate, pizza, pizzaId])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setMessage("Name is required!")
    } else if (!description.trim()) {
      setMessage("Description is required!")
    } else {
      setMessage(null)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("pizzamania", pizzamania)
      if (pizzamania) {
        formData.append(
          "sizes",
          JSON.stringify([{ size: "regular", price: regular }])
        )
      } else {
        formData.append(
          "sizes",
          JSON.stringify([
            { size: "regular", price: regular },
            { size: "medium", price: medium },
            { size: "large", price: large },
          ])
        )
      }
      dispatch(updatePizza(formData, pizzaId))
    }
  }

  const imageFileHandler = (e) => {
    const file = e.target.files[0]
    formData.append("image", file)
  }

  return (
    <div className="row py-3">
      <Helmet>
        <title>Pizza Edit</title>
      </Helmet>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto">
        <h1>Update Pizza</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              className="form-control"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <div className="row">
              <div className="form-check col">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={category === "veg"}
                  value="veg"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Veg
                </label>
              </div>
              <div className="form-check col">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={category === "nonveg"}
                  value="nonveg"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Nonveg
                </label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked={pizzamania}
              onChange={(e) => setPizzamania(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Pizzamania
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <div className="row">
              <div className="col">
                <label htmlFor="regular" className="form-label">
                  Regular
                </label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  id="regular"
                  value={regular}
                  onChange={(e) => setRegular(e.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="medium" className="form-label">
                  Medium
                </label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  id="medium"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  disabled={pizzamania}
                />
              </div>
              <div className="col">
                <label htmlFor="large" className="form-label">
                  Large
                </label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  id="large"
                  value={large}
                  onChange={(e) => setLarge(e.target.value)}
                  disabled={pizzamania}
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              className="form-control"
              type="file"
              id="image"
              onChange={imageFileHandler}
            />
          </div>
          <button type="submit" className="btn btn-first">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePizzaScreen
