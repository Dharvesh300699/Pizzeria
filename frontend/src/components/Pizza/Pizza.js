import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { store } from "react-notifications-component"
import * as actionTypes from "../../actions/actionTypes"
import { addToCart } from "../../actions/cartActions"
import "./Pizza.css"

const Pizza = ({ pizza }) => {
  const dispatch = useDispatch()
  const { vegList, nonvegList } = useSelector((state) => ({
    vegList: state.vegList,
    nonvegList: state.nonvegList,
  }))
  const { copyVeg } = vegList
  const { copyNonveg } = nonvegList

  const sizeChangeHandler = (size) => {
    if (pizza.category === "veg") {
      dispatch({
        type: actionTypes.PIZZA_VEG_MODIFIED,
        payload: { _id: pizza._id, size },
      })
    } else {
      dispatch({
        type: actionTypes.PIZZA_NONVEG_MODIFIED,
        payload: { _id: pizza._id, size },
      })
    }
  }

  const addToCartHandler = () => {
    store.addNotification({
      title: `${pizza.name}`,
      message: `Added To Cart!`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true,
      },
    })
    if (pizza.pizzamania) {
      dispatch(
        addToCart({
          pizzaId: pizza._id,
          name: pizza.name,
          image: pizza.image,
          category: pizza.category,
          size: "regular",
          price: pizza.sizes[0].price,
        })
      )
    } else if (pizza.category === "nonveg") {
      const NonvegPizza = copyNonveg.find((item) => item._id === pizza._id)
      const size = NonvegPizza.modifiedSize
        ? NonvegPizza.modifiedSize
        : "regular"
      const price =
        size === "regular"
          ? pizza.sizes[0].price
          : size === "medium"
          ? pizza.sizes[1].price
          : pizza.sizes[2].price
      dispatch(
        addToCart({
          pizzaId: pizza._id,
          name: pizza.name,
          image: pizza.image,
          category: pizza.category,
          size: size,
          price: price,
        })
      )
    } else {
      const vegPizza = copyVeg.find((item) => item._id === pizza._id)
      const size = vegPizza.modifiedSize ? vegPizza.modifiedSize : "regular"
      const price =
        size === "regular"
          ? pizza.sizes[0].price
          : size === "medium"
          ? pizza.sizes[1].price
          : pizza.sizes[2].price
      dispatch(
        addToCart({
          pizzaId: pizza._id,
          name: pizza.name,
          image: pizza.image,
          category: pizza.category,
          size: size,
          price: price,
        })
      )
    }
  }

  return (
    <>
      <div className="col m-2 pizza">
        <img src={pizza.image} alt={pizza.name} className="pizza-img" />
        <p className="text-center fs-6 fw-bold">{pizza.name}</p>
        <p className="text-center fw-lighter p-light">{pizza.description}</p>
        <div className="options">
          {!pizza.pizzamania ? (
            <div>
              <select
                className="form-select size-select"
                aria-label="Default select example"
                onChange={(e) => sizeChangeHandler(e.target.value)}
              >
                <option value="regular">
                  Regular &#8377;{pizza.sizes[0].price}
                </option>
                <option value="medium">
                  Medium &#8377;{pizza.sizes[1].price}
                </option>
                <option value="large">
                  Large &#8377;{pizza.sizes[2].price}
                </option>
              </select>
            </div>
          ) : (
            <div className="fw-bold fs-5">&#8377;{pizza.sizes[0].price}</div>
          )}
          <div>
            <button
              className="btn btn-first"
              onClick={addToCartHandler}
              id="liveToastBtn"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pizza
