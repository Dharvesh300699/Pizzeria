import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux"
import isEmail from "validator/lib/isEmail"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { register } from "../../actions/userActions"

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, user } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (user) {
      history.push(redirect)
    }
  }, [history, user, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setMessage("Fields can not be empty")
    } else if (!isEmail(email)) {
      setMessage("Email is not valid")
    } else if (password.includes(" ")) {
      setMessage("Password can not contain spaces")
    } else if (password.length < 6) {
      setMessage("Password must be atleast 6 characters")
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      setMessage(null)
      dispatch(register(name, email, password))
    }
  }

  return (
    <div className="row py-3">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto">
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm password
            </label>
            <input
              className="form-control"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="btn btn-first">
            Register
          </button>
        </form>
        <div className="row py-3">
          <div className="col">
            Have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/register"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
