import axios from "axios";
import * as actionTypes from "../actions/actionTypes";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_CREATE_REQUEST,
      });

      const { user } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post("/api/orders", order, config);

      dispatch({
        type: actionTypes.ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_PAY_REQUEST,
      });

      const { user } = getState().userLogin;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: actionTypes.ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_LIST_REQUEST,
      });

      const { user } = getState().userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/orders", config);

      dispatch({
        type: actionTypes.ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listUserOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.USER_ORDER_LIST_REQUEST,
      });

      const { user } = getState().userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/orders/me", config);

      dispatch({
        type: actionTypes.USER_ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.ORDER_DETAILS_REQUEST,
      });

      const { user } = getState().userLogin;

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);

      dispatch({
        type: actionTypes.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
