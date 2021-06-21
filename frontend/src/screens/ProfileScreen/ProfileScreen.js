import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import isEmail from "validator/lib/isEmail"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import { userUpdateProfile, getUserProfile } from "../../actions/userActions"

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error, profile } = userProfile

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success, loading: loadingUpdate, error: errorUpdate } = userUpdate

  useEffect(() => {
    if (!user) {
      history.push("/login")
    } else {
      if (!profile) {
        dispatch(getUserProfile())
      } else {
        setName(profile.name)
        setEmail(profile.email)
        setAddress(profile.address)
      }
    }
  }, [history, user, profile, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setMessage("Name can not be empty")
    } else if (!email.trim()) {
      setMessage("Email can not be empty")
    } else if (!isEmail(email)) {
      setMessage("Email is not valid")
    } else if (!password.trim()) {
      setMessage("Missing Password")
    } else {
      setMessage(null)
      dispatch(userUpdateProfile(name, email, address, password))
      setPassword("")
    }
  }

  return (
    <div className="row py-3">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 mx-auto">
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {(loading || loadingUpdate) && <Loader />}
        {success && <Message variant="success">Profile Updated</Message>}
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
            <label htmlFor="address" className="form-label">
              Delivery Address
            </label>
            <input
              className="form-control"
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileScreen
