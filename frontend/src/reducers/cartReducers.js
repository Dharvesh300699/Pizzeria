import * as actionTypes from "../actions/actionTypes"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.CART_ADD_PIZZA:
      const item = action.payload
      const existItem = state.cartItems.find(
        (x) => x.pizzaId === item.pizzaId && x.size === item.size
      )
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.pizzaId === existItem.pizzaId && x.size === existItem.size
              ? item
              : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    case actionTypes.CART_REMOVE_PIZZA:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          if (item.pizzaId !== action.payload.id) {
            return true
          } else {
            if (item.size === action.payload.size) {
              return false
            } else {
              return true
            }
          }
        }),
      }
    case actionTypes.CART_RESET:
      return {
        cartItems: [],
      }
    default:
      return state
  }
}
