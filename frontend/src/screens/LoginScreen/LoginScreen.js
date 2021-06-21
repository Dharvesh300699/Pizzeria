import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { login } from "../../actions/userActions"

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, user } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className="row py-3">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto">
        <h1>Sign In</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              className="form-control"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-first">
            Sign In
          </button>
        </form>
        <div className="row py-3">
          <div className="col">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
