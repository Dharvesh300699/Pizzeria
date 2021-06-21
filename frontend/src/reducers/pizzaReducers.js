import * as actionTypes from "../actions/actionTypes"

export const vegListReducer = (state = { veg: [], copyVeg: [] }, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_VEG_REQUEST:
      return { ...state, loading: true }
    case actionTypes.PIZZA_VEG_SUCCESS:
      return { loading: false, veg: action.payload, copyVeg: action.payload }
    case actionTypes.PIZZA_VEG_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.PIZZA_VEG_MODIFIED:
      return {
        ...state,
        copyVeg: state.copyVeg.map((pizza) =>
          pizza._id === action.payload._id
            ? { ...pizza, modifiedSize: action.payload.size }
            : pizza
        ),
      }
    default:
      return state
  }
}

export const nonvegListReducer = (
  state = { nonveg: [], copyNonveg: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.PIZZA_NONVEG_REQUEST:
      return { ...state, loading: true }
    case actionTypes.PIZZA_NONVEG_SUCCESS:
      return {
        loading: false,
        nonveg: action.payload,
        copyNonveg: action.payload,
      }
    case actionTypes.PIZZA_NONVEG_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.PIZZA_NONVEG_MODIFIED:
      return {
        ...state,
        copyNonveg: state.copyNonveg.map((pizza) =>
          pizza._id === action.payload._id
            ? { ...pizza, modifiedSize: action.payload.size }
            : pizza
        ),
      }
    default:
      return state
  }
}

export const pizzamaniaListReducer = (state = { pizzamania: [] }, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_PIZZAMANIA_REQUEST:
      return { ...state, loading: true }
    case actionTypes.PIZZA_PIZZAMANIA_SUCCESS:
      return { loading: false, pizzamania: action.payload }
    case actionTypes.PIZZA_PIZZAMANIA_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const pizzaListReducer = (state = { pizzas: [] }, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_ALL_REQUEST:
      return { ...state, loading: true }
    case actionTypes.PIZZA_ALL_SUCCESS:
      return { loading: false, pizzas: action.payload }
    case actionTypes.PIZZA_ALL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const pizzaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_DELETE_REQUEST:
      return { loading: true }
    case actionTypes.PIZZA_DELETE_SUCCESS:
      return { loading: false, success: true }
    case actionTypes.PIZZA_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const createPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_CREATE_REQUEST:
      return { loading: true }
    case actionTypes.PIZZA_CREATE_SUCCESS:
      return { loading: false, success: true }
    case actionTypes.PIZZA_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.PIZZA_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const pizzaDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_DETAILS_REQUEST:
      return { loading: true }
    case actionTypes.PIZZA_DETAILS_SUCCESS:
      return { loading: false, pizza: action.payload }
    case actionTypes.PIZZA_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.PIZZA_DETAILS_RESET:
      return {}
    default:
      return state
  }
}

export const pizzaUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PIZZA_UPDATE_REQUEST:
      return { loading: true }
    case actionTypes.PIZZA_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case actionTypes.PIZZA_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case actionTypes.PIZZA_UPDATE_RESET:
      return {}
    default:
      return state
  }
}
