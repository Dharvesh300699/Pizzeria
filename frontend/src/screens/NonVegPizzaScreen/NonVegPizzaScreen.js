import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import Pizza from "../../components/Pizza/Pizza"
import Loader from "../../components/Loader/Loader"
import Message from "../../components/Message/Message"
import { getNonVegPizzas } from "../../actions/pizzaActions"
import "./NonVegPizzaScreen.css"

const NonVegPizzaScreen = () => {
  const dispatch = useDispatch()

  const nonvegList = useSelector((state) => state.nonvegList)
  const { loading, error, nonveg } = nonvegList

  useEffect(() => {
    dispatch(getNonVegPizzas())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Nonveg Pizzas</title>
      </Helmet>
      <Link className="btn" to="/">
        <button type="button" className="btn btn-first">
          Go Back
        </button>
      </Link>
      <h1 className="text-center pb-3 pt-2">Non-Veg Pizzas</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row nonVegPizzas">
          {nonveg.map((pizza) => (
            <Pizza key={pizza.name} pizza={pizza} />
          ))}
        </div>
      )}
    </>
  )
}

export default NonVegPizzaScreen
