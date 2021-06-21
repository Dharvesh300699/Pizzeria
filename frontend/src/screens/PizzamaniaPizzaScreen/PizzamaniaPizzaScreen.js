import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import Pizza from "../../components/Pizza/Pizza"
import Loader from "../../components/Loader/Loader"
import Message from "../../components/Message/Message"
import { getPizzamaniaPizzas } from "../../actions/pizzaActions"
import "./PizzamaniaPizzaScreen.css"

const NonVegPizzaScreen = () => {
  const dispatch = useDispatch()

  const pizzamaniaList = useSelector((state) => state.pizzamaniaList)
  const { loading, error, pizzamania } = pizzamaniaList

  const veg = pizzamania.filter((pizza) => pizza.category === "veg")
  const nonveg = pizzamania.filter((pizza) => pizza.category === "nonveg")

  useEffect(() => {
    dispatch(getPizzamaniaPizzas())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Pizzamania</title>
      </Helmet>
      <Link className="btn" to="/">
        <button type="button" className="btn btn-first">
          Go Back
        </button>
      </Link>
      <h1 className="text-center pb-3 pt-2">Pizzamania</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="row pizzamaniaPizzas">
            <h2 className="text-center py-2">Veg</h2>
            {veg.map((pizza) => (
              <Pizza key={pizza.name} pizza={pizza} />
            ))}
          </div>
          <div className="row pizzamaniaPizzas">
            <h2 className="text-center pb-3 pt-5">Non-Veg</h2>
            {nonveg.map((pizza) => (
              <Pizza key={pizza.name} pizza={pizza} />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default NonVegPizzaScreen
