import * as actionTypes from "./actionTypes"

export const addToCart = (pizza, qty = 1) => {
  return (dispatch, getState) => {
    if (qty === 0) {
      dispatch({
        type: actionTypes.CART_REMOVE_PIZZA,
        payload: { ...pizza },
      })
    } else {
      dispatch({
        type: actionTypes.CART_ADD_PIZZA,
        payload: { ...pizza, qty },
      })
    }

    sessionStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    )
  }
}

export const removeFromCart = (id, size) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.CART_REMOVE_PIZZA,
      payload: { id, size },
    })

    sessionStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    )
  }
}

export const cartReset = () => {
  return (dispatch) => {
    if (sessionStorage.getItem("cartItems")) {
      sessionStorage.removeItem("cartItems")
    }

    dispatch({ type: actionTypes.CART_RESET })
  }
}
