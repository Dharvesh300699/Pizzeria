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
          image="https://res.cloudinary.com/dswp5qfpm/image/upload/v1624268820/veg_pizza_1624268857621.jpg"
          description="A delight for veggie lovers! Choose from our wide range of delicious vegetarian pizzas"
          clicked={() => viewHandler("veg")}
        />
        <MenuItem
          title="NON-VEG PIZZA"
          image="https://res.cloudinary.com/dswp5qfpm/image/upload/v1624268976/non_veg_1624268993727.jpg"
          description="Choose your favourite non-veg pizzas from the Pizzeria's menu with your choice of toppings"
          clicked={() => viewHandler("nonveg")}
        />
        <MenuItem
          title="PIZZA MANIA"
          image="https://res.cloudinary.com/dswp5qfpm/image/upload/v1624269059/pizza_mania_1624269067368.jpg"
          description="Indulge into mouth-watering taste of Pizza mania range, perfect answer to all your food cravings"
          clicked={() => viewHandler("pizzamania")}
        />
      </div>
    </div>
  )
}

export default HomeScreen
