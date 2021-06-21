import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import VegPizzaScreen from "./screens/VegPizzaScreen/VegPizzaScreen";
import NonVegPizzaScreen from "./screens/NonVegPizzaScreen/NonVegPizzaScreen";
import PizzamaniaPizzaScreen from "./screens/PizzamaniaPizzaScreen/PizzamaniaPizzaScreen";
import CartScreen from "./screens/CartScreen/CartScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import PizzaListScreen from "./screens/PizzaListScreen/PizzaListScreen";
import CreatePizzaScreen from "./screens/CreatePizzaScreen/CreatePizzaScreen";
import PizzaEditScreen from "./screens/PizzaEditScreen/PizzaEditScreen";
import OrderListScreen from "./screens/OrderListScreen/OrderListScreen";
import UserOrderListScreen from "./screens/UserOrderListScreen/UserOrderListScreen";
import OrderStatusScreen from "./screens/OrderStatusScreen/OrderStatusScreen";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ReactNotification isMobile="true" breakpoint="576" />
      <main className="container py-3">
        <Route path="/admin/pizza/:id/edit" component={PizzaEditScreen} />
        <Route path="/admin/createPizza" component={CreatePizzaScreen} />
        <Route path="/admin/userList" component={UserListScreen} />
        <Route path="/admin/orderList" component={OrderListScreen} />
        <Route path="/admin/pizzaList" component={PizzaListScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/cart" component={CartScreen} />
        <Route path="/pizzamania" component={PizzamaniaPizzaScreen} />
        <Route path="/nonveg" component={NonVegPizzaScreen} />
        <Route path="/veg" component={VegPizzaScreen} />
        <Route path="/orders" component={UserOrderListScreen} exact />
        <Route path="/orders/:id" component={OrderStatusScreen} />
        <Route path="/" exact component={HomeScreen} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

//sudo sysctl -w fs.inotify.max_user_watches=100000
