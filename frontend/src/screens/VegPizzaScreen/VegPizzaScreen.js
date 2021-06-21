import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import Pizza from "../../components/Pizza/Pizza"
import Loader from "../../components/Loader/Loader"
import Message from "../../components/Message/Message"
import { getVegPizzas } from "../../actions/pizzaActions"
import "./VegPizzaScreen.css"

const VegPizzaScreen = () => {
  const dispatch = useDispatch()

  const vegList = useSelector((state) => state.vegList)
  const { loading, error, veg } = vegList

  useEffect(() => {
    dispatch(getVegPizzas())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Veg Pizzas</title>
      </Helmet>
      <Link className="btn" to="/">
        <button type="button" className="btn btn-first">
          Go Back
        </button>
      </Link>
      <h1 className="text-center pb-3 pt-2">Veg Pizzas</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row vegPizzas">
          {veg.map((pizza) => (
            <Pizza key={pizza.name} pizza={pizza} />
          ))}
        </div>
      )}
    </>
  )
}

export default VegPizzaScreen
