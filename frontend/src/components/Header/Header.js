import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../actions/userActions"
import "./Header.css"

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-light primary">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3" to="/">
            Pizzeria
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/cart"
                >
                  <i className="fas fa-shopping-cart me-1"></i>
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                {user ? (
                  <div className="dropdown mt-1 mx-md-2">
                    <button
                      className="btn btn-first dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user.name}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          Orders
                        </Link>
                      </li>
                      <li
                        className="dropdown-item"
                        onClick={logoutHandler}
                        style={{ cursor: "pointer" }}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link className="nav-link fs-5" to="/login">
                    <i className="fas fa-user me-1"></i>
                    Sign In
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user && user.isAdmin && (
                  <div className="dropdown mt-2 mt-sm-2 mt-md-2 mt-lg-1 mx-md-2">
                    <button
                      className="btn btn-first dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item" to="/admin/userlist">
                          Users
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/pizzalist">
                          Pizzas
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/orderlist">
                          Orders
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
