import * as actionTypes from "../actions/actionTypes"

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return { loading: true }
    case actionTypes.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case actionTypes.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case actionTypes.ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case actionTypes.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case actionTypes.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case actionTypes.ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.ORDER_LIST_REQUEST:
      return { loading: true }
    case actionTypes.ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        success: true,
      }
    case actionTypes.ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case actionTypes.ORDER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const userOrdersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.USER_ORDER_LIST_REQUEST:
      return { loading: true }
    case actionTypes.USER_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case actionTypes.USER_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
      return { loading: true }
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case actionTypes.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
