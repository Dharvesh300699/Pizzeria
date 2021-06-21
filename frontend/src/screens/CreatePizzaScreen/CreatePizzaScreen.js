import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { pizzaCreate } from "../../actions/pizzaActions"
import * as actionTypes from "../../actions/actionTypes"

const CreatePizzaScreen = ({ history }) => {
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

  const createPizza = useSelector((state) => state.createPizza)
  const { loading, error, success } = createPizza

  useEffect(() => {
    if (!user) {
      history.push("/login")
    } else if (!user.isAdmin) {
      history.push("/")
    }

    if (success) {
      history.push("/admin/pizzalist")
      dispatch({ type: actionTypes.PIZZA_CREATE_RESET })
    }
  }, [dispatch, history, user, success])

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
      dispatch(pizzaCreate(formData))
    }
  }

  const imageFileHandler = (e) => {
    const file = e.target.files[0]
    formData.append("image", file)
  }

  return (
    <div className="row py-3">
      <Helmet>
        <title>Create Pizza</title>
      </Helmet>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto">
        <h1>Create Pizza</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
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
                  checked
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
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreatePizzaScreen
