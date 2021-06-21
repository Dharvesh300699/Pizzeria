import * as actionTypes from "./actionTypes"
import axios from "axios"

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.USER_LOGIN_REQUEST })

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      )

      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      })

      sessionStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user")
    }

    if (sessionStorage.getItem("user")) {
      sessionStorage.removeItem("user")
    }

    if (sessionStorage.getItem("cartItems")) {
      sessionStorage.removeItem("cartItems")
    }

    dispatch({ type: actionTypes.USER_LOGOUT })
    dispatch({ type: actionTypes.USER_UPDATE_PROFILE_RESET })
    dispatch({ type: actionTypes.USER_PROFILE_RESET })
    document.location.href = "/"
  }
}

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.USER_REGISTER_REQUEST })

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      )

      dispatch({
        type: actionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      })

      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      })

      sessionStorage.setItem("user", JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: actionTypes.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const getUserProfile = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.USER_PROFILE_REQUEST })

      const {
        userLogin: { user },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/users/profile`, config)

      dispatch({
        type: actionTypes.USER_PROFILE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.USER_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const userUpdateProfile = (name, email, address, password) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.USER_UPDATE_PROFILE_REQUEST })

      const { user } = getState().userLogin

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.put(
        "/api/users/profile",
        { name, email, address, password },
        config
      )

      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })

      dispatch({
        type: actionTypes.USER_LOGIN_SUCCESS,
        payload: { ...data, token: user.token },
      })

      const token = JSON.parse(sessionStorage.getItem("user")).token
      sessionStorage.removeItem("user")
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          isAdmin: data.isAdmin,
          address: data.address,
          token,
        })
      )
    } catch (error) {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.USER_LIST_REQUEST })

      const {
        userLogin: { user },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      const { data } = await axios.get(`/api/users`, config)

      dispatch({
        type: actionTypes.USER_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.USER_DELETE_REQUEST })

      const {
        userLogin: { user },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.delete(`/api/users/${id}`, config)

      dispatch({
        type: actionTypes.USER_DELETE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}

export const adminUpdateStatus = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.ADMIN_UPDATE_PROFILE_REQUEST })

      const {
        userLogin: { user },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
      await axios.put(`/api/users/${id}`, {}, config)

      dispatch({
        type: actionTypes.ADMIN_UPDATE_PROFILE_SUCCESS,
      })
    } catch (error) {
      dispatch({
        type: actionTypes.ADMIN_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
}
