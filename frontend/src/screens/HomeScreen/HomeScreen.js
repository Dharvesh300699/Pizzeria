import React from "react"
import { Helmet } from "react-helmet"
import MenuItem from "../../components/MenuItem/MenuItem"
import "./HomeScreen.css"

const HomeScreen = ({ history }) => {
  const viewHandler = (category) => {
    history.push(`/${category}`)
  }
  return (
    <div>
      <Helmet>
        <title>Welcome to Pizzeria | Home</title>
      </Helmet>
      <h1 className="text-center">Pizzera's Menu</h1>
      <div className="row flex-menu py-5">
        <MenuItem
          title="VEG PIZZA"
          image="/images/veg_pizza.jpg"
          description="A delight for veggie lovers! Choose from our wide range of delicious vegetarian pizzas"
          clicked={() => viewHandler("veg")}
        />
        <MenuItem
          title="NON-VEG PIZZA"
          image="/images/non_veg.jpg"
          description="Choose your favourite non-veg pizzas from the Pizzeria's menu with your choice of toppings"
          clicked={() => viewHandler("nonveg")}
        />
        <MenuItem
          title="PIZZA MANIA"
          image="/images/pizza_mania.jpg"
          description="Indulge into mouth-watering taste of Pizza mania range, perfect answer to all your food cravings"
          clicked={() => viewHandler("pizzamania")}
        />
      </div>
    </div>
  )
}

export default HomeScreen
