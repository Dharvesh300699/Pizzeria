import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  vegListReducer,
  nonvegListReducer,
  pizzamaniaListReducer,
  pizzaListReducer,
  pizzaDeleteReducer,
  createPizzaReducer,
  pizzaDetailsReducer,
  pizzaUpdateReducer,
} from "./reducers/pizzaReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userProfileReducer,
  userListReducer,
  userDeleteReducer,
  adminUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderPayReducer,
  orderListReducer,
  userOrdersListReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  vegList: vegListReducer,
  nonvegList: nonvegListReducer,
  pizzamaniaList: pizzamaniaListReducer,
  pizzaList: pizzaListReducer,
  pizzaDelete: pizzaDeleteReducer,
  pizzaDetails: pizzaDetailsReducer,
  pizzaUpdate: pizzaUpdateReducer,
  createPizza: createPizzaReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  adminUpdate: adminUpdateReducer,
  orderCreate: orderCreateReducer,
  orderPay: orderPayReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  userOrdersList: userOrdersListReducer,
});

const cartItemsFromStorage = sessionStorage.getItem("cartItems")
  ? JSON.parse(sessionStorage.getItem("cartItems"))
  : [];

const userFromStorage = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { user: userFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
