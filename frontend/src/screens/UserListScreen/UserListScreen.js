import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"
import Message from "../../components/Message/Message"
import Loader from "../../components/Loader/Loader"
import {
  listUsers,
  deleteUser,
  adminUpdateStatus,
} from "../../actions/userActions"

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const [id, setId] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { user } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const adminUpdate = useSelector((state) => state.adminUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdate

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(listUsers())
    } else if (user) {
      history.push("/")
    } else {
      history.push("/login")
    }
  }, [dispatch, user, history, successDelete, successUpdate])

  const deleteHandler = () => {
    dispatch(deleteUser(id))
  }

  const adminHandler = (userId) => {
    dispatch(adminUpdateStatus(userId))
  }

  return (
    <>
      <Helmet>
        <title>User List</title>
      </Helmet>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td>{customer.name}</td>
                  <td>
                    <a href={`mailto:${customer.email}`}>{customer.email}</a>
                  </td>
                  <td>
                    {customer.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {customer._id.toString() !== user._id.toString() && (
                      <>
                        <button
                          className="btn"
                          onClick={() => adminHandler(customer._id)}
                          disabled={loadingUpdate}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => setId(customer._id)}
                        >
                          <i
                            className="fas fa-trash"
                            style={{ color: "#fe5f1e" }}
                          ></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Delete user
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">Are you sure?</div>
                <div className="modal-footer">
                  <button className="btn btn-primary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => deleteHandler()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserListScreen
